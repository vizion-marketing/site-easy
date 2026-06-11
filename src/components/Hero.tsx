import { useState } from "react";
import { ArrowRightMotion } from "@carbon/icons-motion";

/* Jeu de 6 logos placeholder (marquee), affiché en bas du hero. */
function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-x-16 pr-16 text-white" aria-hidden={hidden}>
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

export default function Hero() {
  // Anime la flèche du CTA quand on survole tout le bouton
  const [ctaHover, setCtaHover] = useState(false);

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col overflow-hidden bg-zinc-950 font-sans selection:bg-[#FF6600]/30 selection:text-white">
      {/*
        REMPLACER PAR LA PHOTO DE FOND
        Instructions : remplacer le div de dégradé ci-dessous par une balise <img>
        (object-cover, absolute inset-0) ou un background-image. Garder les deux
        overlays qui suivent pour préserver la lisibilité du texte.
      */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/*
          PLACEHOLDER IMAGE — remplacer le `src` ci-dessous par la vraie photo
          (asset dans /public ou URL). Garder object-cover + les overlays.
        */}
        <img
          src="/easy.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain"
        />

        {/* Filtre sombre uniquement à gauche (s'efface avant ~60%) :
            lisibilité du texte à gauche, image 100% naturelle à droite. */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/40 to-transparent to-[60%]" />

        {/* Dégradé bas : noir collé à la section logos, s'efface vers le haut.
            Accentue le contraste entre le hero sombre et le bandeau blanc. */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black via-black/50 to-transparent" />
      </div>

      {/* CONTENU HERO */}
      <main className="relative z-10 flex-grow flex items-center">
        <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8 py-12 md:py-20">
          <div className="max-w-2xl">
            {/* TITRE */}
            <h1 className="font-heading text-[2.5rem] leading-[0.95] md:text-[4rem] lg:text-[4.5rem] font-light text-white tracking-[-0.04em] md:leading-[0.9]">
              Vos visites virtuelles Matterport <br className="hidden sm:block" />
              livrées en 48h, <br className="hidden sm:block" />
              partout en France
            </h1>

            {/* SOUS-TITRE */}
            <p className="mt-8 text-lg md:text-xl text-white/80 font-normal max-w-lg leading-relaxed">
              Nous combinons un accompagnement centré sur l'humain et des solutions de capture 360° intelligentes pour aider les organisations à mieux décider et bâtir un avenir plus immersif.
            </p>

            {/* BOUTONS CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-stretch gap-4">
              <a
                href="#demo"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6600] hover:bg-[#e85c00] text-white rounded-full font-semibold transition-all duration-300 shadow-xl shadow-orange-900/10"
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => setCtaHover(false)}
              >
                Demander une démo
                <span className="cds-motion-icon cds-motion-icon--white transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightMotion isAnimating={ctaHover} size={20} />
                </span>
              </a>

              <a
                href="#visite-virtuelle"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-[#FF6600] rounded-full font-semibold transition-all duration-300 hover:bg-[#FF6600]/10 border border-dashed border-[#FF6600]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                Découvrir la visite virtuelle
              </a>
            </div>

            {/* Note Google + partenariats */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              {/* Note Google */}
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-heading font-semibold text-white text-base">4,9</span>
                    <div className="flex gap-0.5 text-[#FF6600]">
                      {[0, 1, 2, 3, 4].map((s) => (
                        <svg key={s} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-white/60 text-xs">Avis Google</span>
                </div>
              </div>

              {/* Séparateur */}
              <div className="hidden md:block w-px h-10 bg-white/20" aria-hidden="true" />

              {/* Partenariats (logos) */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Matterport */}
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
                  <span className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.15em]">Partenaire</span>
                  <span className="font-heading font-semibold text-white text-sm tracking-tight">Matterport</span>
                </span>
                {/* Google */}
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm">
                  <span className="text-white/50 text-[10px] font-semibold uppercase tracking-[0.15em]">Partenaire</span>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="font-medium text-white text-sm tracking-tight">Google</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BANDEAU LOGOS — collé en bas du hero, hors flux (contenu centré sur toute la hauteur) */}
      <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/60 to-transparent pt-16 pb-10 md:pb-12">
        <div className="marquee-mask relative w-full overflow-hidden">
          <div className="marquee flex w-max">
            <LogoSet />
            <LogoSet hidden />
          </div>
        </div>
      </div>

      {/* Séparateur en biseau — bas du hero (transition diagonale vers la section blanche) */}
      <div
        className="absolute bottom-0 inset-x-0 z-20 h-8 bg-white"
        style={{ clipPath: "polygon(0 0, 100% 100%, 0 100%)" }}
        aria-hidden="true"
      />
    </section>
  );
}
