/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { simulationDB } from "../supabase";
import { SpecialtyItem, GalleryItem, EventSchedule, SPECIALTIES, GALLERY_ITEMS, EVENT_SCHEDULE, SiteMedia } from "../../types";

interface SiteSettings {
  hero_title: string;
  hero_subtitle: string;
  phone: string;
  address: string;
  opening_hours: string;
  tiktok_url: string;
  tiktok_handle: string;
  follower_count: string;
  likes_count: string;
}

interface HeroMedia {
  video_url: string;
  poster_url: string;
  mobile_video_url?: string;
}

interface DBEventVideo {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  created_at: string;
}

interface DBGalleryItem {
  id: string;
  type: "image" | "video";
  title: string;
  media_url: string;
  aspect: string;
  order_index: number;
}

interface SiteContextType {
  settings: SiteSettings;
  gallery: DBGalleryItem[];
  heroMedia: HeroMedia;
  eventVideos: DBEventVideo[];
  siteMedia: SiteMedia[];
  loading: boolean;
  refreshData: () => Promise<void>;
  getMedia: (key: string) => SiteMedia | undefined;
  saveSiteMedia: (item: Partial<SiteMedia> & { section_key: string }) => Promise<void>;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export function SiteProvider({ children }: { children: ReactNode }) {
  const [siteMedia, setSiteMedia] = useState<SiteMedia[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    hero_title: "Quand les lumières baissent...",
    hero_subtitle: "Le Rituel de la Braise Pure",
    phone: "+229 01 96 13 52 87",
    address: "Carrefour Tankpè, Abomey-Calavi, Bénin",
    opening_hours: "Ouvert tous les jours de 07h à 01h du matin",
    tiktok_url: "https://www.tiktok.com/@restaurant.nova.grill",
    tiktok_handle: "@restaurant.nova.grill",
    follower_count: "11.2K",
    likes_count: "131.7K"
  });

  const [gallery, setGallery] = useState<DBGalleryItem[]>([
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
    }
  ]);

  const [heroMedia, setHeroMedia] = useState<HeroMedia>({
    video_url: "", // if empty, falls back to direct images
    poster_url: "/src/assets/images/hero_grill_embers_1779896144555.png",
    mobile_video_url: ""
  });

  const [eventVideos, setEventVideos] = useState<DBEventVideo[]>([
    {
      id: "ev-1",
      title: "DJ Deck Control",
      video_url: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-dj-playing-music-on-a-dj-deck-42548-large.mp4",
      thumbnail_url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
      created_at: new Date().toISOString()
    }
  ]);

  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    try {
      const liveSettings = await simulationDB.getSettings();
      const liveGallery = await simulationDB.getGallery();
      const liveHero = await simulationDB.getHeroMedia();
      const liveEvents = await simulationDB.getEventVideos();
      const liveMedia = await simulationDB.getSiteMedia();

      if (liveSettings) setSettings(liveSettings);
      if (liveHero) setHeroMedia(liveHero);
      if (liveEvents && liveEvents.length > 0) setEventVideos(liveEvents);
      
      if (liveMedia && liveMedia.length > 0) {
        setSiteMedia(liveMedia);
        
        // Extract gallery-specific keys (gallery_01 to gallery_06) to dynamically populate the gallery component
        const galleryMedias = liveMedia.filter(m => m.section_key.startsWith("gallery_"));
        if (galleryMedias.length > 0) {
          const aspectClasses = [
            "aspect-[16/10]",
            "aspect-square",
            "aspect-[3/4]",
            "aspect-square",
            "aspect-[16/11]",
            "aspect-square"
          ];
          const mappedGallery = galleryMedias
            .filter(m => m.media_url) // Only show items that have media URL
            .map((m, idx) => ({
              id: m.id || `gal-${idx + 1}`,
              type: m.media_type,
              title: m.title || "Image de la Galerie",
              media_url: m.media_url,
              aspect: aspectClasses[idx % aspectClasses.length],
              order_index: idx
            }));
          setGallery(mappedGallery);
        } else if (liveGallery && liveGallery.length > 0) {
          setGallery(liveGallery);
        }
      } else if (liveGallery && liveGallery.length > 0) {
        setGallery(liveGallery);
      }
    } catch (e) {
      console.error("Failed to fetch custom dynamic site settings", e);
    } finally {
      setLoading(false);
    }
  };

  const getMedia = (key: string): SiteMedia | undefined => {
    return siteMedia.find(m => m.section_key === key);
  };

  const saveSiteMedia = async (item: Partial<SiteMedia> & { section_key: string }) => {
    try {
      const updated = await simulationDB.saveSiteMedia(item);
      setSiteMedia(prev => {
        const idx = prev.findIndex(m => m.section_key === item.section_key);
        if (idx > -1) {
          const copy = [...prev];
          copy[idx] = updated;
          return copy;
        }
        return [...prev, updated];
      });
    } catch (e) {
      console.error("Failed to save site media item", e);
      throw e;
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <SiteContext.Provider
      value={{
        settings,
        gallery,
        heroMedia,
        eventVideos,
        siteMedia,
        loading,
        refreshData,
        getMedia,
        saveSiteMedia
      }}
    >
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used inside a SiteProvider");
  }
  return context;
}
