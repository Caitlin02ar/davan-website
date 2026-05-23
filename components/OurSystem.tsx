"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
      className="relative overflow-hidden bg-dark px-6 py-20 pb-32 text-white"
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
            className="font-heading text-4xl uppercase leading-none md:text-5xl"
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

        {/* Cards + Arrow Buttons */}
        <div className="relative mx-auto mt-8 max-w-[900px]">

          {/* Prev button — vertically centered on card */}
          <motion.div
            className="absolute left-0 top-1/2 z-50 -translate-y-1/2"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
          >
            <ArrowButton direction="prev" onClick={prev} />
          </motion.div>

          {/* Cards stack */}
          <div className="relative left-1/2 w-[760px] -translate-x-1/2">
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
                    x: offset * 52,
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
                    zIndex: isActive
                      ? 40
                      : offset < 0
                      ? 20 + index
                      : 30 - offset,
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

            <div className="invisible pointer-events-none mx-auto w-[340px]">
              <PillarCard {...cards[activeIndex]} isActive={true} />
            </div>
          </div>

          {/* Next button — vertically centered on card */}
          <motion.div
            className="absolute right-0 top-1/2 z-50 -translate-y-1/2"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
          >
            <ArrowButton direction="next" onClick={next} />
          </motion.div>

        </div>

      </div>
    </section>
  );
}