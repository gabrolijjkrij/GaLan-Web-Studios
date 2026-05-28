import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAME_COUNT = 10;

export function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4, 0.5], [1, 1, 0]);

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const isMobile = window.innerWidth < 768;
      const promises = [];
      
      for (let i = 1; i <= FRAME_COUNT; i++) {
        // On mobile, load every other frame to save bandwidth and memory, reusing the previous frame
        const fileIndex = isMobile && i % 2 === 0 ? i - 1 : i;

        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.src = `/frames/frame-${String(fileIndex).padStart(2, '0')}.png`;
          img.onload = () => resolve(img);
          img.onerror = () => reject();
        });
        promises.push(promise);
      }

      try {
        const results = await Promise.all(promises);
        setImages(results);
        setIsReady(true);
      } catch (e) {
        console.error("Failed to load frames", e);
        // still set ready so it doesn't block forever
        setIsReady(true);
      }
    };
    loadImages();
  }, []);

  const drawFrame = (index: number) => {
    if (!canvasRef.current || images.length === 0) return;
    const img = images[index];
    if (!img) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width || 900;
    const ih = img.height || 500;

    const ratio = Math.max(cw / iw, ch / ih);
    const w = iw * ratio;
    const h = ih * ratio;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latest)));
    drawFrame(index);
  });

  // initial draw
  useEffect(() => {
    if (isReady && images.length > 0) {
      const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(frameIndex.get())));
      drawFrame(index);
    }
  }, [isReady, images]);

  // handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isReady && images.length > 0) {
        const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(frameIndex.get())));
        drawFrame(index);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isReady, images]);

  return (
    <div ref={containerRef} className="h-[300vh] relative w-full bg-black">
      <motion.div 
        className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center"
        style={{ opacity: sectionOpacity }}
      >
        {!isReady && (
          <div className="absolute inset-0 z-50 bg-black transition-opacity duration-1000" />
        )}
        
        <motion.div className="absolute inset-0 w-full h-full origin-center" style={{ scale }}>
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

        <motion.div 
          className="absolute bottom-12 left-0 right-0 text-center pointer-events-none"
          style={{ opacity: textOpacity }}
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500 font-light">
            — Studio —
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
