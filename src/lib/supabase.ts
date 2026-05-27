/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from "@supabase/supabase-js";

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

export const simulationDB = {
  isSimulated: !isProductionSupabaseSet,

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
  uploadMedia: async (bucket: string, file: File): Promise<string> => {
    if (supabase) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

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
