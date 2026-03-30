"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  { step: "01", title: "Cari & Temukan", description: "Jelajahi kru, peralatan, atau lokasi dengan filter canggih. Bandingkan pilihan secara instan." },
  { step: "02", title: "Pesan & Konfirmasi", description: "Pilih tanggal, tinjau harga, dan konfirmasi — semuanya dalam hitungan menit, bukan hari." },
  { step: "03", title: "Berkarya & Selesaikan", description: "Datang, kerjakan. Kami yang mengurus logistik, asuransi, dan dukungan di balik layar." },
];

const Showcase = () => {
  return (
    <section id="showcase" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-transparent pointer-events-none" />

      <div className="container relative">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Cara kerja</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text-bright mb-5">
            Dari pencarian ke lokasi syuting
            <br />
            dalam tiga langkah.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center mx-auto mb-6">
                <span className="font-heading text-sm font-semibold text-muted-foreground">{item.step}</span>
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust block */}
        <motion.div
          className="mt-24 glass-panel rounded-2xl p-10 md:p-14 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
            Dibangun untuk profesional yang menghargai waktu.
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Setiap listing terverifikasi. Setiap transaksi dilindungi. Setiap pengalaman dirancang tanpa hambatan.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-secondary-foreground">
            {["Listing terverifikasi", "Pembayaran aman", "Dukungan 24/7", "Pembatalan gratis"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[hsl(var(--success))]" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
