import { useEffect, useRef, useState, type FormEvent } from "react";

/* ─────────────────────────────────────────────────────────────────────────
   Dock flottant « Contact + Vidéo » (bas-droite, fixe).
   - Bulle vidéo TOUJOURS visible : teaser Vimeo en autoplay muet bouclé
     (mode background), qui s'ouvre en grand (lightbox, son + contrôles).
   - FAB de contact qui ouvre un panneau à deux onglets : Téléphone / Formulaire.
   Markup/design issus du MCP Gemini Design ; toute la logique (états, validation,
   envoi, URLs Vimeo, accessibilité) est gérée ici. Composant React = îlot Astro.
   ───────────────────────────────────────────────────────────────────────── */

type Props = {
  /** Numéro au format `tel:` (lien d'appel). PLACEHOLDER — à remplacer par le vrai. */
  phoneHref?: string;
  /** Numéro affiché (lisible). PLACEHOLDER — à remplacer par le vrai. */
  displayPhone?: string;
  /** Adresse e-mail de réception du formulaire (fallback mailto). */
  emailContact?: string;
  /** ID + hash de la vidéo Vimeo de la visite virtuelle. */
  vimeoId?: string;
  vimeoHash?: string;
  /** Endpoint optionnel de réception du formulaire (POST JSON). Sinon → mailto. */
  formEndpoint?: string;
  /** Handler de lancement du chatbot (onglet « Chatbot »). Si absent, un événement
   *  `easyvirtual:open-chat` est émis sur `window` pour brancher un chatbot tiers. */
  onStartChat?: () => void;
};

type FormState = {
  nom: string;
  email: string;
  tel: string;
  message: string;
  consent: boolean;
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Petit hook de montage/démontage animé : garde l'élément dans le DOM le temps
   de la transition de sortie, et déclenche l'état « visible » à la frame suivante. */
function useMountTransition(isOpen: boolean, duration = 300) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    let timer = 0;
    if (isOpen) {
      setShouldRender(true);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setIsVisible(true));
      });
    } else {
      setIsVisible(false);
      timer = window.setTimeout(() => setShouldRender(false), duration);
    }
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(timer);
    };
  }, [isOpen, duration]);

  return { shouldRender, isVisible };
}

