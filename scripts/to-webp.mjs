// Convertit en WebP les images lourdes RÉELLEMENT utilisées sur le site.
// Usage : node scripts/to-webp.mjs
// Préserve la transparence (mascottes). Ne supprime pas les originaux
// (la suppression se fait après vérification des références).
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const PUBLIC = fileURLToPath(new URL("../public/", import.meta.url));

// Liste explicite des PNG utilisés à la racine de /public (hors franchisés).
const ROOT_PNGS = [
  // secteurs
  "appartement", "chantier", "commerce", "hopital", "hotel",
  "musee", "parc-attraction", "universite", "usine",
  // mascottes / divers utilisés
  "easybear", "01easy", "02easy", "03easy", "04easy", "easy",
  "testbg", "didier", "wink1", "wink2", "matterportpro3", "easyfamily",
].map((n) => `${n}.png`);

const QUALITY = 80;
const fmtKB = (b) => `${(b / 1024).toFixed(0)}KB`;

async function convert(absPng) {
  const absWebp = absPng.replace(/\.png$/i, ".webp");
  const before = (await stat(absPng)).size;
  await sharp(absPng).webp({ quality: QUALITY, effort: 6 }).toFile(absWebp);
  const after = (await stat(absWebp)).size;
  return { before, after };
}

const targets = [];
for (const f of ROOT_PNGS) targets.push(join(PUBLIC, f));
const franchisesDir = join(PUBLIC, "franchises");
for (const f of await readdir(franchisesDir)) {
  if (f.toLowerCase().endsWith(".png")) targets.push(join(franchisesDir, f));
}

let totalBefore = 0, totalAfter = 0, ok = 0, fail = 0;
for (const abs of targets) {
  try {
    const { before, after } = await convert(abs);
    totalBefore += before; totalAfter += after; ok++;
    const rel = abs.slice(PUBLIC.length);
    console.log(`✓ ${rel.padEnd(40)} ${fmtKB(before).padStart(8)} → ${fmtKB(after).padStart(7)}  (-${(100 - (after / before) * 100).toFixed(0)}%)`);
  } catch (e) {
    fail++;
    console.error(`✗ ${abs}: ${e.message}`);
  }
}
console.log(`\n${ok} converties, ${fail} échecs.`);
console.log(`TOTAL : ${fmtKB(totalBefore)} → ${fmtKB(totalAfter)}  (-${(100 - (totalAfter / totalBefore) * 100).toFixed(0)}%, soit ${fmtKB(totalBefore - totalAfter)} économisés)`);
