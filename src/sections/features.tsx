"use client";

import { motion } from "framer-motion";
import { Users, Camera, MapPin, ArrowUpRight } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Sewa Kru",
    description:
      "Akses jaringan profesional terkurasi — dari operator kamera hingga art director. Terverifikasi, terpercaya, dan siap bekerja sesuai jadwalmu.",
    benefits: ["Profesional terverifikasi", "Jadwal booking fleksibel", "Status ketersediaan real-time"],
  },
  {
    icon: Camera,
    title: "Sewa Peralatan",
    description:
      "Dari kamera sinema hingga lighting rig, temukan gear profesional dengan harga transparan. Setiap item diperiksa dan diasuransikan.",
    benefits: ["10.000+ item tersedia", "Pengiriman ke lokasi", "Perlindungan kerusakan penuh"],
  },
  {
    icon: MapPin,
    title: "Sewa Lokasi",
    description:
      "Temukan ruang unik untuk setiap produksi — studio, rooftop, gudang, dan lainnya. Jelajahi, pesan, dan syuting tanpa ribet.",
    benefits: ["Virtual tour tersedia", "Bantuan perizinan", "Booking hari yang sama"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

const Features = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="container">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">Apa yang kami tawarkan</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold gradient-text-bright mb-5">
            Semua yang kamu butuhkan,
            <br />
            tanpa yang tidak perlu.
          </h2>
          <p className="text-muted-foreground text-lg">
            Tiga kategori, satu pengalaman mulus. Berhenti repot dengan banyak vendor dan mulai berkarya.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass-panel-hover rounded-2xl p-8 group cursor-pointer"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                  <feature.icon className="w-5 h-5 text-foreground" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{feature.description}</p>

              <ul className="space-y-2">
                {feature.benefits.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-secondary-foreground">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
