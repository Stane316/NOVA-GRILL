/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { 
  LogOut, Settings, Image, Film, Plus, Trash2, Save, Upload, 
  ExternalLink, ChevronUp, ChevronDown, Check, Sparkles, Database, Info, 
  RefreshCw, MapPin, Phone, Clock, PlayCircle, Eye, Flame
} from "lucide-react";
import { useSite } from "../../lib/context/SiteContext";
import { simulationDB } from "../../lib/supabase";
import DynamicMedia from "../media/DynamicMedia";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { settings, gallery, heroMedia, eventVideos, siteMedia, refreshData, saveSiteMedia } = useSite();

  const [activeTab, setActiveTab] = useState<"general" | "hero" | "gallery" | "events" | "supabase" | "site-media">("site-media");
  const [successToast, setSuccessToast] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Form states initialized with context values
  const [generalFields, setGeneralFields] = useState({ ...settings });
  const [heroFields, setHeroFields] = useState({ ...heroMedia });

  // Gallery Creation State
  const [newGalleryItem, setNewGalleryItem] = useState({
    title: "",
    type: "image" as "image" | "video",
    media_url: "",
    aspect: "aspect-square"
  });
  const [galleryUploadProgress, setGalleryUploadProgress] = useState(false);

  // Event Video Creation State
  const [newEventVideo, setNewEventVideo] = useState({
    title: "",
    video_url: "",
    thumbnail_url: ""
  });
  const [eventUploadProgress, setEventUploadProgress] = useState(false);

  // File Input Refs
  const heroVideoFileRef = useRef<HTMLInputElement>(null);
  const heroPosterFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);
  const eventVideoFileRef = useRef<HTMLInputElement>(null);
  const eventThumbnailFileRef = useRef<HTMLInputElement>(null);

  const triggerToast = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => {
      setSuccessToast("");
    }, 3000);
  };

  // General Fields Submit Handler
  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await simulationDB.updateSettings(generalFields);
      await refreshData();
      triggerToast("Paramètres généraux sauvegardés avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  // Hero Fields Submit Handler
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await simulationDB.updateHeroMedia(heroFields);
      await refreshData();
      triggerToast("Médias du Hero mis à jour avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  // Hero File Upload Handlers (Streaming to simulation/storage)
  const handleHeroFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, field: "video_url" | "poster_url") => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsSaving(true);
    try {
      const publicUrl = await simulationDB.uploadMedia("hero-media", file);
      setHeroFields(prev => ({ ...prev, [field]: publicUrl }));
      triggerToast(`Fichier téléversé avec succès pour : ${field}`);
    } catch (err: any) {
      alert("Échec du téléversement du fichier.");
    } finally {
      setIsSaving(false);
    }
  };

  // Gallery Creation Handlers
  const handleCreateGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalleryItem.media_url) {
      alert("Veuillez téléverser un média ou saisir un URL direct.");
      return;
    }

    try {
      const itemToSave = {
        id: `g-${Date.now()}`,
        type: newGalleryItem.type,
        title: newGalleryItem.title || "Titre Sans Nom",
        media_url: newGalleryItem.media_url,
        aspect: newGalleryItem.aspect,
        order_index: gallery.length
      };

      await simulationDB.saveGalleryItem(itemToSave);
      await refreshData();
      setNewGalleryItem({
        title: "",
        type: "image",
        media_url: "",
        aspect: "aspect-square"
      });
      triggerToast("Nouvel item galerie ajouté !");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGalleryFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setGalleryUploadProgress(true);
    try {
      const isVideoFile = file.type.startsWith("video/");
      const detectedType = isVideoFile ? "video" : "image";
      const publicUrl = await simulationDB.uploadMedia("gallery", file);

      setNewGalleryItem(prev => ({
        ...prev,
        type: detectedType as "image" | "video",
        media_url: publicUrl,
        aspect: isVideoFile ? "aspect-video" : "aspect-square"
      }));
      triggerToast("Fichier média de la galerie téléversé !");
    } catch (err) {
      alert("Échec du téléversement.");
    } finally {
      setGalleryUploadProgress(false);
    }
  };

  const handleDeleteGalleryItem = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce média de la galerie ?")) return;
    try {
      await simulationDB.deleteGalleryItem(id);
      await refreshData();
      triggerToast("Média de la galerie supprimé.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleMoveGalleryIdx = async (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= gallery.length) return;

    const copy = [...gallery];
    const temp = copy[index].order_index;
    copy[index].order_index = copy[targetIdx].order_index;
    copy[targetIdx].order_index = temp;

    // Save both
    await simulationDB.saveGalleryItem(copy[index]);
    await simulationDB.saveGalleryItem(copy[targetIdx]);
    await refreshData();
    triggerToast("Ordre de la galerie réorganisé !");
  };

  // Event Video Handlers
  const handleCreateEventVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventVideo.video_url) {
      alert("Veuillez téléverser une vidéo ou insérer un lien vidéo direct.");
      return;
    }

    try {
      const videoToSave = {
        id: `ev-${Date.now()}`,
        title: newEventVideo.title || "Ambiance Cabaret DJ",
        video_url: newEventVideo.video_url,
        thumbnail_url: newEventVideo.thumbnail_url || "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600",
        created_at: new Date().toISOString()
      };

      await simulationDB.addEventVideo(videoToSave);
      await refreshData();
      setNewEventVideo({
        title: "",
        video_url: "",
        thumbnail_url: ""
      });
      triggerToast("Nouveau clip d'événement en direct enregistré !");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEventVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>, field: "video_url" | "thumbnail_url") => {
    const file = event.target.files?.[0];
    if (!file) return;

    setEventUploadProgress(true);
    try {
      const publicUrl = await simulationDB.uploadMedia("events", file);
      setNewEventVideo(prev => ({ ...prev, [field]: publicUrl }));
      triggerToast(`Média d'événement téléversé : ${field}`);
    } catch (err) {
      alert("Échec du téléversement du média.");
    } finally {
      setEventUploadProgress(false);
    }
  };

  const handleDeleteEventVideo = async (id: string) => {
    if (!confirm("Voulez-vous retirer cette vidéo d'événement de la liste ?")) return;
    try {
      await simulationDB.deleteEventVideo(id);
      await refreshData();
      triggerToast("Vidéo d'ambiance événement supprimée.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0908] text-luxury-cream flex flex-col font-sans select-none relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(235,94,40,0.02)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />

      {/* Dynamic Toast Display */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-neutral-900 border border-green-500/35 text-white py-3 px-6 rounded-2xl flex items-center gap-3 shadow-2xl shadow-green-950/20 animate-bounce">
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-xs font-mono font-medium">{successToast}</span>
        </div>
      )}

      {/* Header bar */}
      <header className="border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center bg-black/40 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="p-1.5 rounded bg-embers-glow/10 border border-embers-glow/30 text-embers-glow">
            <Flame className="w-5 h-5 animate-pulse" />
          </span>
          <div>
            <h1 className="font-serif text-lg text-white font-light flex items-center gap-1.5">
              Nova Grill <span className="font-sans text-[10px] bg-white/10 px-2 py-0.5 rounded text-embers-glow font-bold tracking-widest">ADMIN</span>
            </h1>
            <p className="font-mono text-[9px] text-[#8c827c] uppercase tracking-widest">
              LIFESTYLE CHOC & REALTIME CONTROLS
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-mono border-r border-white/10 pr-4 text-zinc-500 md:inline hidden">
            COORDINATES ACTIVE
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 p-2.5 rounded-full border border-white/5 hover:border-red-900 bg-white/5 text-stone-400 hover:text-white transition-all text-xs font-mono"
            title="Se déconnecter"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span className="sm:inline hidden tracking-[0.1em]">LOGOUT CONTROL</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 gap-6 relative z-15">
        
        {/* Navigation Sidebar Drawer */}
        <aside className="w-full md:w-64 shrink-0 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-3 md:pb-0 border-b md:border-b-0 border-white/5">
          {[
            { id: "site-media", label: "CMS Médias Globaux", icon: Image },
            { id: "general", label: "Informations", icon: Settings },
            { id: "hero", label: "Hero Cinématique", icon: PlayCircle },
            { id: "gallery", label: "Galerie Photos/Vidéos", icon: Image },
            { id: "events", label: "DJ & Ambiance Live", icon: Film },
            { id: "supabase", label: "Paramétrage Supabase", icon: Database }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left text-xs font-mono tracking-wider uppercase transition-all duration-300 w-auto md:w-full shrink-0 whitespace-nowrap ${
                  active 
                    ? "bg-[#161210] border border-white/15 text-embers-glow font-bold shadow-xl" 
                    : "hover:bg-white/5 text-stone-400 hover:text-stone-300 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 select-none ${active ? "text-embers-glow" : "text-stone-400"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Workspace panel content */}
        <main className="flex-1 min-w-0 bg-[#161210]/60 border border-white/5 rounded-3xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl">

          {/* TAB: SITE MEDIA CMS SYSTEM (SUPABASE) */}
          {activeTab === "site-media" && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-white flex items-center gap-2">
                  <Image className="w-5 h-5 text-embers-glow" /> CMS Médias Globaux (Base de Données)
                </h3>
                <p className="text-stone-400 text-xs mt-1 font-light">
                  Administrez l'ensemble des médias du site un par un. Les modifications sont enregistrées en temps réel dans votre table de base de données <code className="bg-black/40 text-rose-400 px-1 py-0.5 rounded font-mono">site_media</code> sur Supabase.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {[
                  {
                    key: "logo_main",
                    label: "Logo du Restaurant (Navbar)",
                    folder: "logo",
                    type: "image",
                    description: "Logo principal de Nova Grill. Laisse vide pour utiliser l'icône de Flamme par défaut."
                  },
                  {
                    key: "hero_main",
                    label: "Page d'Accueil: Image de Couverture Fallback",
                    folder: "hero",
                    type: "image",
                    description: "Image d'arrière-plan de secours, également utilisée comme poster durant le chargement de la vidéo."
                  },
                  {
                    key: "hero_video",
                    label: "Page d'Accueil: Vidéo Cinématique en Arrière-plan",
                    folder: "hero",
                    type: "video",
                    description: "Film d'ambiance de fond lu en boucle silencieuse pour immerger immédiatement les convives."
                  },
                  {
                    key: "teaser_media",
                    label: "Teaser de Ambiance",
                    folder: "teaser",
                    type: "video",
                    description: "Vidéo ou illustration teaser du gril et de la cuisson sur la braise."
                  },
                  {
                    key: "creations_01",
                    label: "Nos Créations: Spécialité 1 (La Braise)",
                    folder: "creations",
                    type: "image",
                    description: "Couverture de votre première spécialité iconique dans la section Nos Créations."
                  },
                  {
                    key: "creations_02",
                    label: "Nos Créations: Spécialité 2 (Le Plat de 5K)",
                    folder: "creations",
                    type: "image",
                    description: "Couverture du célèbre plat de 5.000 FCFA mis en avant sur TikTok."
                  },
                  {
                    key: "creations_03",
                    label: "Nos Créations: Spécialité 3 (Cocktails)",
                    folder: "creations",
                    type: "image",
                    description: "Couverture de la section cocktail et mixologie tropicale rafraîchissante."
                  },
                  {
                    key: "creations_04",
                    label: "Nos Créations: Spécialité 4 (L'Expérience)",
                    folder: "creations",
                    type: "image",
                    description: "Image illustrant le cadre de fête, afterworks ou événements d'Abomey-Calavi."
                  },
                  {
                    key: "ambiance_01",
                    label: "Atmosphère: L'Alchimie du Feu (Braise)",
                    folder: "ambiance",
                    type: "image",
                    description: "Arrière-plan haute résolution de l'onglet Braise (Arrière-plan d'atmosphère)."
                  },
                  {
                    key: "ambiance_02",
                    label: "Atmosphère: Tempête de Glace (Cocktails d'Or)",
                    folder: "ambiance",
                    type: "image",
                    description: "Arrière-plan haute résolution de l'onglet Cocktails (Arrière-plan d'atmosphère)."
                  },
                  {
                    key: "ambiance_03",
                    label: "Atmosphère: L'Heure Sauvage (DJ Sets)",
                    folder: "ambiance",
                    type: "image",
                    description: "Arrière-plan haute résolution de l'onglet Live Saturdays (Arrière-plan d'atmo)."
                  },
                  {
                    key: "gallery_01",
                    label: "Galerie: Image 1",
                    folder: "gallery",
                    type: "image",
                    description: "Image n°1 affichée dans la mosaïque dynamique de la galerie."
                  },
                  {
                    key: "gallery_02",
                    label: "Galerie: Image 2",
                    folder: "gallery",
                    type: "image",
                    description: "Image n°2 affichée dans la mosaïque dynamique de la galerie."
                  },
                  {
                    key: "gallery_03",
                    label: "Galerie: Image 3",
                    folder: "gallery",
                    type: "image",
                    description: "Image n°3 affichée dans la mosaïque dynamique de la galerie."
                  },
                  {
                    key: "gallery_04",
                    label: "Galerie: Image 4",
                    folder: "gallery",
                    type: "image",
                    description: "Image n°4 affichée dans la mosaïque dynamique de la galerie."
                  },
                  {
                    key: "gallery_05",
                    label: "Galerie: Image 5",
                    folder: "gallery",
                    type: "image",
                    description: "Image n°5 affichée dans la mosaïque dynamique de la galerie."
                  },
                  {
                    key: "gallery_06",
                    label: "Galerie: Image 6",
                    folder: "gallery",
                    type: "image",
                    description: "Image n°6 affichée dans la mosaïque dynamique de la galerie."
                  }
                ].map((sec) => {
                  const itemMedia = siteMedia.find(m => m.section_key === sec.key);
                  const currentUrl = itemMedia?.media_url || "";
                  const currentTitle = itemMedia?.title || "";
                  const currentAlt = itemMedia?.alt || "";

                  return (
                    <div key={sec.key} className="bg-black/35 border border-white/5 rounded-3xl p-5 sm:p-6 flex flex-col xl:flex-row gap-6 items-stretch">
                      {/* Visual Preview on the left */}
                      <div className="w-full xl:w-48 aspect-video xl:aspect-square rounded-2xl overflow-hidden bg-[#0a0a09] relative shrink-0 border border-white/5 flex items-center justify-center">
                        {currentUrl ? (
                          <DynamicMedia url={currentUrl} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-center font-mono text-[9px] text-[#423d3a] flex flex-col items-center gap-1">
                            <Flame className="w-5 h-5 opacity-40" />
                            <span>Aucun média</span>
                          </div>
                        )}
                      </div>

                      {/* Editing Panel */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <h4 className="font-display font-bold text-xs text-white uppercase tracking-wider">{sec.label}</h4>
                            <span className="font-mono text-[8px] bg-amber-500/10 text-embers-gold border border-amber-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                              KEY: {sec.key}
                            </span>
                          </div>
                          <p className="text-[#8e8580] text-xs font-light mb-4 leading-relaxed">{sec.description}</p>
                        </div>

                        {/* Dynamic Action Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                            <span className="font-mono text-[8px] uppercase text-zinc-500 tracking-wider">URL du fichier stocké</span>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                id={`url-${sec.key}`}
                                className="flex-1 bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-stone-200 select-text font-mono"
                                defaultValue={currentUrl}
                                placeholder="Ex: https://..."
                              />
                              <button
                                type="button"
                                onClick={async () => {
                                  const inputVal = (document.getElementById(`url-${sec.key}`) as HTMLInputElement)?.value;
                                  if (!inputVal) return;
                                  setIsSaving(true);
                                  try {
                                    await saveSiteMedia({
                                      section_key: sec.key,
                                      media_url: inputVal,
                                      media_type: sec.type as any,
                                      title: currentTitle,
                                      alt: currentAlt
                                    });
                                    triggerToast(`Lien mis à jour pour : ${sec.label}`);
                                  } catch (err) {
                                    alert("Une erreur technique s'est produite.");
                                  } finally {
                                    setIsSaving(false);
                                  }
                                }}
                                className="bg-embers-glow hover:bg-amber-500 border border-transparent p-2 px-3 rounded-xl text-white flex items-center"
                                title="Sauvegarder l'adresse"
                              >
                                <Save className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          {/* Upload File button & metadata setter */}
                          <div className="flex flex-col gap-2">
                            <span className="font-mono text-[8px] uppercase text-zinc-500 tracking-wider">Téléchargement Fichier</span>
                            <input
                              type="file"
                              accept={sec.type === "video" ? "video/*" : "image/*"}
                              id={`file-upload-${sec.key}`}
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setIsSaving(true);
                                try {
                                  const publicUrl = await simulationDB.uploadMedia("site-media", file, sec.folder);
                                  await saveSiteMedia({
                                    section_key: sec.key,
                                    media_url: publicUrl,
                                    media_type: sec.type as any,
                                    title: currentTitle || sec.label,
                                    alt: currentAlt || sec.label
                                  });
                                  triggerToast(`Fichier téléversé et enregistré pour : ${sec.label}`);
                                } catch (err: any) {
                                  console.error(err);
                                  alert("Échec du téléversement vers Supabase Storage.");
                                } finally {
                                  setIsSaving(false);
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById(`file-upload-${sec.key}`)?.click()}
                              className="w-full bg-stone-900 border border-white/5 hover:border-embers-glow py-2.5 px-4 rounded-xl text-[10px] text-stone-300 hover:text-white transition-all font-mono uppercase tracking-widest flex items-center justify-center gap-2"
                            >
                              <Upload className="w-3.5 h-3.5 text-embers-gold" />
                              <span>Télécharger {sec.type === "video" ? "Vidéo" : "Image"}</span>
                            </button>
                          </div>

                          <div className="flex flex-col gap-2">
                            <span className="font-mono text-[8px] uppercase text-zinc-500 tracking-wider">Méta-Données Optionnelles</span>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                id={`title-${sec.key}`}
                                placeholder="Alt-Text / Titre Alté"
                                className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-stone-200"
                                defaultValue={currentAlt}
                              />
                              <button
                                type="button"
                                onClick={async () => {
                                  const altDesc = (document.getElementById(`title-${sec.key}`) as HTMLInputElement)?.value;
                                  setIsSaving(true);
                                  try {
                                    await saveSiteMedia({
                                      section_key: sec.key,
                                      media_url: currentUrl,
                                      media_type: sec.type as any,
                                      title: altDesc,
                                      alt: altDesc
                                    });
                                    triggerToast(`Méta-Description enregistrée pour : ${sec.label}`);
                                  } catch (err) {
                                    alert("Erreur lors de la sauvegarde.");
                                  } finally {
                                    setIsSaving(false);
                                  }
                                }}
                                className="bg-[#2c221c] hover:bg-neutral-800 text-stone-300 hover:text-white border border-white/5 px-3.5 rounded-xl text-xs flex items-center justify-center"
                              >
                                Enregistrer
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 1: GENERAL INFORMATIONS */}
          {activeTab === "general" && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-white flex items-center gap-2">
                  <Settings className="w-5 h-5 text-embers-glow" /> Informations Générales & Horaires
                </h3>
                <p className="text-stone-400 text-xs mt-1 font-light">
                  Changer les détails de contact, heures d'ouverture de Calavi et statistiques de réseaux sociaux.
                </p>
              </div>

              <form onSubmit={handleSaveGeneral} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold">Titre principal d'accroche Hero</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-embers-glow/40 transition-colors"
                      value={generalFields.hero_title}
                      onChange={(e) => setGeneralFields(prev => ({ ...prev, hero_title: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold">Sous-titre d'accroche Hero</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-embers-glow/40 transition-colors"
                      value={generalFields.hero_subtitle}
                      onChange={(e) => setGeneralFields(prev => ({ ...prev, hero_subtitle: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold"><Phone className="w-3.5 h-3.5 inline mr-1" /> Numéro de téléphone</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      value={generalFields.phone}
                      onChange={(e) => setGeneralFields(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold"><Clock className="w-3.5 h-3.5 inline mr-1" /> Heures d'ouverture</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      value={generalFields.opening_hours}
                      onChange={(e) => setGeneralFields(prev => ({ ...prev, opening_hours: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold"><MapPin className="w-3.5 h-3.5 inline mr-1" /> Adresse physique</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      value={generalFields.address}
                      onChange={(e) => setGeneralFields(prev => ({ ...prev, address: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold">Lien de la page TikTok</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      value={generalFields.tiktok_url}
                      onChange={(e) => setGeneralFields(prev => ({ ...prev, tiktok_url: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold">Identifiant TikTok (@...)</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      value={generalFields.tiktok_handle}
                      onChange={(e) => setGeneralFields(prev => ({ ...prev, tiktok_handle: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold">Abonnés TikTok</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      value={generalFields.follower_count}
                      onChange={(e) => setGeneralFields(prev => ({ ...prev, follower_count: e.target.value }))}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold">J'aime TikTok</label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                      value={generalFields.likes_count}
                      onChange={(e) => setGeneralFields(prev => ({ ...prev, likes_count: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-white hover:bg-embers-glow text-embers-dark hover:text-white px-6 py-3.5 rounded-xl font-display text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
                  >
                    {isSaving ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>SAUVEGARDER L'ADN GENERAL</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: HERO IMMERSIVE MEDIA */}
          {activeTab === "hero" && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-white flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-embers-glow" /> Médias Hero Cinématiques
                </h3>
                <p className="text-stone-400 text-xs mt-1 font-light">
                  Gestion des films de fond et jaquette d'illustrations visibles dès l'arrivée sur l'écran d'accueil du site.
                </p>
              </div>

              <form onSubmit={handleSaveHero} className="flex flex-col gap-6">
                
                {/* Hero Video section */}
                <div className="bg-black/20 border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
                  <h4 className="font-mono text-[10px] tracking-widest uppercase font-bold text-white mb-2">Film de Fond principal (.mp4 / .webm)</h4>
                  
                  <div className="flex flex-col md:flex-row gap-5 items-stretch">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-xs text-stone-400">Insérez l'URL directe du fichier vidéo</label>
                      <input
                        type="text"
                        className="w-full bg-[#0B0908] border border-white/5 rounded-xl px-4 py-3 text-xs text-stone-300 focus:outline-[#2d221c]"
                        value={heroFields.video_url}
                        onChange={(e) => setHeroFields(prev => ({ ...prev, video_url: e.target.value }))}
                        placeholder="Ex: https://example.com/braise_fire.mp4"
                      />
                      
                      <div className="relative mt-2">
                        <input
                          type="file"
                          accept="video/mp4,video/webm"
                          onChange={(e) => handleHeroFileUpload(e, "video_url")}
                          className="hidden"
                          ref={heroVideoFileRef}
                        />
                        <button
                          type="button"
                          onClick={() => heroVideoFileRef.current?.click()}
                          className="w-full bg-stone-900 border border-white/5 hover:border-embers-glow py-3 px-4 rounded-xl text-xs flex justify-center items-center gap-2 text-stone-300 hover:text-white transition-all font-mono"
                        >
                          <Upload className="w-4 h-4 text-embers-glow" />
                          <span>CHARGER UN FILM LOCAL</span>
                        </button>
                      </div>
                    </div>

                    <div className="w-full md:w-48 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden border border-white/5 relative bg-black flex items-center justify-center shrink-0">
                      {heroFields.video_url ? (
                        <video src={heroFields.video_url} autoPlay muted loop playsInline className="w-full h-full object-cover brightness-75" />
                      ) : (
                        <span className="text-[10px] font-mono text-zinc-600">Aucun film</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Cover Image fallback */}
                <div className="bg-black/20 border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
                  <h4 className="font-mono text-[10px] tracking-widest uppercase font-bold text-white mb-2">Poster / Miniature d'images fallback</h4>
                  
                  <div className="flex flex-col md:flex-row gap-5 items-stretch">
                    <div className="flex-1 flex flex-col gap-2">
                      <label className="text-xs text-stone-400">Insérez l'URL de votre photo ou téléversez-la en bas</label>
                      <input
                        type="text"
                        className="w-full bg-[#0B0908] border border-white/5 rounded-xl px-4 py-3 text-xs text-stone-300 focus:outline-[#2d221c]"
                        value={heroFields.poster_url}
                        onChange={(e) => setHeroFields(prev => ({ ...prev, poster_url: e.target.value }))}
                        placeholder="Ex: https://example.com/embers_photo.png"
                      />

                      <div className="relative mt-2">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleHeroFileUpload(e, "poster_url")}
                          className="hidden"
                          ref={heroPosterFileRef}
                        />
                        <button
                          type="button"
                          onClick={() => heroPosterFileRef.current?.click()}
                          className="w-full bg-stone-900 border border-white/5 hover:border-embers-glow py-3 px-4 rounded-xl text-xs flex justify-center items-center gap-2 text-stone-300 hover:text-white transition-all font-mono"
                        >
                          <Upload className="w-4 h-4 text-embers-glow" />
                          <span>CHARGER UNE COUVERTURE LOCALE</span>
                        </button>
                      </div>
                    </div>

                    <div className="w-full md:w-48 aspect-video md:aspect-[4/3] rounded-xl overflow-hidden border border-white/5 relative bg-black shrink-0">
                      {heroFields.poster_url ? (
                        <img src={heroFields.poster_url} alt="Fallback Poster" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[10px] font-mono text-zinc-600">Aucune image</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="bg-white hover:bg-embers-glow text-embers-dark hover:text-white px-6 py-3.5 rounded-xl font-display text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center gap-2"
                  >
                    {isSaving ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>METTRE À JOUR LES MÉDIAS HERO</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: IMMERSIVE GALLERY ITEMS */}
          {activeTab === "gallery" && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-white flex items-center gap-2">
                  <Image className="w-5 h-5 text-embers-glow" /> Galerie Photos & Vidéos Immersive
                </h3>
                <p className="text-stone-400 text-xs mt-1 font-light">
                  Ajouter, supprimer et réordonner des photographies culinaires ou des films courts. Les formats sont détectés à la volée.
                </p>
              </div>

              {/* Creator form for new items */}
              <form onSubmit={handleCreateGalleryItem} className="bg-black/20 border border-white/5 p-5 rounded-2xl flex flex-col gap-4">
                <h4 className="font-mono text-[10px] tracking-widest uppercase font-bold text-white mb-1 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-embers-glow" /> Enregistrer un Nouvel Item de Galerie
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-stone-400">Titre descriptif</label>
                    <input
                      type="text"
                      className="w-full bg-[#0B0908] border border-white/5 rounded-xl px-4 py-3 text-xs text-white"
                      value={newGalleryItem.title}
                      onChange={(e) => setNewGalleryItem(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Notre Cocktail Mojito d'Or"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-stone-400">Rapport de cadre visual (Aspect Ratio)</label>
                    <select
                      className="w-full bg-[#0B0908] border border-white/5 rounded-xl px-4 py-3 text-xs text-white uppercase font-mono"
                      value={newGalleryItem.aspect}
                      onChange={(e) => setNewGalleryItem(prev => ({ ...prev, aspect: e.target.value }))}
                    >
                      <option value="aspect-square">Carré (1:1)</option>
                      <option value="aspect-[16/10]">Paysage Cine (16:10)</option>
                      <option value="aspect-[3/4]">Portrait (3:4)</option>
                      <option value="aspect-[4/3]">Standard (4:3)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                    <label className="text-xs text-stone-400">Adresse de média ou téléversement</label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        className="flex-1 bg-[#0B0908] border border-white/5 rounded-xl px-4 py-3 text-xs text-white"
                        value={newGalleryItem.media_url}
                        onChange={(e) => setNewGalleryItem(prev => ({ ...prev, media_url: e.target.value }))}
                        placeholder="Insérez un lien de fichier ou chargez-le à côté"
                      />
                      
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleGalleryFileUpload}
                        className="hidden"
                        ref={galleryFileRef}
                      />
                      <button
                        type="button"
                        onClick={() => galleryFileRef.current?.click()}
                        disabled={galleryUploadProgress}
                        className="bg-stone-850 hover:bg-stone-800 text-stone-300 font-mono text-xs px-4 rounded-xl border border-white/5 shrink-0 flex items-center gap-2"
                      >
                        {galleryUploadProgress ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 text-embers-glow" />}
                        <span>COUPER</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="bg-white hover:bg-embers-glow text-embers-dark hover:text-white px-5 py-3 rounded-lg font-display text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    AJOUTER L'ITEM DE LA RÉTINE
                  </button>
                </div>
              </form>

              {/* Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery.map((item, idx) => (
                  <div key={item.id} className="bg-black/30 border border-white/5 rounded-2xl overflow-hidden flex flex-col relative group">
                    <div className="relative aspect-video w-full overflow-hidden bg-black/60">
                      <DynamicMedia url={item.media_url} className="w-full h-full object-cover" />
                      <div className="absolute top-2 left-2 bg-black/75 text-[8px] font-mono font-bold uppercase py-1 px-2.5 rounded border border-white/10 flex items-center gap-1 text-embers-glow">
                        {item.type === "video" ? <Film className="w-2.5 h-2.5" /> : <Image className="w-2.5 h-2.5" />}
                        <span>{item.type}</span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                      <h5 className="text-white text-xs font-mono font-medium truncate">{item.title}</h5>
                      <span className="text-[9px] font-mono text-stone-500 uppercase">{item.aspect}</span>
                    </div>

                    <div className="bg-[#1a1512] py-2 px-3 border-t border-white/5 flex justify-between items-center mt-auto">
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleMoveGalleryIdx(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 px-1.5 rounded bg-black/40 border border-white/5 hover:border-embers-glow/40 text-stone-400 hover:text-white disabled:opacity-30"
                          title="Déplacer vers la gauche"
                        >
                          <ChevronUp className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleMoveGalleryIdx(idx, "down")}
                          disabled={idx === gallery.length - 1}
                          className="p-1 px-1.5 rounded bg-black/40 border border-white/5 hover:border-embers-glow/40 text-stone-400 hover:text-white disabled:opacity-30"
                          title="Déplacer vers la droite"
                        >
                          <ChevronDown className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="p-1.5 rounded bg-rose-950/20 hover:bg-rose-900/30 text-rose-500 hover:text-rose-100 transition-colors border border-rose-900/10"
                        title="Retirer de la galerie"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DJ / EVENTS LIVE VIDEO SPOT */}
          {activeTab === "events" && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-white flex items-center gap-2">
                  <Film className="w-5 h-5 text-rose-500" /> Vidéos DJ & Ambiance en Direct
                </h3>
                <p className="text-stone-400 text-xs mt-1 font-light">
                  Mettre en valeur vos sessions DJ live, cocktail shows et l'ambiance nocturne. Ces clips sont streamés directement sur le site.
                </p>
              </div>

              {/* Creator form */}
              <form onSubmit={handleCreateEventVideo} className="bg-black/20 border border-white/5 p-5 rounded-2xl flex flex-col gap-4">
                <h4 className="font-mono text-[10px] tracking-widest uppercase font-bold text-white mb-1 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-rose-500" /> Publier une nouvelle vidéo d'ambiance
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                    <label className="text-xs text-stone-400">Titre de la vidéo d'ambiance</label>
                    <input
                      type="text"
                      className="w-full bg-[#0B0908] border border-white/5 rounded-xl px-4 py-3 text-xs text-white"
                      value={newEventVideo.title}
                      onChange={(e) => setNewEventVideo(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Session Amapiano Live du Samedi Noir"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-stone-400">URL du fichier vidéo (.mp4) ou charger</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 bg-[#0B0908] border border-white/5 rounded-xl px-4 py-3 text-xs text-white"
                        value={newEventVideo.video_url}
                        onChange={(e) => setNewEventVideo(prev => ({ ...prev, video_url: e.target.value }))}
                        placeholder="Insérez un lien de fichier vidéo"
                      />
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={(e) => handleEventVideoUpload(e, "video_url")}
                        className="hidden"
                        ref={eventVideoFileRef}
                      />
                      <button
                        type="button"
                        onClick={() => eventVideoFileRef.current?.click()}
                        className="bg-stone-850 hover:bg-stone-800 text-stone-400 p-2.5 rounded-xl border border-white/5 shrink-0"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-stone-400">Image poster miniature (Optionnel)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="flex-1 bg-[#0B0908] border border-white/5 rounded-xl px-4 py-3 text-xs text-white"
                        value={newEventVideo.thumbnail_url}
                        onChange={(e) => setNewEventVideo(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                        placeholder="Ex: https://example.com/cover.jpg"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleEventVideoUpload(e, "thumbnail_url")}
                        className="hidden"
                        ref={eventThumbnailFileRef}
                      />
                      <button
                        type="button"
                        onClick={() => eventThumbnailFileRef.current?.click()}
                        className="bg-stone-850 hover:bg-stone-800 text-stone-400 p-2.5 rounded-xl border border-white/5 shrink-0"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="bg-white hover:bg-rose-600 text-black hover:text-white px-5 py-3 rounded-lg font-display text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    METTRE EN LIGNE LE CLIP D'AMBIANCE
                  </button>
                </div>
              </form>

              {/* Event Videos feed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eventVideos.map((video) => (
                  <div key={video.id} className="bg-black/30 border border-white/5 rounded-2xl overflow-hidden p-4 flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-xl bg-black relative shrink-0 overflow-hidden border border-white/5">
                      <video src={video.video_url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-mono font-bold text-white truncate">{video.title}</h4>
                      <p className="text-[10px] text-stone-500 font-mono mt-1 font-light truncate select-text">{video.video_url}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteEventVideo(video.id)}
                      className="p-2 rounded bg-rose-950/20 hover:bg-rose-900/30 text-rose-500 border border-rose-900/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SUPABASE BLUEPRINT CONFIGURATOR */}
          {activeTab === "supabase" && (
            <div className="flex flex-col gap-6 animate-fadeIn text-stone-300">
              <div className="border-b border-white/5 pb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-light text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-embers-glow" /> Paramétrage Technique & RLS SQL
                </h3>
                <p className="text-stone-400 text-xs mt-1 font-light">
                  Directives et script d'initialisaton SQL complet pour configurer votre projet Supabase en 2 minutes.
                </p>
              </div>

              {/* Instructions list */}
              <div className="bg-black/30 border border-white/5 rounded-2xl p-5 flex flex-col gap-4 text-xs font-light leading-relaxed">
                <p className="font-serif text-lg italic text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-embers-glow shrink-0" />
                  Comment raccorder votre véritable base Supabase :
                </p>

                <ol className="list-decimal pl-5 flex flex-col gap-2.5">
                  <li>
                    Créez un projet gratuit sur <strong>https://supabase.com</strong>.
                  </li>
                  <li>
                    Rendez-vous dans la section <strong>SQL Editor</strong> de Supabase et collez-y le script SQL complet ci-dessous. Cliquez sur <strong>Run</strong>.
                  </li>
                  <li>
                    Créez les buckets de stockage (Storage) configurés pour être publics : <code className="bg-black py-0.5 px-2.5 rounded text-white font-mono border border-white/5 font-bold">hero-media</code>, <code className="bg-black py-0.5 px-2.5 rounded text-white font-mono border border-white/5 font-bold">gallery</code>, et <code className="bg-black py-0.5 px-2.5 rounded text-white font-mono border border-white/5 font-bold">events</code>.
                  </li>
                  <li>
                    Rendez-vous dans l'onglet <strong>Project Settings → API</strong> pour y récupérer votre <code className="text-white font-mono">SUPABASE_URL</code> et votre clé <code className="text-white font-mono font-bold text-embers-glow">anon/public key</code>.
                  </li>
                  <li>
                    Déclarez les variables d'environnement suivantes dans votre fichier <code className="text-white font-mono">.env</code> de production (via les paramètres de votre service ou plateforme) :
                    <pre className="font-mono text-[11px] bg-[#0B0908] border border-white/5 rounded p-3 select-text select-all mt-1 flex flex-col font-bold">
                      <span>VITE_SUPABASE_URL=votre_supabase_url</span>
                      <span>VITE_SUPABASE_ANON_KEY=votre_anon_key</span>
                    </pre>
                  </li>
                  <li>
                    Gérez vos comptes administrateurs depuis l'onglet <strong>Authentication → Users</strong> de Supabase en enregistrant vos emails de contrôle de confiance !
                  </li>
                </ol>
              </div>

              {/* SQL Panel */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] uppercase tracking-widest text-[#a89689] font-bold">SCRIPT INITIALISATION SQL (tables + security rules RLS)</label>
                <div className="bg-[#0B0908] border border-white/5 rounded-2xl p-5 relative overflow-hidden select-text">
                  <pre className="font-mono text-[10px] text-stone-400 overflow-x-auto select-all leading-normal">
{`-- SQL DE PROVISIONNEMENT POUR NOVA GRILL

-- 1. Create table site_settings
create table if nulls not exists public.site_settings (
  id integer primary key default 1,
  hero_title text not null default 'Quand les lumières baissent...',
  hero_subtitle text not null default 'Le Rituel de la Braise Pure',
  phone text not null default '+229 01 96 13 52 87',
  address text not null default 'Carrefour Tankpè, Abomey-Calavi, Bénin',
  opening_hours text not null default 'Ouvert tous les jours de 07h à 01h du matin',
  tiktok_url text not null default 'https://www.tiktok.com/@restaurant.nova.grill',
  tiktok_handle text not null default '@restaurant.nova.grill',
  follower_count text not null default '11.2K',
  likes_count text not null default '131.7K',
  constraint check_single_row check (id = 1)
);

-- 2. Create table gallery_items
create table if nulls not exists public.gallery_items (
  id text primary key,
  type text not null default 'image',
  title text not null,
  media_url text not null,
  aspect text not null default 'aspect-square',
  order_index integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Create table hero_media
create table if nulls not exists public.hero_media (
  id text primary key default 'hero-1',
  video_url text not null,
  poster_url text not null,
  mobile_video_url text,
  constraint check_single_hero check (id = 'hero-1')
);

-- 4. Create table event_videos
create table if nulls not exists public.event_videos (
  id text primary key,
  title text not null,
  video_url text not null,
  thumbnail_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Enable Row Level Security (RLS) on all tables for maximum security
alter table public.site_settings enable row level security;
alter table public.gallery_items enable row level security;
alter table public.hero_media enable row level security;
alter table public.event_videos enable row level security;

-- 6. Grant SELECT permissions to public anonymous visitors
create policy "Allow public reading of site_settings" on public.site_settings for select using (true);
create policy "Allow public reading of gallery_items" on public.gallery_items for select using (true);
create policy "Allow public reading of hero_media" on public.hero_media for select using (true);
create policy "Allow public reading of event_videos" on public.event_videos for select using (true);

-- 7. Grant Write/Delete/Update access ONLY to authenticated users (admin team)
create policy "Allow auth adjustments on site_settings" on public.site_settings for all using (auth.role() = 'authenticated');
create policy "Allow auth adjustments on gallery_items" on public.gallery_items for all using (auth.role() = 'authenticated');
create policy "Allow auth adjustments on hero_media" on public.hero_media for all using (auth.role() = 'authenticated');
create policy "Allow auth adjustments on event_videos" on public.event_videos for all using (auth.role() = 'authenticated');

-- 8. Add initial values
insert into public.site_settings (id) values (1) on conflict (id) do nothing;
insert into public.hero_media (id, video_url, poster_url) values ('hero-1', 'https://assets.mixkit.co/videos/preview/mixkit-barman-shaking-metal-shaker-creating-bubbles-34288-large.mp4', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format') on conflict (id) do nothing;`}
                  </pre>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>
    </div>
  );
}
