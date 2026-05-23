"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Tag from "../components/Tag";
import { landingData } from "@/app/data/landing";

export default function Credentials() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-16">
      <div className="mb-10 flex items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}  
          transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        >
          <Tag text={landingData.credentials.tag} />
        </motion.div>
        
      </div>

      {/* Fade kiri */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />

      {/* Fade kanan */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

      <motion.div
        className="flex items-center"
        animate={{
          x: [0, -2000],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {[0, 1].map((i) => (
          <div key={i} className="flex-shrink-0">
            <Image
              src="/photos/credentials.png"
              alt="Our Clients"
              width={4000}
              height={200}
              className="h-20 w-auto object-contain md:h-24"
              priority
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}