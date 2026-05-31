'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Bookmark, ExternalLink, Volume2, VolumeX, Star } from 'lucide-react';
import Link from 'next/link';
import { dishes } from '@/data/dishes';

function ReelCard({ dish, isActive }: { dish: typeof dishes[0]; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => setVideoError(true));
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="relative h-full w-full bg-stone-950">
      {videoError ? (
        <img src={dish.image} alt={dish.name} className="h-full w-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          src={dish.video}
          muted={isMuted}
          loop
          playsInline
          onError={() => setVideoError(true)}
          className="h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

      <div className="absolute bottom-0 left-0 right-20 p-6 pb-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-lg">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-white">{dish.rating}</span>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm font-medium ${dish.isVeg ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
            {dish.isVeg ? 'Veg' : 'Non-Veg'}
          </span>
          {dish.isBestseller && (
            <span className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 backdrop-blur-sm text-amber-300 font-medium">
              Popular
            </span>
          )}
        </div>
        <h2 className="font-[family-name:var(--font-heading)] text-white text-2xl font-medium mb-2">{dish.name}</h2>
        <p className="text-white/60 text-sm line-clamp-2 leading-relaxed mb-4">{dish.description}</p>
        <div className="flex items-center gap-4">
          <span className="text-white text-lg font-bold">₹{dish.price}</span>
          <span className="text-white/30">·</span>
          <span className="text-white/40 text-sm">{dish.preparationTime} min prep</span>
        </div>
      </div>

      <div className="absolute right-4 bottom-32 flex flex-col items-center gap-5">
        <button
          onClick={() => setLiked(!liked)}
          className="flex flex-col items-center gap-1.5"
        >
          <motion.div whileTap={{ scale: 1.3 }} className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Heart className={`h-5 w-5 ${liked ? 'text-red-400 fill-red-400' : 'text-white'}`} />
          </motion.div>
          <span className="text-white/70 text-[10px]">{dish.totalReviews + (liked ? 1 : 0)}</span>
        </button>

        <button className="flex flex-col items-center gap-1.5">
          <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Share2 className="h-5 w-5 text-white" />
          </div>
          <span className="text-white/70 text-[10px]">Share</span>
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className="flex flex-col items-center gap-1.5"
        >
          <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Bookmark className={`h-5 w-5 ${saved ? 'text-amber-400 fill-amber-400' : 'text-white'}`} />
          </div>
          <span className="text-white/70 text-[10px]">Save</span>
        </button>

        <Link href={`/dish/${dish.id}`} className="flex flex-col items-center gap-1.5">
          <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <ExternalLink className="h-5 w-5 text-white" />
          </div>
          <span className="text-white/70 text-[10px]">Details</span>
        </Link>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-white/60" />
          ) : (
            <Volume2 className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function ReelsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);

  const goNext = () => {
    if (currentIndex < dishes.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime.current < 600) return;
      lastScrollTime.current = now;
      if (e.deltaY > 30) goNext();
      else if (e.deltaY < -30) goPrev();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) container.removeEventListener('wheel', handleWheel);
    };
  });

  useEffect(() => {
    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = startY - e.changedTouches[0].clientY;
      if (diff > 80) goNext();
      else if (diff < -80) goPrev();
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  });

  return (
    <div ref={containerRef} className="h-[100dvh] w-full overflow-hidden bg-black relative">
      <div className="absolute top-0 left-0 right-0 z-20 p-5 flex items-center justify-between">
        <Link href="/menu?table=1" className="text-white/60 text-sm font-medium hover:text-white transition-colors">
          ← Menu
        </Link>
        <h1 className="text-white font-semibold text-sm">Reels</h1>
        <div className="w-12" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.25 }}
          className="h-full w-full"
        >
          <ReelCard dish={dishes[currentIndex]} isActive={true} />
        </motion.div>
      </AnimatePresence>

      <div className="absolute left-3 top-1/2 -translate-y-1/2 z-20">
        <div className="flex flex-col gap-1">
          {dishes.slice(0, 12).map((_, i) => (
            <div
              key={i}
              className={`w-0.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'h-5 bg-white' : 'h-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
