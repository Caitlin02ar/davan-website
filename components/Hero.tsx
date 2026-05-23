"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Button from "./Button";
import { landingData } from "../app/data/landing";

const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const words = landingData.hero.description.split(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], ["0%", "-12%"]);

  return (
    <main id="home" ref={containerRef} className="relative min-h-screen overflow-hidden">

      <motion.div
        className="relative h-screen w-full"
        style={{ opacity: videoOpacity }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="/video/hero-section.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-black/35" />
      </motion.div>
      <div className="absolute inset-0 bg-black/50" />

      {/* CONTENT — fades out + drifts up on scroll */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-5"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="flex w-full max-w-7xl flex-col items-center gap-10 text-center sm:gap-12 md:gap-14 lg:gap-16">

          {/* HEADING */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.18, delayChildren: 0.25 } },
            }}
            className="flex flex-col items-center leading-none"
          >
            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  hidden: { x: -90, opacity: 0, clipPath: "inset(0 100% 0 0)" },
                  show: { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 1, ease: easeOutExpo } },
                }}
                className="font-heading text-[1rem] font-bold uppercase text-white sm:text-[2rem] md:text-[3rem]"
              >
                {landingData.hero.titleTop}
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.div
                variants={{
                  hidden: { x: -90, opacity: 0, clipPath: "inset(0 100% 0 0)" },
                  show: { x: 0, opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 1, ease: easeOutExpo } },
                }}
                className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5"
              >
                <h1 className="font-heading text-[1rem] font-bold uppercase text-white sm:text-[2rem] md:text-[3rem] [text-shadow:0_2px_16px_rgba(0,0,0,0.9)]">
                  {landingData.hero.titleBottom}
                </h1>
                <h1 className="font-heading text-[1rem] font-bold uppercase text-primary sm:text-[2rem] md:text-[3rem] [text-shadow:0_2px_16px_rgba(0,0,0,0.7)]">
                  {landingData.hero.textColor}
                </h1>
              </motion.div>
            </div>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.06, delayChildren: 1 } },
            }}
            className="max-w-[90%] font-body text-sm font-light leading-relaxed text-white sm:max-w-xl sm:text-base md:max-w-xl md:text-md [text-shadow:0_2px_12px_rgba(0,0,0,0.8),0_1px_4px_rgba(0,0,0,0.6)]"
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: easeOutExpo } },
                }}
                className="inline-block"
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.p>

          {/* BUTTON */}
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: easeOutExpo }}
          >
            <Button href="#contact">{landingData.hero.button}</Button>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}