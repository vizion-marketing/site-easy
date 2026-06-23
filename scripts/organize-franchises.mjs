import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const PUB = path.join(ROOT, "public");
const DEST = path.join(PUB, "franchises");
fs.mkdirSync(DEST, { recursive: true });

// Placeholders / assets à ne jamais traiter comme franchisés (png avec majuscule).
const BLOCK = new Set(["clindoeil2.png", "wink1.png", "wink2.png", "didier.png"]);

// Un fichier franchisé = png contenant une MAJUSCULE ASCII (les assets du site sont en minuscules).
const files = fs
  .readdirSync(PUB)
  .filter((f) => f.toLowerCase().endsWith(".png") && /[A-Z]/.test(f) && !BLOCK.has(f))
  .sort((a, b) => a.localeCompare(b, "fr"));

const slugify = (s) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " et ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

function parse(base) {
  const parts = base.split(" - ").map((s) => s.trim());
  let name = parts[0];
  let rest = parts.slice(1);
  let phone = "";
  if (rest.length) {
    const last = rest[rest.length - 1];
    if (last.replace(/\D/g, "").length >= 9) {
      phone = last;
      rest = rest.slice(0, -1);
    }
  }
  const zone = rest.join(" - ");
  name = name.replace(/\s*\(\d+\)\s*$/, "").trim().normalize("NFC"); // retire le suffixe " (3)"
  const zones = zone
    .split(/[_,/]/)
    .map((s) => s.trim().normalize("NFC"))
    .filter(Boolean);
  return { name, zone: zone.normalize("NFC"), zones, phone: phone.trim() };
}

const seen = new Map();
const data = [];
for (const f of files) {
  const base = f.replace(/\.png$/i, "");
  const info = parse(base);
  let slug = slugify(info.name);
  const n = (seen.get(slug) || 0) + 1;
  seen.set(slug, n);
  if (n > 1) slug = `${slug}-${n}`;
  const photo = `/franchises/${slug}.png`;
  fs.renameSync(path.join(PUB, f), path.join(DEST, `${slug}.png`));
  data.push({ ...info, photo });
}

data.sort((a, b) => a.name.localeCompare(b.name, "fr"));

const entries = data
  .map(
    (d) =>
      `  { name: ${JSON.stringify(d.name)}, zone: ${JSON.stringify(d.zone)}, zones: ${JSON.stringify(
        d.zones
      )}, phone: ${JSON.stringify(d.phone)}, photo: ${JSON.stringify(d.photo)} },`
  )
  .join("\n");

const ts = `// AUTO-GÉNÉRÉ depuis public/franchises/ — réseau de franchisés easyvirtual.tours.
// Pour mettre à jour : déposer les photos « Nom - Secteur - Téléphone.png » dans public/,
// puis relancer le script de rangement.

export type Franchise = {
  name: string;
  zone: string; // secteur affichable (peut être vide)
  zones: string[]; // villes / secteurs détaillés
  phone: string; // téléphone (peut être vide)
  photo: string; // /franchises/<slug>.png
};

export const FRANCHISES: Franchise[] = [
${entries}
];

/** Portraits seuls — marquee « +30 agences » (AboutBento) & bandeau franchisés (ProcessTimeline). */
export const FRANCHISE_AVATARS: string[] = FRANCHISES.map((f) => f.photo);
`;

fs.writeFileSync(path.join(ROOT, "src/lib/franchises.ts"), ts);

console.log(`✅ ${data.length} franchisés rangés dans public/franchises/`);
console.log(data.map((d) => `  • ${d.name} — ${d.zone || "(secteur ?)"} ${d.phone || ""}`).join("\n"));
