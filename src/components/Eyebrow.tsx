import type { ReactNode } from "react";

/* Sur-titre (eyebrow) standard du site : une SEULE icône (sparkle orange) +
   texte bold, petit, TOUJOURS avec une majuscule au début. À réutiliser partout
   pour la cohérence. La majuscule initiale est forcée ici pour que tous les
   eyebrows (y compris ceux saisis dans Sanity) respectent la règle. */
export default function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const content =
    typeof children === "string" && children.length > 0
      ? children.charAt(0).toUpperCase() + children.slice(1)
      : children;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-tight text-[#FF6600] ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
        <path d="M12 2 14 10 22 12 14 14 12 22 10 14 2 12 10 10Z" />
      </svg>
      {content}
    </span>
  );
}
