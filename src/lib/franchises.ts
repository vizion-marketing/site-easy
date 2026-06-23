// AUTO-GÉNÉRÉ depuis public/franchises/ — réseau de franchisés easyvirtual.tours.
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
  { name: "Abdel Makil", zone: "", zones: [], phone: "", photo: "/franchises/abdel-makil.webp" },
  { name: "Alain-Thierry", zone: "", zones: [], phone: "", photo: "/franchises/alain-thierry.webp" },
  { name: "Alexandre Ballou", zone: "Bordeaux Sud_Nord", zones: ["Bordeaux Sud","Nord"], phone: "05 64 72 39 87", photo: "/franchises/alexandre-ballou.webp" },
  { name: "Antoine Marion", zone: "Charleville-Mézières", zones: ["Charleville-Mézières"], phone: "07 86 44 95 54", photo: "/franchises/antoine-marion.webp" },
  { name: "Arthur Vogel", zone: "Nancy_Metz_Narbonne", zones: ["Nancy","Metz","Narbonne"], phone: "07 57 63 12 54", photo: "/franchises/arthur-vogel.webp" },
  { name: "Cédric Guillaud", zone: "Angers", zones: ["Angers"], phone: "06 10 89 07 79", photo: "/franchises/cedric-guillaud.webp" },
  { name: "Didier Colin", zone: "Seine-et-Marne", zones: ["Seine-et-Marne"], phone: "06 77 00 56 23", photo: "/franchises/didier-colin.webp" },
  { name: "Doutchka & Wladimir", zone: "Toulouse", zones: ["Toulouse"], phone: "06 27 77 63 28", photo: "/franchises/doutchka-et-wladimir.webp" },
  { name: "Elodie Le Blond", zone: "Montauban", zones: ["Montauban"], phone: "06 17 52 25 37", photo: "/franchises/elodie-le-blond.webp" },
  { name: "Emma Benneteau", zone: "Nice_Fréjus_Cannes", zones: ["Nice","Fréjus","Cannes"], phone: "", photo: "/franchises/emma-benneteau.webp" },
  { name: "Guillaume Fieffel", zone: "Strasbourg _ Colmar", zones: ["Strasbourg","Colmar"], phone: "03 92 18 02 72", photo: "/franchises/guillaume-fieffel.webp" },
  { name: "Hugo De Dios Llebano", zone: "Pamiers", zones: ["Pamiers"], phone: "07 50 45 92 88", photo: "/franchises/hugo-de-dios-llebano.webp" },
  { name: "Jean Dheurle", zone: "Strasbourg _ Colmar", zones: ["Strasbourg","Colmar"], phone: "", photo: "/franchises/jean-dheurle.webp" },
  { name: "Julien Chevalier", zone: "Nice_Fréjus_Cannes", zones: ["Nice","Fréjus","Cannes"], phone: "06 58 15 83 00", photo: "/franchises/julien-chevalier.webp" },
  { name: "Leny Colin", zone: "Seine-et-Marne", zones: ["Seine-et-Marne"], phone: "", photo: "/franchises/leny-colin.webp" },
  { name: "Lionel Allée", zone: "Le Mans", zones: ["Le Mans"], phone: "06 08 74 87 82", photo: "/franchises/lionel-allee.webp" },
  { name: "Marc Albietz", zone: "Bourges_Châteauroux", zones: ["Bourges","Châteauroux"], phone: "07 83 90 02 34", photo: "/franchises/marc-albietz.webp" },
  { name: "Nicolas Lajus", zone: "Côte Basque", zones: ["Côte Basque"], phone: "", photo: "/franchises/nicolas-lajus.webp" },
  { name: "Peiyi Chang", zone: "Paris 1_6_9e arrondissement", zones: ["Paris 1","6","9e arrondissement"], phone: "06 17 70 39 69", photo: "/franchises/peiyi-chang.webp" },
  { name: "Philippe Destors", zone: "Tours", zones: ["Tours"], phone: "06 25 55 47 88", photo: "/franchises/philippe-destors.webp" },
  { name: "Philippe Lachamp", zone: "Aubagne, Marseille Sud, Toulon", zones: ["Aubagne","Marseille Sud","Toulon"], phone: "", photo: "/franchises/philippe-lachamp.webp" },
  { name: "Quentin Blondin", zone: "Muret", zones: ["Muret"], phone: "06 72 20 00 53", photo: "/franchises/quentin-blondin.webp" },
  { name: "Raj Akuthota", zone: "", zones: [], phone: "", photo: "/franchises/raj-akuthota.webp" },
  { name: "Sandy et Radoine", zone: "Clermont-Ferrand_Lyon_Moulins_Saint-Etienne_Villeurbanne", zones: ["Clermont-Ferrand","Lyon","Moulins","Saint-Etienne","Villeurbanne"], phone: "06 21 52 20 16", photo: "/franchises/sandy-et-radoine.webp" },
  { name: "Stéphane Zé-Ogier", zone: "Courbevoie", zones: ["Courbevoie"], phone: "07 83 18 26 36", photo: "/franchises/stephane-ze-ogier.webp" },
  { name: "Stévan Guéguen", zone: "Nantes", zones: ["Nantes"], phone: "06 68 43 44 26", photo: "/franchises/stevan-gueguen.webp" },
  { name: "Yuta Suzuki", zone: "Grenoble Sud_Est", zones: ["Grenoble Sud","Est"], phone: "06 82 52 09 04", photo: "/franchises/yuta-suzuki.webp" },
];

/** Portraits seuls — marquee « +30 agences » (AboutBento) & bandeau franchisés (ProcessTimeline). */
export const FRANCHISE_AVATARS: string[] = FRANCHISES.map((f) => f.photo);
