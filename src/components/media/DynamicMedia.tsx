/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface DynamicMediaProps {
  url: string;
  alt?: string;
  className?: string;
  poster?: string;
}

export default function DynamicMedia({ url, alt = "Nova Grill Media", className = "", poster = "" }: DynamicMediaProps) {
  if (!url) return null;

  // Detect file type based on file extension or data URL headers
  const isVideo = 
    url.includes(".mp4") || 
    url.includes(".webm") || 
    url.includes(".mov") || 
    url.startsWith("data:video/") ||
    // Simple heuristic for generic storage URLs or fallback
    url.toLowerCase().match(/\.(mp4|webm|mov|ogg|3gp)/);

  if (isVideo) {
    return (
      <video
        src={url}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover select-none ${className}`}
      />
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      referrerPolicy="no-referrer"
      className={`w-full h-full object-cover select-none ${className}`}
      loading="lazy"
    />
  );
}
