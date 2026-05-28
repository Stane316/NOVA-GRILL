/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpecialtyItem {
  id: string;
  title: string;
  category: string;
  price?: string;
  description: string;
  image: string;
  tasteNotes: string[];
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  tag: string;
  aspect: string; // Tailwind class, e.g., 'aspect-video', 'aspect-square', 'aspect-[3/4]'
}

export interface EventSchedule {
  day: string;
  title: string;
  time: string;
  vibes: string;
  highlight: boolean;
}

// Highly strategic coordinates of Nova Grill
export const NOVA_CONTACT = {
  phone: "+229 01 96 13 52 87",
  phoneFormatted: "+229 01 96 13 52 87",
  address: "Carrefour Tankpè, Abomey-Calavi, Bénin",
  hours: "Ouvert tous les jours de 07h à 01h du matin",
  djNight: "Chaque samedi soir dès 20h — DJ Live",
  tiktokUrl: "https://www.tiktok.com/@restaurant.nova.grill",
  tiktokHandle: "@restaurant.nova.grill",
  followerCount: "11.2K",
  likesCount: "131.7K"
};

// Paths to our pristine generated images
export const IMAGES = {
  heroEmbers: "/src/assets/images/hero_grill_embers_1779896144555.png",
  signaturePlate: "/src/assets/images/grill_signature_plate.png",
  cocktailGlow: "/src/assets/images/cocktail_glow.png",
  terrasseDJ: "/src/assets/images/terrasse_dj_vibe.png",
  // Backup or additional stylized backgrounds using premium Picsum seeds matching deep gold and black
  loungeBar: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200", // Dark chic mixologist bar
  brazierCloseUp: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200", // Premium charcoal woodfire
  ambientLounge: "https://images.unsplash.com/photo-1574096079513-d8259312b7a3?auto=format&fit=crop&q=80&w=1200" // Cozy outdoor warm lighting terrace
};

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: "premium-grill",
    title: "Grillades Signature & Braise d'Or",
    category: "Signature Royale",
    description: "Des viandes d'une tendreté absolue infusées au bois de palétuvier sélectionné. Cuisinées à la braise pure selon un savoir-faire préservé, caramélisées et saisies à haute température pour capturer tous les sucs aromatiques.",
    image: IMAGES.heroEmbers,
    tasteNotes: ["Fumé subtil", "Épices locales secrètes", "Moelleux incomparable"]
  },
  {
    id: "signature-combo",
    title: "Le Menu Iconique de 5K",
    category: "Favori de la Communauté",
    price: "5,000 FCFA",
    description: "La formule légendaire encensée sur TikTok au Bénin. Notre poulet braisé croustillant à souhait ou poisson frais grillé, accompagné d'allocos dorés et fondants, d'ignames frites croustillantes et de nos piments signatures faits maison.",
    image: IMAGES.signaturePlate,
    tasteNotes: ["Croustillant", "Sucré-Salé Alloco", "Piment de Caractère"]
  },
  {
    id: "cocktail-art",
    title: "Cocktails de Créateurs",
    category: "Mixologie Nocturne",
    description: "Une alchimie d'élixirs tropicaux pensés pour éveiller vos sens. Fruits de la passion frais, gingembre pressé à chaud, herbes sauvages et spiritueux de prestige concoctés sous vos yeux au bar central.",
    image: IMAGES.cocktailGlow,
    tasteNotes: ["Fraîcheur vive", "Zestes infusés", "Éclat nocturne"]
  },
  {
    id: "terrasse-lounge",
    title: "La Terrasse & L'Esprit Groupe",
    category: "Ambiance Resto-Lounge",
    description: "Que ce soit pour célébrer un anniversaire mémorable, privatiser un espace ou se retrouver au coucher du soleil sous nos pergolas illuminées de guirlandes chaudes. Le plus prestigieux spot social de Calavi.",
    image: IMAGES.terrasseDJ,
    tasteNotes: ["DJ Live Samedi", "Design suspendu", "Lumière tamisée"]
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    url: IMAGES.heroEmbers,
    title: "La Braise en Fusion",
    subtitle: "Le secret de nos côtes et poulets parfaitement dorés",
    tag: "Art de la Braise",
    aspect: "aspect-[16/10]"
  },
  {
    id: "gal-2",
    url: IMAGES.signaturePlate,
    title: "Le Célèbre Plat de 5K",
    subtitle: "Gourmand, authentique, généreux",
    tag: "TikTok Favori",
    aspect: "aspect-square"
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800", // Premium cocktail prep
    title: "Mixologie à Gogo",
    subtitle: "Infusions de gin frais, menthe, mangue verte",
    tag: "Sensory Bar",
    aspect: "aspect-[3/4]"
  },
  {
    id: "gal-4",
    url: IMAGES.terrasseDJ,
    title: "Saturday Live Beats",
    subtitle: "DJ sets nocturnes tous les samedis soirs",
    tag: "Nightlife",
    aspect: "aspect-[16/10]"
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800", // Stylish tables at night
    title: "L'Ambiance Cosy",
    subtitle: "Lumières tamisées et rires partagés sous les étoiles de Calavi",
    tag: "Lounge",
    aspect: "aspect-square"
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800", // Chef finishing a plate
    title: "Le Souci du Détail",
    subtitle: "Chaque épice est moulue à la main avant le service",
    tag: "Cuisine",
    aspect: "aspect-[4/3]"
  }
];

export const EVENT_SCHEDULE: EventSchedule[] = [
  {
    day: "Lundi - Vendredi",
    title: "Afterwork Chic & Braises Tamisées",
    time: "17h00 - 01h00",
    vibes: "Apéros froids, brochettes juteuses, musique d'ambiance",
    highlight: false
  },
  {
    day: "Chaque Samedi Soir",
    title: "Nova Saturday Night DJ Live",
    time: "20h00 - 01h00+",
    vibes: "DJ Set Afrobeats, Amapiano, Dancehall & Mixology show",
    highlight: true
  },
  {
    day: "Tous les Dimanches",
    title: "Sunday Family Feast & Chilled Lounge",
    time: "12h00 - 01h00",
    vibes: "Plats XXL à partager, cocktails d'été, chill lounge en terrasse",
    highlight: false
  }
];
