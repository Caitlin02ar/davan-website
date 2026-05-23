"use client";

import { motion } from "motion/react";
import Tag from "./Tag";
import { landingData } from "@/app/data/landing";

const ease = [0.22, 1, 0.36, 1] as const;

// Jauh lebih singkat — cukup hitung jumlah info items, bukan per kata
const DIVIDER_DELAY = 0.6 + landingData.vision.info.length * 0.18;
const BENTO_BASE_DELAY = DIVIDER_DELAY + 0.35;

export default function About() {
  return (
    <main id="about-us" className="px-8 py-16 sm:px-6 sm:py-24 bg-dark">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-start gap-4">

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease }}
          >
            <Tag text={landingData.vision.tag} />
          </motion.div>

          <h1 className="max-w-3xl font-heading text-3xl uppercase leading-[1.05] tracking-tight sm:text-4xl md:text-[2rem]">
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

          {/* Left info list — animasi per-item, bukan per-kata */}
          <div className="flex flex-col gap-8">
            {landingData.vision.info.map((item, index) => (
              <motion.div
                key={index}
                className="max-w-full md:max-w-[240px]"
                initial={{ x: -24, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.65,
                  ease,
                  delay: 0.15 + index * 0.12,
                }}
              >
                <h3 className="font-body text-[1.1rem] uppercase text-primary font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-sm leading-[1.8] text-white font-light">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Divider — vertical desktop */}
          <div className="hidden md:flex items-stretch">
            <motion.div
              className="w-px bg-primary"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease, delay: DIVIDER_DELAY }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Divider — horizontal mobile */}
          <div className="flex md:hidden items-center">
            <motion.div
              className="h-px w-full bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* Right — bento grid */}
          <div>
            <div className="overflow-hidden mb-5">
              <motion.h3
                className="font-body text-[1.1rem] uppercase text-primary font-semibold"
                initial={{ x: -24, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, ease, delay: 0.1 }}
              >
                {landingData.vision.headingBento}
              </motion.h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {landingData.vision.bento.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.55,
                    ease,
                    // Di desktop, tunggu divider. Di mobile, langsung muncul bertahap
                    delay: 0.12 + index * 0.1,
                  }}
                  className={`
                    rounded-2xl px-6 py-7
                    ${index === 0 || index === 2
                      ? "bg-primary text-black"
                      : "bg-gray text-white"}
                    ${index >= 2 ? "sm:col-span-2" : ""}
                  `}
                >
                  <h4 className="mb-3 font-body font-bold text-xl leading-tight">
                    {item.title}
                  </h4>
                  <p
                    className={`text-sm leading-relaxed font-normal ${
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