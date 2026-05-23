"use client";

import { landingData } from "@/app/data/landing";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export default function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start center"], 
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  return (
    <section
      id="why-davan"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ opacity: bgOpacity, scale: bgScale }}>
        <img
          src="/photos/about-us.webp"
          alt="About Us"
          className="h-full w-full object-cover object-[90%_center]"
        />
      </motion.div>
      <div className="relative z-10 flex min-h-screen items-center px-8 md:px-40">
        <div className="mx-auto w-full max-w-4xl">
          <div className="max-w-2xl">

          <div className="overflow-hidden">
            <motion.div
              initial={{ x: -120, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1.3, ease: easeOutExpo }}
              className="flex items-center gap-3">
              <h1 className="font-heading text-[2rem] md:text-[3rem] text-white leading-none">
                {landingData.about.title}
              </h1>
              <h1 className="font-heading text-[2rem] md:text-[3rem] text-primary leading-none">
                {landingData.about.titleColor}
              </h1>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, delay: 0.2, ease: easeOutExpo }}
            className="mt-4 text-[1rem] md:text-base text-white leading-relaxed font-normal">
            <span className="font-bold">{landingData.about.subtitle.bold}</span>
            {landingData.about.subtitle.normal}
          </motion.p>

          <p className="mt-8 max-w-xl text-sm text-white leading-relaxed font-light">
            {landingData.about.description.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ y: 18, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: 0.6 + index * 0.08,
                  duration: 0.5,
                  ease: easeOutExpo,
                }}
                className="mr-1 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>
        </div>
      </div>
    </section>
  );
}