"use client";

import { motion } from "motion/react";
import Tag from "./Tag";
import { landingData } from "@/app/data/landing";

const ease = [0.22, 1, 0.36, 1] as const;

const INFO_TITLE_DURATION = 0.65;
const INFO_WORD_DURATION = 0.45;
const INFO_WORD_STAGGER = 0.035;
const INFO_GAP = 0.25;

function WordReveal({
  text,
  baseDelay,
  className = "",
}: {
  text: string;
  baseDelay: number;
  className?: string;
}) {
  return (
    <p className={className}>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          initial={{ y: 14, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: baseDelay + index * INFO_WORD_STAGGER,
            duration: INFO_WORD_DURATION,
            ease,
          }}
          className="mr-1 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
}

export default function About() {
  const info = landingData.vision.info;
  const firstInfoWords = info[0]?.description.split(" ").length ?? 0;
  const secondInfoWords = info[1]?.description.split(" ").length ?? 0;

  const infoStartDelay = 0.35;

  const firstTitleDelay = infoStartDelay;
  const firstDescDelay = firstTitleDelay + INFO_TITLE_DURATION * 0.65;

  const secondTitleDelay =
    firstDescDelay + firstInfoWords * INFO_WORD_STAGGER + INFO_WORD_DURATION + INFO_GAP;

  const secondDescDelay = secondTitleDelay + INFO_TITLE_DURATION * 0.65;

  const dividerDelay =
    secondDescDelay + secondInfoWords * INFO_WORD_STAGGER + INFO_WORD_DURATION + 0.25;

  const bentoHeadingDelay = dividerDelay + 0.55;
  const bentoCardDelay = bentoHeadingDelay + 0.45;

  return (
    <main id="about-us" className="bg-dark px-8 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex flex-col items-start gap-4">
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease }}
          >
            <Tag text={landingData.vision.tag} />
          </motion.div>

          <h1 className="max-w-3xl font-heading text-3xl uppercase md:leading-[1.05] leading-[1.7] sm:text-4xl md:text-[2rem]">
            <div className="overflow-hidden">
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.75, ease, delay: 0.1 }}
                className="inline"
              >
                <span className="text-white">
                  {landingData.vision.heading}{" "}
                </span>
                <span className="text-primary">
                  {landingData.vision.headingColor}
                </span>
              </motion.div>
            </div>
          </h1>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-[0.75fr_auto_1.6fr]">
          {/* LEFT INFO */}
          <div className="flex flex-col gap-8">
            {info.map((item, index) => {
              const titleDelay = index === 0 ? firstTitleDelay : secondTitleDelay;
              const descDelay = index === 0 ? firstDescDelay : secondDescDelay;

              return (
                <div key={index} className="max-w-full md:max-w-[240px]">
                  <div className="overflow-hidden">
                    <motion.h3
                      className="mb-2 font-body text-[1.1rem] font-semibold uppercase text-primary"
                      initial={{ x: -28, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: INFO_TITLE_DURATION,
                        ease,
                        delay: titleDelay,
                      }}
                    >
                      {item.title}
                    </motion.h3>
                  </div>

                  <WordReveal
                    text={item.description}
                    baseDelay={descDelay}
                    className="text-sm font-light leading-[1.8] text-white mb-10"
                  />
                </div>
              );
            })}
          </div>

          {/* DIVIDER — DESKTOP */}
          <div className="hidden items-stretch md:flex">
            <motion.div
              className="w-px bg-primary"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease, delay: dividerDelay }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* DIVIDER — MOBILE */}
          <div className="flex items-center md:hidden">
            <motion.div
              className="h-px w-full bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease, delay: dividerDelay }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* RIGHT BENTO */}
          <div>
            <div className="mb-5 overflow-hidden">
              <motion.h3
                className="font-body text-[1.1rem] font-semibold uppercase text-primary text-center md:text-left"
                initial={{ x: -28, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.65,
                  ease,
                  delay: bentoHeadingDelay,
                }}
              >
                {landingData.vision.headingBento}
              </motion.h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {landingData.vision.bento.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    ease,
                    delay: bentoCardDelay + index * 0.12,
                  }}
                  className={`
                    rounded-2xl px-6 py-7
                    ${
                      index === 0 || index === 2
                        ? "bg-primary text-black"
                        : "bg-gray text-white"
                    }
                    ${index >= 2 ? "col-span-2" : ""}
                  `}
                >
                  <h4 className="mb-3 font-body text-xl font-bold leading-tight text-center md:text-left">
                    {item.title}
                  </h4>

                  <p
                    className={`text-sm font-normal leading-relaxed md:text-left text-center ${
                      index === 0 || index === 2 ? "text-black" : "text-white"
                    }`}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}