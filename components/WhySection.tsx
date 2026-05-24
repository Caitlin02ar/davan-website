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
      className="relative min-h-screen overflow-hidden"
    >
      {/* DESKTOP BG */}
      <motion.div
        className="absolute inset-0 hidden md:block"
        style={{ opacity: bgOpacity, scale: bgScale }}
      >
        <img
          src="/photos/about-us.webp"
          alt="About Us"
          className="h-full w-full object-cover object-[90%_center]"
        />
      </motion.div>

      {/* MOBILE BASE */}
      <div className="absolute inset-0 bg-[#0F0F11] md:hidden" />

      {/* MOBILE TOP IMAGE */}
<motion.div
  className="absolute inset-x-0 top-0 z-[1] h-[50%] md:hidden"
  style={{ opacity: bgOpacity, scale: bgScale }}
>
  <img
    src="/photos/about-us.webp"
    alt="About Us"
    className="h-full w-full object-cover object-[82%_top] scale-110 translate-y-2"
  />
</motion.div>

{/* MOBILE BOTTOM IMAGE */}
<motion.div
  className="absolute inset-x-0 bottom-0 h-[50%] md:hidden"
  style={{ opacity: bgOpacity, scale: bgScale }}
>
  <img
    src="/photos/about-us.webp"
    alt="About Us"
    className="h-full w-full object-cover object-[8%_bottom]"
  />

  {/* Gradient tipis biar transisi halus */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11]/20 to-transparent" />
</motion.div>


      {/* CONTENT */}
      <div
        className="
          relative z-10 flex min-h-screen items-center
          px-6 pt-28
          md:px-40 md:pt-0
        "
      >
        <div className="mx-auto w-full max-w-4xl">
          <div className="max-w-2xl">
            {/* HEADING */}
            <div className="overflow-hidden">
  <motion.div
    initial={{ x: -120, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 1.3, ease: easeOutExpo }}
    className="flex items-center gap-2 whitespace-nowrap"
  >
    <h1
      className="font-heading leading-none text-white text-[1.75rem] md:text-[3rem]"
    >
      {landingData.about.title}
    </h1>

    <h1
      className="font-heading leading-none text-primary text-[1.75rem] md:text-[3rem]"
    >
      {landingData.about.titleColor}
    </h1>
  </motion.div>
</div>

            {/* SUBTITLE */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.1,
                delay: 0.2,
                ease: easeOutExpo,
              }}
              className="mt-12 max-w-[330px] text-[1.15rem] leading-[1.55] text-white md:mt-4 md:max-w-none md:text-base"
            >
              <span className="font-bold">
                {landingData.about.subtitle.bold}
              </span>
              {landingData.about.subtitle.normal}
            </motion.p>

            {/* DESCRIPTION */}
            <p
              className="mt-24 max-w-[320px] text-[1rem] leading-[1.75] text-white md:mt-8 md:max-w-xl md:text-[0.875rem]"
            >
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
