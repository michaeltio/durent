"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const headlines = [
  {
    title: "Sewa apapun\nyang kamu butuhkan.",
    sub: "Kru, peralatan, dan lokasi — semua dalam satu platform.",
  },
  {
    title: "Kru profesional\nsiap bekerja.",
    sub: "Akses jaringan profesional terverifikasi, kapan saja kamu butuhkan.",
  },
  {
    title: "Peralatan kelas\nsinema.",
    sub: "Dari kamera hingga lighting rig, temukan gear profesional dengan harga transparan.",
  },
  {
    title: "Lokasi unik\nuntuk setiap produksi.",
    sub: "Studio, rooftop, gudang — jelajahi, pesan, dan mulai syuting.",
  },
];

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex] = useState(0);

  const current = useMemo(() => headlines[activeIndex], [activeIndex]);

  return (
    <section ref={containerRef} className="relative">
      <div className="top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Content */}
        <div className="container relative z-10 text-center max-w-4xl ">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] gradient-text mb-6 whitespace-pre-line">
                {current.title}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
                {current.sub}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <a
              href="https://app.durentsupport.com"
              className="group inline-flex h-12 items-center justify-center rounded-full border border-transparent bg-foreground !text-black px-8 text-base font-medium  transition-colors hover:opacity-90"
            >
              Mulai Sewa
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <Button variant="outline" size="lg" className="text-base px-8">
              Cara Kerjanya
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="flex flex-col items-center">
              <span className="text-2xl font-heading font-bold text-foreground">
                2.400+
              </span>
              <span>Kru Terverifikasi</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-heading font-bold text-foreground">
                10K+
              </span>
              <span>Peralatan</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col items-center">
              <span className="text-2xl font-heading font-bold text-foreground">
                500+
              </span>
              <span>Lokasi</span>
            </div>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xs text-muted-foreground">
            Scroll untuk menjelajahi
          </span>
          <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1">
            <motion.div
              className="w-1 h-2 rounded-full bg-muted-foreground/60"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
