"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Tag from "../components/Tag";
import { landingData } from "@/app/data/landing";

export default function Credentials() {
  return (
    <section className="relative w-full overflow-hidden bg-dark py-16 pb-0">
      <div className="mb-10 flex items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Tag text={landingData.credentials.tag} />
        </motion.div>
      </div>

      {/* Fade kiri */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-dark to-transparent" />

      {/* Fade kanan */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-dark to-transparent" />

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex w-max items-center"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[0, 1].map((i) => (
            <div key={i} className="flex shrink-0 items-center">
              <Image
                src="/photos/credentials.png"
                alt="Our Clients"
                width={4000}
                height={200}
                className="h-20 w-auto max-w-none object-contain md:h-24"
                priority
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}