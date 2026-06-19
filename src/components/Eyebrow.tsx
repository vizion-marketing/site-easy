import type { ReactNode } from "react";

/* Sur-titre (eyebrow) standard du site : une SEULE icône (sparkle orange) +
   texte bold, minuscule, petit. À réutiliser partout pour la cohérence.
   `as` permet de changer la couleur du texte selon le fond (ex. white sur orange). */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold lowercase tracking-tight text-[#FF6600] ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
        <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
      </svg>
      {children}
    </span>
  );
}
