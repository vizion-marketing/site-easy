/* Bandeau de logos partenaires (marquee) — section autonome sur fond gris léger.
   Le LogoSet est dupliqué (1 visible + 1 `aria-hidden`) pour une boucle sans couture ;
   l'animation `.marquee` et le masque `.marquee-mask` sont définis dans
   `src/styles/global.css`. Composant 100 % CSS → rendu statique (pas de `client:*`). */

export function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-x-16 pr-16" aria-hidden={hidden}>
      <li className="flex items-center gap-2">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L22 12L12 22L2 12L12 2Z" /></svg>
        <span className="font-heading font-bold text-lg tracking-tight">LOGOIPSUM</span>
      </li>
      <li className="flex items-center gap-2">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3L19 12L5 21V3Z" /></svg>
        <span className="font-heading font-semibold text-lg tracking-tight">logoipsum®</span>
      </li>
      <li className="flex items-center gap-2">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2V5M12 19V22M2 12H5M19 12H22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
        <span className="font-heading font-semibold text-lg tracking-tight">LOGOIPSUM</span>
      </li>
      <li className="flex items-center gap-2">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" /></svg>
        <span className="font-heading font-medium text-lg tracking-tight">logoipsum</span>
      </li>
      <li className="flex items-center gap-2">
        <span className="flex flex-col gap-1" aria-hidden="true">
          <span className="block w-5 h-1.5 bg-current"></span>
          <span className="block w-3 h-1.5 bg-current opacity-60"></span>
          <span className="block w-5 h-1.5 bg-current"></span>
        </span>
        <span className="font-heading font-bold text-lg tracking-tight">LOGOIPSUM®</span>
      </li>
      <li className="flex items-center gap-2">
        <svg className="w-6 h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M2 12C2 12 5 7 12 7C19 7 22 12 22 12C22 12 19 17 12 17C5 17 2 12 2 12Z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
        <span className="font-heading font-semibold text-lg tracking-tight">logoipsum</span>
      </li>
    </ul>
  );
}

export default function LogoMarquee() {
  return (
    <section className="w-full border-b border-gray-200 bg-[#f6f6f7] py-12 md:py-16">
      <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:gap-12">
          {/* Chiffre-clé (gauche) */}
          <div className="shrink-0 text-center md:text-left">
            <div className="font-heading text-5xl font-light leading-none tracking-tight text-[#FF6600] md:text-6xl">
              +500
            </div>
            <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              Visites réalisées
            </div>
          </div>

          {/* Séparateur vertical (desktop) */}
          <div className="hidden h-16 w-px shrink-0 bg-gray-200 md:block" aria-hidden="true" />

          {/* Marquee de logos (droite) */}
          <div className="marquee-mask relative w-full min-w-0 flex-1 overflow-hidden text-[#0a0a0a]">
            <div className="marquee flex w-max">
              <LogoSet />
              <LogoSet hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
