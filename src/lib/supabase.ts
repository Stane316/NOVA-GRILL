/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from "@supabase/supabase-js";
import { SiteMedia } from "../types";

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || "";
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || "";

const isProductionSupabaseSet = 
  supabaseUrl && 
  supabaseUrl !== "YOUR_SUPABASE_URL" && 
  supabaseAnonKey && 
  supabaseAnonKey !== "YOUR_SUPABASE_ANON_KEY";

export const supabase = isProductionSupabaseSet 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

/**
 * =========================================================================
 * HEALER & STORAGE SIMULATOR (DUAL-MODE ENGINE)
 * Allows developers and clients to test the premium Admin Dashboard
 * instantly inside the AI Studio preview before or during Supabase setup!
 * =========================================================================
 */

// Helper to load or initialize fallback mock structures in LocalStorage
function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(`nova_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
}

function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`nova_${key}`, JSON.stringify(value));
  } catch (e) {}
}

const defaultSettings = {
  hero_title: "Quand les lumières baissent...",
  hero_subtitle: "Le Rituel de la Braise Pure",
  phone: "+229 01 96 13 52 87",
  address: "Carrefour Tankpè, Abomey-Calavi, Bénin",
  opening_hours: "Ouvert tous les jours de 07h à 01h du matin",
  tiktok_url: "https://www.tiktok.com/@restaurant.nova.grill",
  tiktok_handle: "@restaurant.nova.grill",
  follower_count: "11.2K",
  likes_count: "131.7K"
};

const defaultGallery = [
  {
    id: "gal-1",
    type: "image",
    title: "La Braise en Fusion",
    media_url: "/src/assets/images/hero_grill_embers_1779896144555.png",
    aspect: "aspect-[16/10]",
    order_index: 0
  },
  {
    id: "gal-2",
    type: "image",
    title: "Le Célèbre Plat de 5K",
    media_url: "/src/assets/images/grill_signature_plate_1779896160419.png",
    aspect: "aspect-square",
    order_index: 1
  },
  {
    id: "gal-3",
    type: "image",
    title: "Mixologie à Gogo",
    media_url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
    aspect: "aspect-[3/4]",
    order_index: 2
  },
  {
    id: "gal-4",
    type: "image",
    title: "Saturday Live Beats",
    media_url: "/src/assets/images/terrasse_dj_vibe_1779896194076.png",
    aspect: "aspect-[16/10]",
    order_index: 3
  }
];

const defaultHeroMedia = {
  id: "hero-1",
  video_url: "https://assets.mixkit.co/videos/preview/mixkit-barman-shaking-metal-shaker-creating-bubbles-34288-large.mp4",
  poster_url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
  mobile_video_url: ""
};

const defaultEventVideos = [
  {
    id: "ev-1",
    title: "Set Live DJ",
    video_url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-playing-music-on-a-dj-deck-42548-large.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
    created_at: new Date().toISOString()
  },
  {
    id: "ev-2",
    title: "Braise Intense",
    video_url: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-barbecue-coal-burning-43093-large.mp4",
    thumbnail_url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600",
    created_at: new Date().toISOString()
  }
];

const defaultSiteMedia: Record<string, Omit<SiteMedia, "id">> = {
  logo_main: {
    section_key: "logo_main",
    media_type: "image",
    media_url: "", // Empty means text fallback in logo
    title: "Logo Principal",
    alt: "Nova Grill Logo"
  },
  hero_main: {
    section_key: "hero_main",
    media_type: "image",
    media_url: "/src/assets/images/hero_grill_embers_1779896144555.png",
    title: "Image d'Arrière-plan du Hero",
    alt: "Braise ardente closeup"
  },
  hero_video: {
    section_key: "hero_video",
    media_type: "video",
    media_url: "https://assets.mixkit.co/videos/preview/mixkit-barman-shaking-metal-shaker-creating-bubbles-34288-large.mp4",
    title: "Vidéo d'Arrière-plan du Hero",
    alt: "Mixologue préparant un cocktail"
  },
  teaser_media: {
    section_key: "teaser_media",
    media_type: "video",
    media_url: "https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-barbecue-coal-burning-43093-large.mp4",
    title: "Vidéo Teaser Braise",
    alt: "Braise en fusion et flamme gril"
  },
  creations_01: {
    section_key: "creations_01",
    media_type: "image",
    media_url: "/src/assets/images/hero_grill_embers_1779896144555.png",
    title: "Signatures: Grillades Chaleureuses",
    alt: "Grillades et braise"
  },
  creations_02: {
    section_key: "creations_02",
    media_type: "image",
    media_url: "/src/assets/images/grill_signature_plate_1779896160419.png",
    title: "Signatures: Le Célèbre Plat de 5K",
    alt: "TikTok poulet alloco"
  },
  creations_03: {
    section_key: "creations_03",
    media_type: "image",
    media_url: "/src/assets/images/cocktail_glow_1779896178524.png",
    title: "Signatures: Cocktails de Créateurs",
    alt: "Freshly made cocktails"
  },
  creations_04: {
    section_key: "creations_04",
    media_type: "image",
    media_url: "/src/assets/images/terrasse_dj_vibe_1779896194076.png",
    title: "Signatures: Ambiance Resto Lounge",
    alt: "Terrasse sous les lanternes"
  },
  ambiance_01: {
    section_key: "ambiance_01",
    media_type: "image",
    media_url: "/src/assets/images/hero_grill_embers_1779896144555.png",
    title: "Atmosphère: L'Alchimie du Feu",
    alt: "Braise en fusion"
  },
  ambiance_02: {
    section_key: "ambiance_02",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200",
    title: "Atmosphère: Tempête de Glace",
    alt: "Mixology lounge"
  },
  ambiance_03: {
    section_key: "ambiance_03",
    media_type: "image",
    media_url: "/src/assets/images/terrasse_dj_vibe_1779896194076.png",
    title: "Atmosphère: L'Heure Sauvage",
    alt: "Terrasse DJ set"
  },
  gallery_01: {
    section_key: "gallery_01",
    media_type: "image",
    media_url: "/src/assets/images/hero_grill_embers_1779896144555.png",
    title: "La Braise en Fusion",
    alt: "Secret de dorure"
  },
  gallery_02: {
    section_key: "gallery_02",
    media_type: "image",
    media_url: "/src/assets/images/grill_signature_plate_1779896160419.png",
    title: "Le Célèbre Plat de 5K",
    alt: "Plat généreux"
  },
  gallery_03: {
    section_key: "gallery_03",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
    title: "Mixologie à Gogo",
    alt: "Cocktail preparation"
  },
  gallery_04: {
    section_key: "gallery_04",
    media_type: "image",
    media_url: "/src/assets/images/terrasse_dj_vibe_1779896194076.png",
    title: "Saturday Live Beats",
    alt: "Terrasse DJ"
  },
  gallery_05: {
    section_key: "gallery_05",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
    title: "L'Ambiance Cosy",
    alt: "Tables d'ambiance"
  },
  gallery_06: {
    section_key: "gallery_06",
    media_type: "image",
    media_url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=800",
    title: "Le Souci du Détail",
    alt: "Grillades de précision"
  }
};

export const simulationDB = {
  isSimulated: !isProductionSupabaseSet,

  getSiteMedia: async (): Promise<SiteMedia[]> => {
    if (supabase) {
      const { data, error } = await supabase.from("site_media").select("*");
      if (!error && data && data.length > 0) {
        const dbMap = new Map<string, SiteMedia>(data.map(m => [m.section_key, m]));
        return Object.keys(defaultSiteMedia).map(key => {
          return dbMap.get(key) || { id: `m-${key}`, ...defaultSiteMedia[key] } as SiteMedia;
        });
      }
    }
    const stored = getLocalStorageItem<Record<string, SiteMedia>>("site_media", {});
    return Object.keys(defaultSiteMedia).map(key => {
      return stored[key] || { id: `m-${key}`, ...defaultSiteMedia[key] } as SiteMedia;
    });
  },

  saveSiteMedia: async (item: Partial<SiteMedia> & { section_key: string }): Promise<SiteMedia> => {
    const defaultData = defaultSiteMedia[item.section_key] || { media_type: "image", media_url: "" };
    const completeItem = {
      id: item.id || `m-${item.section_key}`,
      section_key: item.section_key,
      media_type: item.media_type || defaultData.media_type,
      media_url: item.media_url || defaultData.media_url,
      title: item.title || defaultData.title || "",
      alt: item.alt || defaultData.alt || "",
      created_at: item.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    } as SiteMedia;

    if (supabase) {
      const { data, error } = await supabase
        .from("site_media")
        .upsert(completeItem, { onConflict: "section_key" })
        .select()
        .single();
      if (!error && data) return data;
      console.warn("Supabase site_media upsert failed, using fallback simulation", error);
    }

    const stored = getLocalStorageItem<Record<string, SiteMedia>>("site_media", {});
    stored[item.section_key] = completeItem;
    setLocalStorageItem("site_media", stored);
    return completeItem;
  },

  getSettings: async () => {
    if (supabase) {
      const { data, error } = await supabase.from("site_settings").select("*").single();
      if (!error && data) return data;
    }
    return getLocalStorageItem("site_settings", defaultSettings);
  },

  updateSettings: async (settings: any) => {
    if (supabase) {
      const { data, error } = await supabase.from("site_settings").upsert({ id: 1, ...settings }).select();
      if (!error) return data;
    }
    setLocalStorageItem("site_settings", settings);
    return settings;
  },

  getGallery: async () => {
    if (supabase) {
      const { data, error } = await supabase.from("gallery_items").select("*").order("order_index", { ascending: true });
      if (!error && data) return data;
    }
    return getLocalStorageItem("gallery_items", defaultGallery);
  },

  saveGalleryItem: async (item: any) => {
    if (supabase) {
      const { data, error } = await supabase.from("gallery_items").upsert(item).select();
      if (!error) return data;
    }
    const current = getLocalStorageItem("gallery_items", defaultGallery);
    const existsIdx = current.findIndex(g => g.id === item.id);
    if (existsIdx > -1) {
      current[existsIdx] = item;
    } else {
      current.push(item);
    }
    setLocalStorageItem("gallery_items", current);
    return item;
  },

  deleteGalleryItem: async (id: string) => {
    if (supabase) {
      await supabase.from("gallery_items").delete().eq("id", id);
    }
    const current = getLocalStorageItem("gallery_items", defaultGallery);
    const filtered = current.filter(g => g.id !== id);
    setLocalStorageItem("gallery_items", filtered);
  },

  getHeroMedia: async () => {
    if (supabase) {
      const { data, error } = await supabase.from("hero_media").select("*").single();
      if (!error && data) return data;
    }
    return getLocalStorageItem("hero_media", defaultHeroMedia);
  },

  updateHeroMedia: async (hero: any) => {
    if (supabase) {
      const { data, error } = await supabase.from("hero_media").upsert({ id: "hero-1", ...hero }).select();
      if (!error) return data;
    }
    setLocalStorageItem("hero_media", hero);
    return hero;
  },

  getEventVideos: async () => {
    if (supabase) {
      const { data, error } = await supabase.from("event_videos").select("*").order("created_at", { ascending: false });
      if (!error && data) return data;
    }
    return getLocalStorageItem("event_videos", defaultEventVideos);
  },

  addEventVideo: async (video: any) => {
    if (supabase) {
      const { data, error } = await supabase.from("event_videos").insert(video).select();
      if (!error) return data;
    }
    const current = getLocalStorageItem("event_videos", defaultEventVideos);
    current.unshift(video);
    setLocalStorageItem("event_videos", current);
    return video;
  },

  deleteEventVideo: async (id: string) => {
    if (supabase) {
      await supabase.from("event_videos").delete().eq("id", id);
    }
    const current = getLocalStorageItem("event_videos", defaultEventVideos);
    const filtered = current.filter(v => v.id !== id);
    setLocalStorageItem("event_videos", filtered);
  },

  // Simulated Media Uploads for pure beautiful client testing
  uploadMedia: async (bucket: string, file: File, folder: string = ""): Promise<string> => {
    if (supabase) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = folder ? `${folder}/${fileName}` : `${fileName}`;

      const { data, error } = await supabase.storage.from(bucket).upload(filePath, file);
      if (error) throw error;

      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return publicUrlData.publicUrl;
    }

    // In Simulation mode, we convert the uploader's file to a simulated Blob ObjectURL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
};
