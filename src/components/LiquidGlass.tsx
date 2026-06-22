import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* =========================================================
   LiquidGlass : effet "verre liquide" réutilisable.

   ⚠️ PORT EXACT du composant du projet Drive (siteweb-drive.vercel.app),
   src/components/LiquidGlass.tsx — même algorithme de réfraction, mêmes
   réglages CSS, afin que le verre soit STRICTEMENT identique entre les sites.

   Principe :
   1. Une displacement map est générée au runtime sur un <canvas>, EN ESPACE
      UV NORMALISÉ (0→1). Pour chaque pixel on calcule la distance signée à un
      rectangle arrondi centré (demi-largeur 0.3, demi-hauteur 0.2, rayon =
      `elasticity`), on en tire une intensité via deux smoothstep imbriqués,
      puis on déplace le point vers le centre → c'est la réfraction du biseau.
      (R = décalage X, G = décalage Y, B = 0.)
   2. L'amplitude du déplacement (`scale` de feDisplacementMap) est CALCULÉE
      dynamiquement à partir du déplacement max trouvé × 0.5 × displacementScale.
      C'est la différence majeure avec l'ancienne version (qui figeait scale = bezel).
   3. L'élément reçoit `backdrop-filter: url(#filter) blur() contrast()
      brightness() saturate()` + un box-shadow (drop réglable + inset bas).

   La map est régénérée à la taille réelle de l'élément (ResizeObserver,
   contentRect, clampé à 100px min, comme le déployé).

   ⚠️ La réfraction (url() dans backdrop-filter) n'est supportée que par les
   navigateurs Chromium. Ailleurs (Safari/Firefox) la fonction url() est
   ignorée et il ne reste que blur/contrast/brightness/saturate, rendu "verre"
   correct en dégradé.
   ========================================================= */

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

/** smoothstep : interpolation lissée entre edge0 et edge1 (edge0 peut être > edge1). */
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Distance signée à un rectangle arrondi centré (négative à l'intérieur). */
function roundedRectSDF(
  x: number,
  y: number,
  halfW: number,
  halfH: number,
  radius: number,
) {
  const qx = Math.abs(x) - halfW + radius;
  const qy = Math.abs(y) - halfH + radius;
  return (
    Math.min(Math.max(qx, qy), 0) +
    Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) -
    radius
  );
}

export interface LiquidGlassMapOptions {
  /** Échelle globale de la réfraction (défaut 1). */
  displacementScale?: number;
  /** Rayon (espace UV) du rectangle arrondi interne → "souplesse" du biseau (défaut 0.6). */
  elasticity?: number;
}

/**
 * Génère la displacement map (data URL PNG) ET l'échelle de déplacement
 * associée, pour un rectangle de `width`×`height` px.
 * @returns `{ map, scale }` : `map` = data URL à passer à <feImage href>,
 *          `scale` = valeur à poser sur <feDisplacementMap scale>.
 */
export function generateLiquidGlassMap(
  width: number,
  height: number,
  { displacementScale = 1, elasticity = 0.6 }: LiquidGlassMapOptions = {},
): { map: string; scale: number } {
  if (typeof document === "undefined") return { map: "", scale: 0 };

  const w = Math.max(1, Math.floor(width));
  const h = Math.max(1, Math.floor(height));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return { map: "", scale: 0 };

  const data = new Uint8ClampedArray(w * h * 4);
  const raw: number[] = [];
  let maxScale = 0;

  // 1ère passe : déplacement (en px) de chaque pixel + suivi de l'amplitude max.
  for (let i = 0; i < data.length; i += 4) {
    const x = (i / 4) % w;
    const y = Math.floor(i / 4 / w);

    const cx = x / w - 0.5; // coord. centrée [-0.5 .. 0.5]
    const cy = y / h - 0.5;

    const sdf = roundedRectSDF(cx, cy, 0.3, 0.2, elasticity) - 0.15;
    const intensity = smoothstep(0, 1, smoothstep(0.8, 0, sdf));

    const dispX = cx * intensity + 0.5;
    const dispY = cy * intensity + 0.5;

    const dx = dispX * w - x;
    const dy = dispY * h - y;

    maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
    raw.push(dx, dy);
  }

  maxScale *= 0.5 * displacementScale;
  if (maxScale === 0) maxScale = 1; // garde-fou anti-division par zéro

  // 2ème passe : encodage normalisé (R = dx, G = dy, B = 0).
  let k = 0;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255 * (raw[k++] / maxScale + 0.5);
    data[i + 1] = 255 * (raw[k++] / maxScale + 0.5);
    data[i + 2] = 0;
    data[i + 3] = 255;
  }

  ctx.putImageData(new ImageData(data, w, h), 0, 0);
  return { map: canvas.toDataURL(), scale: maxScale };
}

export interface LiquidGlassProps {
  children?: ReactNode;
  /** Rayon des coins en px (défaut 20). */
  radius?: number;
  /** Flou de l'arrière-plan en px (défaut 0.25). */
  blur?: number;
  /** Contraste de l'arrière-plan (défaut 1.2). */
  contrast?: number;
  /** Luminosité de l'arrière-plan (défaut 1.05). */
  brightness?: number;
  /** Saturation de l'arrière-plan (défaut 1.1). */
  saturate?: number;
  /** Opacité du drop-shadow `0 4px 8px` (défaut 0.25 ; mettre 0 pour le retirer). */
  shadowIntensity?: number;
  /** Échelle globale de la réfraction (défaut 1). */
  displacementScale?: number;
  /** Souplesse du biseau réfractif (défaut 0.6). */
  elasticity?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Conteneur appliquant l'effet "verre liquide" à son arrière-plan.
 * Place n'importe quel contenu en `children` (il reste net, au-dessus du verre).
 * Le layout (taille, padding, flex…) est laissé à `className`/`style`.
 */
export function LiquidGlass({
  children,
  radius = 20,
  blur = 0.25,
  contrast = 1.2,
  brightness = 1.05,
  saturate = 1.1,
  shadowIntensity = 0.25,
  displacementScale = 1,
  elasticity = 0.6,
  className,
  style,
}: LiquidGlassProps) {
  const rawId = useId();
  const baseId = `liquid-glass-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const filterId = `${baseId}_filter`;
  const mapId = `${baseId}_map`;

  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 300, height: 200 });
  const [map, setMap] = useState("");
  const [scale, setScale] = useState(0);

  // Suit la taille réelle de l'élément (contentRect, min 100px, comme le déployé).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setSize({ width: Math.max(width, 100), height: Math.max(height, 100) });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Régénère la map + l'échelle quand la géométrie ou les réglages changent.
  useEffect(() => {
    const result = generateLiquidGlassMap(size.width, size.height, {
      displacementScale,
      elasticity,
    });
    setMap(result.map);
    setScale(result.scale);
  }, [size.width, size.height, displacementScale, elasticity]);

  const filter = `url(#${filterId}) blur(${blur}px) contrast(${contrast}) brightness(${brightness}) saturate(${saturate})`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: radius,
        boxShadow: `0 4px 8px rgba(0, 0, 0, ${shadowIntensity}), 0 -10px 25px inset rgba(0, 0, 0, 0.15)`,
        backdropFilter: filter,
        WebkitBackdropFilter: filter,
        ...style,
      }}
    >
      <svg
        aria-hidden
        width={0}
        height={0}
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          pointerEvents: "none",
        }}
      >
        <defs>
          <filter
            id={filterId}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
            x={0}
            y={0}
            width={size.width}
            height={size.height}
          >
            <feImage
              id={mapId}
              href={map || undefined}
              width={size.width}
              height={size.height}
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2={mapId}
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {children}
    </div>
  );
}

export default LiquidGlass;
