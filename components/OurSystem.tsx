"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { landingData } from "@/app/data/landing";
import PillarCard from "./PillarCard";

const ease = [0.22, 1, 0.36, 1] as const;

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-transparent text-primary transition-colors duration-300 hover:bg-primary hover:text-dark"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.93 }}
      transition={{ duration: 0.2, ease }}
      aria-label={direction === "prev" ? "Previous card" : "Next card"}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-colors duration-300"
      >
        {direction === "prev" ? (
          <path
            d="M11 13.5L6.5 9L11 4.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M7 4.5L11.5 9L7 13.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </motion.button>
  );
}

export default function OurSystem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cards = landingData.system.card;

  const prev = () =>
    setActiveIndex((i) => (i === 0 ? cards.length - 1 : i - 1));

  const next = () =>
    setActiveIndex((i) => (i === cards.length - 1 ? 0 : i + 1));

  return (
    <section
      id="our-system"
      className="relative overflow-hidden bg-dark px-4 py-16 pb-28 text-white sm:px-6 sm:py-20 sm:pb-32"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      >
        <source src="/video/Pillar.webm" type="video/webm" />
      </video>

      <div className="relative z-10 mx-auto max-w-5xl text-center">

        <div className="overflow-hidden">
          <motion.h2
            className="font-heading text-[2rem] uppercase leading-none sm:text-4xl md:text-[3rem]"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease }}
          >
            {landingData.system.heading}{" "}
            <span className="text-primary">
              {landingData.system.headingColor}
            </span>
          </motion.h2>
        </div>

        <div className="overflow-hidden">
          <motion.p
            className="mt-4 text-[0.857rem] font-semibold"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease, delay: 0.12 }}
          >
            {landingData.system.subheading}
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <p className="mx-auto mt-5 max-w-[620px] text-[0.75rem] font-light leading-relaxed text-white">
            {landingData.system.description.split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ y: 14, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.35 + index * 0.06,
                  duration: 0.5,
                  ease,
                }}
                className="mr-1 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </p>
        </div>

        <div className="relative mx-auto mt-8 max-w-[900px]">

          {/* Prev — desktop only */}
          <motion.div
            className="absolute left-0 top-1/2 z-50 hidden -translate-y-1/2 md:block"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
          >
            <ArrowButton direction="prev" onClick={prev} />
          </motion.div>

          {/* Cards stack */}
          <div className="relative left-1/2 w-full max-w-[340px] -translate-x-1/2 sm:max-w-[400px] md:max-w-[760px]">
            {cards.map((card, index) => {
              const offset = index - activeIndex;
              const isActive = offset === 0;

              return (
                <motion.div
                  key={card.number}
                  className="absolute top-0 cursor-pointer"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: isActive ? 1 : 0.75,
                    x: `calc(${offset} * clamp(28px, 5vw, 52px))`,
                    scale: isActive ? 1 : 0.95,
                  }}
                  transition={{
                    y: { duration: 0.8, ease, delay: 0.8 + index * 0.12 },
                    x: { duration: 0.65, ease },
                    scale: { duration: 0.65, ease },
                  }}
                  style={{
                    left: "50%",
                    translateX: "-50%",
                    zIndex: isActive ? 40 : offset < 0 ? 20 + index : 30 - offset,
                  }}
                  onClick={() => {
                    if (isActive) next();
                    else setActiveIndex(index);
                  }}
                >
                  <PillarCard {...card} isActive={isActive} />
                </motion.div>
              );
            })}

            <div className="invisible pointer-events-none h-[520px] w-[340px] mx-auto" />
          </div>

          {/* Next — desktop only */}
          <motion.div
            className="absolute right-0 top-1/2 z-50 hidden -translate-y-1/2 md:block"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
          >
            <ArrowButton direction="next" onClick={next} />
          </motion.div>

          {/* Arrow + dots — mobile only */}
          <motion.div
            className="mt-6 flex items-center justify-center gap-4 md:hidden"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
          >
            <ArrowButton direction="prev" onClick={prev} />

            <div className="flex gap-2">
              {cards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-5 bg-primary" : "w-1.5 bg-white/40"
                  }`}
                  aria-label={`Go to card ${i + 1}`}
                />
              ))}
            </div>

            <ArrowButton direction="next" onClick={next} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}