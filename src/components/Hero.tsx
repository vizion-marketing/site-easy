import { LogoSet } from "./LogoMarquee";

export default function Hero() {
  return (
    <section className="relative w-full bg-white -mt-[84px] sm:-mt-[88px] pt-2 pb-6 md:pb-8 selection:bg-[#FF6600]/30">
      {/* IMAGE QUASI PLEINE LARGEUR — légers espaces latéraux seulement */}
      <div className="w-full px-3 sm:px-4">
        <div className="relative overflow-hidden rounded-3xl min-h-screen flex flex-col shadow-[0_12px_32px_-16px_rgba(255,102,0,0.12)]">
          {/* ARRIÈRE-PLAN PLEINE LARGEUR */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <video
              src="/7b3c0346-1542-48f2-bea3-c7fc0c29ce71.mp4"
              poster="/testbg.png"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
            {/* Voile sombre léger en bas — lisibilité du texte blanc */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          </div>

          {/* CONTENU ANCRÉ EN BAS — CONTENEURISÉ À 1440px (aligné sur le reste du site) */}
          <div className="relative z-10 mt-auto w-full">
            <div className="mx-auto w-full max-w-[var(--container)] px-6 sm:px-8 py-8 md:py-12 lg:py-16">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12 lg:gap-20">

                {/* BLOC GAUCHE : Titre & CTA */}
                <div className="flex-1 max-w-4xl">
                  {/* Eyebrow */}
                  <div className="flex items-center gap-1.5 mb-6">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#FF6600]">
                      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                    </svg>
                    <span className="text-xs font-bold tracking-tight text-[#FF6600]">
                      Visites virtuelles 360°
                    </span>
                  </div>

                  <h1 className="font-heading font-bold tracking-[-0.04em] leading-[0.95] text-[2.5rem] md:text-[56px] text-white">
                    Vos visites virtuelles et jumeaux numériques livrés en <span className="font-cooper highlight-shine">48h</span>, partout en France
                  </h1>

                  <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <a href="#demo" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6600] hover:bg-[#e85c00] text-white rounded-full font-semibold transition-all duration-300 shadow-xl shadow-orange-900/10">
                      Demander une démo
                      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                        <path d="M5 10h10m-4-4l4 4-4 4" />
                      </svg>
                    </a>
                    <a href="#visite-virtuelle" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-[#FF6600] rounded-full border border-dashed border-[#FF6600] hover:bg-[#FF6600]/10 font-semibold transition-all duration-300">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" />
                      </svg>
                      Découvrir la visite virtuelle
                    </a>
                  </div>
                </div>

                {/* BLOC DROIT : Stats */}
                <div className="flex flex-wrap items-center gap-x-8 gap-y-6 lg:pb-4">
                  <div className="flex flex-col">
                    <span className="font-heading font-light text-3xl md:text-4xl tracking-tight text-white">+500</span>
                    <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">Visites réalisées</span>
                  </div>
                  <div className="hidden sm:block h-12 w-px bg-white/25" />
                  <div className="flex flex-col">
                    <span className="flex items-center gap-2 font-heading font-light text-3xl md:text-4xl tracking-tight text-white">
                      <svg viewBox="0 0 24 24" className="h-7 w-7 shrink-0" aria-hidden="true">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      4,9/5
                    </span>
                    <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">Satisfaction client</span>
                  </div>
                  <div className="hidden sm:block h-12 w-px bg-white/25" />
                  <div className="flex flex-col gap-2.5">
                    {/* Partenaire Google */}
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      <span className="text-sm font-semibold tracking-tight text-white">Partenaire Google</span>
                    </span>
                    {/* Partenaire Matterport */}
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 backdrop-blur-sm">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-white" aria-hidden="true">
                        <path d="M12 2 21 7v10l-9 5-9-5V7z" />
                        <path d="M12 12 21 7M12 12v10M12 12 3 7" />
                      </svg>
                      <span className="text-sm font-semibold tracking-tight text-white">Partenaire Matterport</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Bandeau logos partenaires — intégré en bas du hero (logos blancs) */}
              <div className="mt-12 border-t border-white/15 pt-8 md:mt-16">
                <div className="marquee-mask relative w-full overflow-hidden text-white/85">
                  <div className="marquee flex w-max">
                    <LogoSet />
                    <LogoSet hidden />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
