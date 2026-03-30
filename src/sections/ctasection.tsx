"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-32">
      <div className="container">
        <motion.div
          className="relative rounded-3xl overflow-hidden glass-panel p-14 md:p-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-muted/40 blur-[100px] rounded-full pointer-events-none" />
          <div className="grain-overlay" />

          <div className="relative z-10">
            <h2 className="font-heading text-4xl md:text-6xl font-bold gradient-text-bright mb-6">
              Siap berkarya?
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10">
              Bergabung dengan ribuan profesional yang mempercayakan produksi mereka kepada Durent.
              Mulai jelajahi gratis — tanpa komitmen.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="group text-base px-8">
                Mulai Gratis
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8">
                Hubungi Sales
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
