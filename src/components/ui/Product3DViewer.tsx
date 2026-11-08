'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Rotate3d, Play, Pause, RefreshCw, ZoomIn, Box } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Product3DViewerProps {
  modelUrl?: string | null;
  images: string[];
  productName: string;
}

export default function Product3DViewer({
  modelUrl,
  images,
  productName,
}: Product3DViewerProps) {
  const { language } = useLanguage();
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const currentRotationRef = useRef<number>(0);

  // Auto rotation timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoRotating) {
      interval = setInterval(() => {
        setRotationAngle((prev) => (prev + 1.5) % 360);
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Touch and mouse drag handlers for 360 rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    startXRef.current = e.clientX;
    currentRotationRef.current = rotationAngle;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    const newAngle = (currentRotationRef.current + deltaX * 0.75 + 360) % 360;
    setRotationAngle(newAngle);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    startXRef.current = e.touches[0].clientX;
    currentRotationRef.current = rotationAngle;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startXRef.current;
    const newAngle = (currentRotationRef.current + deltaX * 0.75 + 360) % 360;
    setRotationAngle(newAngle);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Determine which image angle to display based on rotationAngle (or 3D model)
  const imageIndex = Math.floor((rotationAngle / 360) * Math.max(1, images.length)) % Math.max(1, images.length);
  const activeImage = images[imageIndex] || images[0];

  return (
    <div
      className="relative aspect-3/4 w-full rounded-3xl bg-zinc-100 overflow-hidden select-none cursor-grab active:cursor-grabbing border border-zinc-200/80 shadow-inner"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Visual Render or 360 Turntable */}
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          className="object-cover transition-transform duration-75"
          style={{
            transform: `scale(${1 + Math.sin((rotationAngle * Math.PI) / 180) * 0.03})`,
          }}
        />
        <div className="absolute inset-0 bg-radial from-transparent to-black/10" />
      </div>

      {/* Top 3D Indicator Badge */}
      <div className="absolute top-4 start-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 text-white backdrop-blur-md text-[11px] font-bold uppercase tracking-wider z-10 pointer-events-none">
        <Box className="w-3.5 h-3.5 text-zinc-300" />
        <span>360° {language === 'ar' ? 'عرض تفاعلي' : '3D View'}</span>
      </div>

      {/* Degree readout */}
      <div className="absolute top-4 end-4 px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-md text-black text-[10px] font-bold z-10 pointer-events-none">
        {Math.round(rotationAngle)}°
      </div>

      {/* Interactive Controls Bar at Bottom */}
      <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-10 pointer-events-auto">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl shadow-lg border border-zinc-100">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-800 transition"
            title={isAutoRotating ? 'إيقاف الدوران' : 'تشغيل الدوران التلقائي'}
          >
            {isAutoRotating ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => {
              setRotationAngle(0);
              setIsAutoRotating(false);
            }}
            className="p-2 rounded-xl hover:bg-zinc-100 text-zinc-800 transition"
            title="إعادة للوضع الأصلي"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Drag Hint */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/75 text-white text-[11px] font-medium backdrop-blur-md">
          <Rotate3d className="w-3.5 h-3.5" />
          <span>
            {language === 'ar'
              ? 'اسحب بإصبعك أو الماوس للتدوير'
              : 'Glissez pour tourner'}
          </span>
        </div>
      </div>
    </div>
  );
}
