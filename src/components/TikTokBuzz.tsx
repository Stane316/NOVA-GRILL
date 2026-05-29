/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { MessageCircle, Heart, Share2, Play, Users, Award, ShieldAlert, Sparkles, Film } from "lucide-react";
import { IMAGES, NOVA_CONTACT } from "../types";
import { useSite } from "../lib/context/SiteContext";

interface VideoData {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  created_at: string;
}

export default function TikTokBuzz() {
  const { settings, eventVideos } = useSite();

  const playlists = [
    { title: "Nos Cocktails", count: "12 publications", avatar: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=300" },
    { title: "Nos Soirées...", count: "10 publications", avatar: IMAGES.terrasseDJ },
    { title: "Anniversaires", count: "5 publications", avatar: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=300" }
  ];

  const viralVideos = [
    {
      id: "v-1",
      title: "Soirée DJ tous les samedis soirs au NOVA GRILL 🔥🔥🔥❤️",
      views: "33.9K",
      likes: "4.8K",
      tag: "Épinglé",
      image: IMAGES.terrasseDJ,
      time: "Il y a 2 jours"
    },
    {
      id: "v-2",
      title: "Poissonnerie DELTA x NOVA : un goût d'ailleurs 🐟🔥",
      views: "157.5K",
      likes: "18.2K",
      tag: "Populaire",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=500",
      time: "Il y a 1 semaine"
    },
    {
      id: "v-3",
      title: "Ambiance du weekend entre amis à Calavi - cocktail à la main",
      views: "24.2K",
      likes: "3.2K",
      tag: "Épinglé",
      image: IMAGES.cocktailGlow,
      time: "Il y a 2 semaines"
    },
    {
      id: "v-4",
      title: "Voici un plat de 5K Au NOVA GRILL... Venez tester nos allocos croustillants ! 🍗🍌",
      views: "830",
      likes: "120",
      tag: "Menu Spécial",
      image: IMAGES.signaturePlate,
      time: "Il y a 3 jours"
    }
  ];

  return (
    <section
      id="tiktok-hub"
      className="relative py-12 sm:py-16 bg-[#0B0908] text-luxury-cream overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-550/3 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 cinematic-grid pointer-events-none opacity-[0.05]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-16 lg:px-24 w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-10">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-rose-500 block mb-3 italic">
            · LA BUZZ DE LA COMMUNAUTÉ ·
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-5xl font-black text-white tracking-tight leading-tight">
            TikTok Nova Grill <br />
            <span className="italic font-light text-embers-glow">{settings.follower_count || "11.2K"} abonnés enflammés</span>
          </h2>
          <p className="font-sans text-stone-400 text-sm sm:text-base font-light mt-4">
            Suivez notre quotidien croustillant et festif. Participez au rituel en partageant vos stories et vos dégustations de piment avec notre hashtag officiel <span className="text-rose-500 font-bold">#NovaGrill</span>.
          </p>
        </div>

        {/* Master Row Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Block: TikTok Profile Statistics and Playlists (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Real stats board */}
            <div className="bg-[#161210] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden group hover:border-embers-glow/30 transition-all duration-500">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-transparent via-rose-500/5 to-transparent rounded-full filter blur-[15px]" />

              {/* Profile Avatar Frame */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full border-2 border-rose-500 p-0.5 bg-embers-dark overflow-hidden group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={IMAGES.heroEmbers}
                    alt="Logo Nova Grill"
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover scale-110"
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg uppercase text-white tracking-wide">
                    NOVA GRILL
                  </h3>
                  <p className="font-mono text-xs text-rose-500 font-medium">
                    {settings.tiktok_handle || "@restaurant.nova.grill"}
                  </p>
                </div>
              </div>

              {/* Bio summary */}
              <div className="border-t border-white/10 pt-4 font-sans text-zinc-400 text-xs sm:text-sm leading-relaxed">
                📍 {settings.address || "Calavi, carrefour Tankpè"} <br />
                🍢 RESTAURANT - BAR - LOUNGE <br />
                🔥 {settings.opening_hours || "7j/7 de 17h00 à 01h00"} <br />
                📞 {settings.phone || "+229 01 96 13 52 87"}
              </div>

              {/* Followers & Likes Counters */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 text-center">
                <div className="bg-black rounded-xl p-3 border border-white/5">
                  <div className="font-display font-black text-xl text-white">
                    {settings.follower_count || "11.2K"}
                  </div>
                  <div className="font-mono text-[9px] uppercase text-zinc-500 tracking-wider">
                    Suivis / Followers
                  </div>
                </div>
                <div className="bg-black rounded-xl p-3 border border-white/5">
                  <div className="font-display font-black text-xl text-rose-500">
                    {settings.likes_count || "131.7K"}
                  </div>
                  <div className="font-mono text-[9px] uppercase text-zinc-500 tracking-wider">
                    J'aime / Likes
                  </div>
                </div>
              </div>

              {/* Access TikTok Button */}
              <a
                href={settings.tiktok_url || "https://www.tiktok.com/@restaurant.nova.grill"}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-display text-xs font-bold uppercase tracking-widest py-3 rounded-full transition-all duration-300 shadow-lg shadow-rose-500/10 flex items-center justify-center gap-2"
              >
                <span>S'ABONNER SUR TIKTOK</span>
                <Sparkles className="w-4 h-4" />
              </a>
            </div>

            {/* Custom Playlists mockup */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400 px-2 block">
                PLAYLISTS EN VEDETTE
              </span>
              
              {playlists.map((playlist) => (
                <div
                  key={playlist.title}
                  className="bg-[#161210] border border-white/5 rounded-2xl p-3 flex items-center justify-between hover:border-embers-glow/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-black border border-white/5 overflow-hidden relative">
                      <img
                        src={playlist.avatar}
                        alt={playlist.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-xs uppercase text-zinc-100">
                        {playlist.title}
                      </h4>
                      <p className="font-mono text-[9px] text-zinc-500">
                        {playlist.count}
                      </p>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Block: Video Mockups with Real Stats (8 Columns) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {eventVideos.map((video: VideoData, idx: number) => (
                <div
                  key={video.id}
                  className="bg-[#161210] border border-white/5 rounded-3xl overflow-hidden flex flex-col justify-between group h-full relative hover:border-[#2d221c] transition-all duration-500 text-left"
                >
                  {/* Top Thumbnail Layer with video auto playback */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black border-b border-white/5">
                    <video
                      src={video.video_url}
                      poster={video.thumbnail_url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover group-hover:scale-105 duration-700 transition"
                    />

                    {/* Left top indicator */}
                    <span className="absolute top-4 left-4 z-20 bg-rose-500/10 border border-rose-500/40 text-rose-500 font-mono text-[9px] tracking-wider uppercase px-2.5 py-1 rounded flex items-center gap-1.5 font-bold">
                      <Film className="w-3 h-3 animate-pulse" />
                      <span>LIVE HD</span>
                    </span>

                    {/* Shading */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent z-10 pointer-events-none" />

                    {/* Absolute Views Metric */}
                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-zinc-300 font-mono text-xs">
                      <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span className="font-bold">STREAM LIVE</span>
                    </div>
                  </div>

                  {/* Caption & Stats bottom area */}
                  <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                    <p className="font-sans text-stone-200 text-xs sm:text-sm font-semibold leading-relaxed tracking-wide group-hover:text-amber-100 transition-colors">
                      {video.title}
                    </p>

                    <div className="border-t border-white/5 pt-4 flex items-center justify-between text-zinc-500 text-xs font-mono">
                      <span>RÉEL SCOPE</span>
                      <span className="flex items-center gap-1 text-rose-500">
                        <Heart className="w-4 h-4 fill-rose-500" />
                        <span className="font-bold">9.8K</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