export default function ContactVideoDock({
  phoneHref = "tel:+33000000000",
  displayPhone = "00 00 00 00 00",
  emailContact = "contact@easyvirtual.tours",
  vimeoId = "1069251974",
  vimeoHash = "7127db85e8",
  formEndpoint,
  onStartChat,
}: Props) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVideoMinimized, setIsVideoMinimized] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"phone" | "form" | "chat">("phone");

  const [form, setForm] = useState<FormState>({
    nom: "",
    email: "",
    tel: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  // Apparition douce de la bulle vidéo au montage.
  const [bubbleMounted, setBubbleMounted] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setBubbleMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const panel = useMountTransition(isPanelOpen, 300);
  const lightbox = useMountTransition(isLightboxOpen, 300);

  // Échap : ferme d'abord la lightbox, sinon le panneau.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isLightboxOpen) setIsLightboxOpen(false);
      else if (isPanelOpen) setIsPanelOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen, isPanelOpen]);

  // Verrouille le scroll du body quand la lightbox est ouverte.
  useEffect(() => {
    if (!isLightboxOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isLightboxOpen]);

  // URLs Vimeo : teaser silencieux en boucle (background) vs lecteur complet (son + contrôles).
  const teaserUrl =
    `https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}` +
    "&background=1&autoplay=1&muted=1&loop=1&autopause=0";
  const fullVideoUrl =
    `https://player.vimeo.com/video/${vimeoId}?h=${vimeoHash}` +
    "&autoplay=1&title=0&byline=0&portrait=0";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.nom.trim()) next.nom = "Indiquez votre nom.";
    if (!form.email.trim()) next.email = "Indiquez votre e-mail.";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "E-mail invalide.";
    if (!form.message.trim()) next.message = "Décrivez votre projet en quelques mots.";
    if (!form.consent) next.consent = "Merci de cocher cette case pour continuer.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    if (formEndpoint) {
      try {
        setStatus("submitting");
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("success");
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback sans backend : composition d'un e-mail pré-rempli.
    const subject = `Demande de contact — ${form.nom}`;
    const body =
      `Nom : ${form.nom}\n` +
      `E-mail : ${form.email}\n` +
      `Téléphone : ${form.tel || "—"}\n\n` +
      `${form.message}`;
    window.location.href =
      `mailto:${emailContact}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
    setStatus("success");
  }

  function closePanel() {
    setIsPanelOpen(false);
    // Réinitialise l'état d'envoi une fois la transition de fermeture passée.
    window.setTimeout(() => setStatus("idle"), 320);
  }

  function startChat() {
    if (onStartChat) {
      onStartChat();
      return;
    }
    // Aucun chatbot branché pour l'instant : on émet un événement que pourra écouter
    // un chatbot tiers (Crisp, Tawk.to, Intercom…), ou passer la prop `onStartChat`.
    window.dispatchEvent(new CustomEvent("easyvirtual:open-chat"));
  }

  const isSubmitted = status === "success";
  const inputBase =
    "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm text-[#0a0a0a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF6600]/20 focus:border-[#FF6600] transition-all";

  return (
    <>
      {/* ═══════ LIGHTBOX — lecteur complet (son + contrôles) ═══════ */}
      {lightbox.shouldRender && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visite virtuelle en vidéo"
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl transition-opacity duration-300 motion-reduce:transition-none ${
            lightbox.isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Fermer la vidéo"
            className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
          <div
            className={`relative aspect-video w-full max-w-5xl transition-all duration-300 motion-reduce:transition-none ${
              lightbox.isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={fullVideoUrl}
              className="h-full w-full rounded-2xl shadow-2xl"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
              title="Visite virtuelle 360° en vidéo — easyvirtual.tours"
            />
          </div>
        </div>
      )}

      {/* ═══════ DOCK FLOTTANT (bas-droite) ═══════ */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">

        {/* ── BULLE VIDÉO (teaser) — masquée si panneau ouvert ou minimisée ── */}
        {!isPanelOpen && !isVideoMinimized && (
          <div
            className={`group relative w-[200px] transition-all duration-500 motion-reduce:transition-none sm:w-[240px] ${
              bubbleMounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {/* Fermer l'aperçu (toujours visible) */}
            <button
              type="button"
              onClick={() => setIsVideoMinimized(true)}
              aria-label="Fermer l'aperçu vidéo"
              className="absolute -right-2 -top-2 z-[2] flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-600 shadow-md ring-1 ring-black/5 transition-colors hover:text-[#FF6600]"
            >
              <CloseIcon className="h-4 w-4" />
            </button>

            {/* Carte vidéo */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_12px_-3px_rgba(10,10,10,0.14),0_32px_64px_-20px_rgba(10,10,10,0.20)] motion-reduce:transition-none sm:aspect-video">
              <iframe
                src={teaserUrl}
                className="pointer-events-none absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 sm:h-[180%] sm:w-[180%]"
                allow="autoplay; fullscreen; picture-in-picture"
                title="Aperçu de la visite virtuelle en vidéo"
                tabIndex={-1}
                aria-hidden="true"
              />

              {/* Voile bas pour la lisibilité */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

              {/* Pastille « en direct » */}
              <div className="pointer-events-none absolute left-3 top-3">
                <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF6600] opacity-75 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF6600]" />
                  </span>
                  360° · VIDÉO
                </div>
              </div>

              {/* Légende bas */}
              <div className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center gap-2 text-white">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FF6600] shadow-lg">
                  <PlayIcon className="ml-0.5 h-3 w-3" />
                </span>
                <span className="text-[11px] font-semibold leading-tight drop-shadow-md">
                  Notre co-fondateur vous présente la visite virtuelle
                </span>
              </div>

              {/* Surface cliquable (ouvre la lightbox) — au-dessus de l'iframe */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                aria-label="Ouvrir la vidéo de la visite virtuelle"
                className="absolute inset-0 z-[1] h-full w-full cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* ── PASTILLE DE RESTAURATION (si vidéo minimisée) ── */}
        {!isPanelOpen && isVideoMinimized && (
          <button
            type="button"
            onClick={() => setIsVideoMinimized(false)}
            className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-[#0a0a0a] shadow-lg transition-all hover:-translate-y-0.5 motion-reduce:transition-none"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF6600] text-white">
              <PlayIcon className="ml-0.5 h-2.5 w-2.5" />
            </span>
            Revoir la vidéo
          </button>
        )}

        {/* ── PANNEAU DE CONTACT ── */}
        {panel.shouldRender && (
          <>
            {/* Voile (mobile) */}
            <div
              className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${
                panel.isVisible ? "opacity-100" : "opacity-0"
              }`}
              onClick={closePanel}
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-label="Nous contacter"
              className={`relative w-[340px] max-w-[calc(100vw-2rem)] origin-bottom-right overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_2px_8px_-3px_rgba(10,10,10,0.10),0_22px_48px_-18px_rgba(10,10,10,0.14)] transition-all duration-300 motion-reduce:transition-none sm:w-[380px] ${
                panel.isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"
              }`}
            >
              {/* En-tête */}
              <div className="p-8 pb-4">
                <div className="mb-2 flex items-start justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6600]">
                    <SparkleIcon className="h-4 w-4" />
                    <span>Contact</span>
                  </div>
                  <button
                    type="button"
                    onClick={closePanel}
                    aria-label="Fermer"
                    className="-mr-1 -mt-1 p-1 text-gray-400 transition-colors hover:text-gray-600"
                  >
                    <CloseIcon className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="mb-2 font-heading text-2xl font-bold leading-tight text-[#0a0a0a]">
                  Parlons de votre projet
                </h3>
                <p className="text-sm leading-relaxed text-gray-500">
                  Notre équipe vous accompagne pour créer votre visite virtuelle sur-mesure.
                </p>
              </div>

              {/* Onglets */}
              <div className="mb-6 px-8">
                <div className="flex rounded-2xl bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab("phone")}
                    className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl py-2.5 text-xs font-semibold transition-all motion-reduce:transition-none ${
                      activeTab === "phone" ? "bg-white text-[#0a0a0a] shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                    aria-pressed={activeTab === "phone"}
                  >
                    <PhoneIcon className="h-3.5 w-3.5" />
                    Téléphone
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("chat")}
                    className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl py-2.5 text-xs font-semibold transition-all motion-reduce:transition-none ${
                      activeTab === "chat" ? "bg-white text-[#0a0a0a] shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                    aria-pressed={activeTab === "chat"}
                  >
                    <ChatIcon className="h-3.5 w-3.5" />
                    Chatbot
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("form")}
                    className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl py-2.5 text-xs font-semibold transition-all motion-reduce:transition-none ${
                      activeTab === "form" ? "bg-white text-[#0a0a0a] shadow-sm" : "text-gray-500 hover:text-gray-700"
                    }`}
                    aria-pressed={activeTab === "form"}
                  >
                    <MailIcon className="h-3.5 w-3.5" />
                    Formulaire
                  </button>
                </div>
              </div>

              {/* Contenu */}
              <div className="px-8 pb-8">
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff4ec] text-[#FF6600]">
                      <CheckIcon className="h-8 w-8" />
                    </div>
                    <h4 className="mb-2 font-heading text-xl font-bold text-[#0a0a0a]">Message envoyé !</h4>
                    <p className="mb-6 text-sm text-gray-500">
                      Merci, nous vous recontactons sous 24h ouvrées.
                    </p>
                    <button
                      type="button"
                      onClick={closePanel}
                      className="text-sm font-bold text-[#FF6600] underline underline-offset-4"
                    >
                      Fermer la fenêtre
                    </button>
                  </div>
                ) : activeTab === "phone" ? (
                  <div>
                    <div className="mb-6 flex flex-col items-center rounded-2xl border-2 border-dashed border-gray-100 py-6 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600]">
                        <PhoneIcon className="h-6 w-6" />
                      </div>
                      <span className="mb-1 font-heading text-2xl font-bold text-[#0a0a0a]">{displayPhone}</span>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        Rappel sous 24h • Partout en France
                      </p>
                    </div>

                    <a
                      href={phoneHref}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FF6600] px-8 py-4 font-semibold text-white shadow-xl shadow-orange-900/10 transition-all hover:bg-[#e85c00] active:scale-[0.98] motion-reduce:transition-none"
                    >
                      Appeler maintenant
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                    </a>

                    <button
                      type="button"
                      onClick={() => setActiveTab("form")}
                      className="mt-4 w-full text-center text-sm font-semibold text-gray-500 transition-colors hover:text-[#FF6600]"
                    >
                      ou écrivez-nous via le formulaire
                    </button>
                  </div>
                ) : activeTab === "chat" ? (
                  <div>
                    {/* Encart d'état du service — chatbot disponible */}
                    <div className="mb-6 flex flex-col items-center rounded-2xl border-2 border-dashed border-gray-100 py-6 text-center">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff4ec] text-[#FF6600]">
                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
                        </svg>
                      </div>
                      <span className="mb-2 font-heading text-2xl font-bold text-[#0a0a0a]">Assistant en ligne</span>
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 motion-safe:animate-ping" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                        </span>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Réponse immédiate • 7j/7</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={startChat}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FF6600] px-8 py-4 font-semibold text-white shadow-xl shadow-orange-900/10 transition-all hover:bg-[#e85c00] active:scale-[0.98] motion-reduce:transition-none"
                    >
                      Démarrer la conversation
                      <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("form")}
                      className="mt-4 w-full text-center text-sm font-semibold text-gray-500 transition-colors hover:text-[#FF6600]"
                    >
                      ou écrivez-nous via le formulaire
                    </button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="cvd-nom" className="ml-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Nom
                        </label>
                        <input
                          id="cvd-nom"
                          type="text"
                          value={form.nom}
                          onChange={(e) => update("nom", e.target.value)}
                          placeholder="Votre nom"
                          aria-invalid={!!errors.nom}
                          className={`${inputBase} ${errors.nom ? "border-red-400" : "border-gray-200"}`}
                        />
                        {errors.nom && <p className="ml-1 text-[10px] font-medium text-red-500">{errors.nom}</p>}
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="cvd-tel" className="ml-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Téléphone
                        </label>
                        <input
                          id="cvd-tel"
                          type="tel"
                          value={form.tel}
                          onChange={(e) => update("tel", e.target.value)}
                          placeholder="06…"
                          className={`${inputBase} border-gray-200`}
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="cvd-email" className="ml-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        E-mail
                      </label>
                      <input
                        id="cvd-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="email@exemple.fr"
                        aria-invalid={!!errors.email}
                        className={`${inputBase} ${errors.email ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors.email && <p className="ml-1 text-[10px] font-medium text-red-500">{errors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="cvd-message" className="ml-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Message
                      </label>
                      <textarea
                        id="cvd-message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => update("message", e.target.value)}
                        placeholder="Dites-nous en plus sur votre projet…"
                        aria-invalid={!!errors.message}
                        className={`${inputBase} resize-none ${errors.message ? "border-red-400" : "border-gray-200"}`}
                      />
                      {errors.message && <p className="ml-1 text-[10px] font-medium text-red-500">{errors.message}</p>}
                    </div>

                    <label className="flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={(e) => update("consent", e.target.checked)}
                        className="mt-0.5 accent-[#FF6600]"
                      />
                      <span className="text-[11px] leading-tight text-gray-500">
                        J'accepte d'être recontacté pour discuter de mon projet de visite virtuelle.
                      </span>
                    </label>
                    {errors.consent && <p className="ml-1 text-[10px] font-medium text-red-500">{errors.consent}</p>}

                    {status === "error" && (
                      <p className="text-[11px] font-medium text-red-500">
                        Une erreur est survenue. Réessayez ou appelez-nous directement.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#FF6600] px-8 py-4 font-semibold text-white shadow-xl shadow-orange-900/10 transition-all hover:bg-[#e85c00] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 motion-reduce:transition-none"
                    >
                      {status === "submitting" ? "Envoi…" : "Envoyer ma demande"}
                      {status !== "submitting" && (
                        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </>
        )}

        {/* ── FAB DE LANCEMENT ── */}
        <div className="group flex items-center gap-3">
          {!isPanelOpen && (
            <span className="hidden -translate-x-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#0a0a0a] opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none sm:block">
              Contactez-nous
            </span>
          )}

          <button
            type="button"
            onClick={() => (isPanelOpen ? closePanel() : setIsPanelOpen(true))}
            aria-label={isPanelOpen ? "Fermer le panneau de contact" : "Ouvrir le panneau de contact"}
            aria-expanded={isPanelOpen}
            className={`relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl transition-all duration-500 active:scale-90 motion-reduce:transition-none sm:h-16 sm:w-16 ${
              isPanelOpen ? "rotate-90 bg-[#0a0a0a]" : "bg-[#FF6600]"
            }`}
            style={!isPanelOpen ? { backgroundImage: "linear-gradient(40deg, #e85c00 0%, #FF6600 52%, #ff8a3d 100%)" } : undefined}
          >
            {!isPanelOpen && (
              <span className="absolute inset-0 rounded-full bg-[#FF6600]/30 opacity-40 motion-safe:animate-ping" />
            )}
            {isPanelOpen ? <CloseIcon className="h-7 w-7" /> : <ChatIcon className="h-7 w-7" />}
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Icônes (SVG inline, conformes au design system) ── */

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M5 3 19 12 5 21V3Z" />
    </svg>
  );
}

function ChatIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0 14.59 9.41 24 12 14.59 14.59 12 24 9.41 14.59 0 12 9.41 9.41 12 0Z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
