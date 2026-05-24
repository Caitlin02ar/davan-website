"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { landingData } from "@/app/data/landing";
import PillarCard from "./PillarCard";

const ease = [0.22, 1, 0.36, 1] as const;

function ArrowButton({
  direction,
  onClick,
  mobile = false,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  mobile?: boolean;
}) {
  return (
    <motion.button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`
        group flex items-center justify-center rounded-full border border-primary
        bg-transparent transition-colors duration-300
        ${
          mobile
            ? "h-10 w-10 text-dark hover:bg-dark hover:text-primary outline outline-dark"
            : "h-11 w-11 text-primary hover:bg-primary hover:text-dark outline outline-dark"
        }
      `}
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
        className={mobile ? "-rotate-90" : ""}
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
      {/* DESKTOP VIDEO FULL SECTION */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 hidden h-full w-full object-cover opacity-45 md:block"
      >
        <source src="/video/Pillar.webm" type="video/webm" />
      </video>

      {/* MOBILE VIDEO ONLY TOP AREA */}
      <div className="absolute inset-x-0 top-0 h-[430px] md:hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover opacity-45"
        >
          <source src="/video/Pillar.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-dark/35" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-dark" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="overflow-hidden">
          <motion.h2
            className="font-heading text-[2rem] uppercase leading-[1] sm:text-4xl md:text-[3rem]"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease }}
          >
            {landingData.system.heading}

            <span className="block text-primary md:ml-3 md:inline">
              {landingData.system.headingColor}
            </span>
          </motion.h2>
        </div>
        <div className="overflow-hidden">
          <motion.p
            className="mt-4 text-[1.15rem] font-semibold md:text-[1rem]"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease, delay: 0.12 }}
          >
            {landingData.system.subheading}
          </motion.p>
        </div>

        <div className="overflow-hidden">
          <p className="mx-auto mt-5 text-[1rem] font-light leading-relaxed text-white md:max-w-[620px] md:text-[0.875rem]">
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
          {/* DESKTOP PREV */}
          <motion.div
            className="absolute left-0 top-1/2 z-50 hidden -translate-y-1/2 md:block"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
          >
            <ArrowButton direction="prev" onClick={prev} />
          </motion.div>

          {/* DESKTOP CARD STACK */}
          <div className="relative left-1/2 hidden w-full max-w-[760px] -translate-x-1/2 md:block">
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

            <div className="invisible pointer-events-none mx-auto h-[520px] w-[380px]" />
          </div>

          {/* MOBILE CARD STACK - NO VIDEO BG */}
          <div className="relative left-1/2 block w-full max-w-[380px] -translate-x-1/2 md:hidden">
            {cards.map((card, index) => {
              const isActive = index === activeIndex;
              const stackOrder = index - activeIndex;

              if (stackOrder < 0) return null;

              return (
                <motion.div
                  key={card.number}
                  className="absolute top-0 cursor-pointer"
                  initial={{ y: 60, opacity: 0 }}
                  animate={{
                    y: isActive ? 0 : 34 + stackOrder * 22,
                    x: 0,
                    scale: isActive ? 1 : 0.96 - stackOrder * 0.025,
                    opacity: isActive ? 1 : 0.86,
                  }}
                  transition={{ duration: 0.65, ease }}
                  style={{
                    left: "50%",
                    translateX: "-50%",
                    zIndex: isActive ? 100 : 100 - stackOrder,
                  }}
                  onClick={() => {
                    if (isActive) next();
                    else setActiveIndex(index);
                  }}
                >
                  <div className="relative">
                    <PillarCard {...card} isActive={isActive} />

                    {isActive && (
                      <div className="absolute bottom-6 right-6 z-[200] flex flex-row gap-3">
                        <ArrowButton direction="next" onClick={prev} mobile />
                        <ArrowButton direction="prev" onClick={next} mobile />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}

            <div className="invisible pointer-events-none mx-auto h-[610px] w-[380px]" />
          </div>

          {/* DESKTOP NEXT */}
          <motion.div
            className="absolute right-0 top-1/2 z-50 hidden -translate-y-1/2 md:block"
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