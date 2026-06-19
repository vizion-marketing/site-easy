import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* =========================================================
   LiquidGlass — effet "verre liquide" réutilisable.
   (Porté depuis le projet DRIVE — src/components/LiquidGlass.tsx)

   Principe :
   1. Un <svg> caché définit un <filter> = feImage + feDisplacementMap.
   2. feImage = une "displacement map" générée au runtime sur un <canvas> :
      gris neutre (128,128) au centre plat, dévié vers les bords pour
      encoder la réfraction du biseau (R = décalage X, G = décalage Y).
   3. L'élément reçoit `backdrop-filter: url(#filter) blur() brightness()…`
      qui réfracte ce qui se trouve DERRIÈRE lui, + un liseré (rim) en
      box-shadow/border pour le reflet de verre.

   La map est régénérée à la taille réelle de l'élément (ResizeObserver),
   donc l'effet s'applique à n'importe quel élément, quelle que soit sa taille.

   ⚠️ La réfraction (url() dans backdrop-filter) n'est supportée que par les
   navigateurs Chromium. Ailleurs (Safari/Firefox) on dégrade proprement sur
   blur + brightness + saturate + liseré, ce qui reste un rendu "verre" correct.
   ========================================================= */

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

/** Distance signée à un rectangle arrondi (négative à l'intérieur). px/py sont mesurés depuis le centre. */
function roundedRectSDF(
  px: number,
  py: number,
  w: number,
  h: number,
  r: number,
) {
  const qx = Math.abs(px) - w / 2 + r;
  const qy = Math.abs(py) - h / 2 + r;
  const ax = Math.max(qx, 0);
  const ay = Math.max(qy, 0);
  return Math.min(Math.max(qx, qy), 0) + Math.hypot(ax, ay) - r;
}

/**
 * Génère la displacement map (data URL PNG) pour un rectangle arrondi.
 * @param width   largeur en px CSS
 * @param height  hauteur en px CSS
 * @param radius  rayon des coins en px
 * @param bezel   épaisseur du biseau réfractif (depuis le bord vers l'intérieur)
 */
export function generateLiquidGlassMap(
  width: number,
  height: number,
  radius: number,
  bezel: number,
): string {
  if (typeof document === "undefined") return "";

  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const r = Math.min(radius, Math.min(w, h) / 2);
  const b = Math.max(1, Math.min(bezel, Math.min(w, h) / 2));

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const img = ctx.createImageData(w, h);
  const data = img.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x - w / 2 + 0.5;
      const py = y - h / 2 + 0.5;
      const d = roundedRectSDF(px, py, w, h, r);

      // Intensité : max au bord (depth = 0), nulle à `bezel` vers l'intérieur.
      let t = 0;
      if (d < 0) t = smoothstep(0, 1, 1 - -d / b);

      // Normale entrante (gradient de la SDF, inversé) → direction de réfraction.
      const gx =
        roundedRectSDF(px + 1, py, w, h, r) -
        roundedRectSDF(px - 1, py, w, h, r);
      const gy =
        roundedRectSDF(px, py + 1, w, h, r) -
        roundedRectSDF(px, py - 1, w, h, r);
      const len = Math.hypot(gx, gy) || 1;
      const ix = -gx / len;
      const iy = -gy / len;

      const idx = (y * w + x) * 4;
      data[idx] = 128 + ix * t * 127; // R → décalage horizontal
      data[idx + 1] = 128 + iy * t * 127; // G → décalage vertical
      data[idx + 2] = 128; // B inutilisé
      data[idx + 3] = 255; // A
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
}

export interface LiquidGlassProps {
  children?: ReactNode;
  /** Rayon des coins en px (défaut 24). */
  radius?: number;
  /** Épaisseur du biseau réfractif en px (défaut 16). */
  bezel?: number;
  /** Force de la réfraction (échelle feDisplacementMap). Défaut = `bezel`. */
  scale?: number;
  /** Flou de l'arrière-plan en px (défaut 2). */
  blur?: number;
  /** Luminosité de l'arrière-plan (défaut 1.1). */
  brightness?: number;
  /** Saturation de l'arrière-plan (défaut 1.1). */
  saturate?: number;
  /** Contraste de l'arrière-plan (défaut 1). */
  contrast?: number;
  /** Affiche le liseré de verre (border + reflets inset). Défaut true. */
  rim?: boolean;
  /** Teinte de fond optionnelle, ex. "rgba(255,255,255,0.06)". */
  tint?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Conteneur appliquant l'effet "verre liquide" à son arrière-plan.
 * Place n'importe quel contenu en `children` (il reste net, au-dessus du verre).
 *
 * @example
 * <LiquidGlass radius={30} bezel={18} className="px-6 py-3">
 *   <nav>…</nav>
 * </LiquidGlass>
 */
export function LiquidGlass({
  children,
  radius = 24,
  bezel = 16,
  scale,
  blur = 2,
  brightness = 1.1,
  saturate = 1.1,
  contrast = 1,
  rim = true,
  tint,
  className,
  style,
}: LiquidGlassProps) {
  const rawId = useId();
  const filterId = `liquid-glass-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [map, setMap] = useState("");

  // Suit la taille réelle de l'élément.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Régénère la map quand la géométrie change.
  useEffect(() => {
    if (size.width === 0 || size.height === 0) return;
    setMap(generateLiquidGlassMap(size.width, size.height, radius, bezel));
  }, [size.width, size.height, radius, bezel]);

  // Garde-fou cross-navigateur : on relit le style calculé ; si le navigateur
  // n'a pas accepté le filtre url() (Safari/Firefox), on retombe sur blur/…
  // seuls — et toute règle CSS de fallback de l'appelant reprend la main.
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !map) return;
    const cs = getComputedStyle(el);
    const ok = (
      cs.getPropertyValue("backdrop-filter") ||
      cs.getPropertyValue("-webkit-backdrop-filter") ||
      ""
    ).includes("url(");
    setSupported(ok);
  }, [map, filterId]);

  const dispScale = scale ?? bezel;
  const base = `blur(${blur}px) brightness(${brightness}) saturate(${saturate}) contrast(${contrast})`;
  const filter = supported && map ? `url(#${filterId}) ${base}` : base;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: "relative",
        borderRadius: radius,
        overflow: "hidden",
        backdropFilter: filter,
        WebkitBackdropFilter: filter,
        ...(tint ? { backgroundColor: tint } : null),
        ...(rim
          ? {
              border: "1px solid rgba(255,255,255,0.25)",
              boxShadow:
                "0 4px 16px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.30), inset 0 -8px 24px rgba(0,0,0,0.15)",
            }
          : null),
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
            {map ? (
              <feImage
                href={map}
                x={0}
                y={0}
                width={size.width}
                height={size.height}
                result="map"
                preserveAspectRatio="none"
              />
            ) : null}
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale={map ? dispScale : 0}
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
