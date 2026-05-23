"use client";

import { motion } from "motion/react";
import Tag from "./Tag";
import { landingData } from "@/app/data/landing";

const ease = [0.22, 1, 0.36, 1] as const;

// Calculate leftFinishDelay based on actual sequential delays
const leftFinishDelay = landingData.vision.info.reduce((acc, item, index) => {
  const prevWords = landingData.vision.info
    .slice(0, index)
    .reduce((a, it) => a + it.description.split(" ").length, 0);
  const baseDelay = index * 0.15 + prevWords * 0.045;
  const wordCount = item.description.split(" ").length;
  const itemFinish = baseDelay + 0.15 + (wordCount - 1) * 0.045 + 0.5;
  return Math.max(acc, itemFinish);
}, 0);

export default function About() {
  return (
    <main id="about-us" className="px-6 py-24 bg-dark">
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-start gap-4">

          <motion.div
            initial={{ y: 16, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease }}
          >
            <Tag text={landingData.vision.tag} />
          </motion.div>

          <h1 className="max-w-3xl font-heading text-1xl uppercase leading-[1.15] tracking-tight md:text-4xl">
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.0, ease, delay: 0.1 }}
              >
                {landingData.vision.heading}
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="block text-primary"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.0, ease, delay: 0.28 }}
              >
                {landingData.vision.headingColor}
              </motion.span>
            </div>
          </h1>
        </div>

        <div className="mt-16 grid grid-cols-[0.75fr_auto_1.6fr] gap-8">

          {/* KIRI — single viewport trigger, all children animate via variants */}
          <motion.div
            className="flex flex-col gap-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {landingData.vision.info.map((item, index) => {
              // baseDelay accounts for all words of all previous items
              const prevWords = landingData.vision.info
                .slice(0, index)
                .reduce((acc, it) => acc + it.description.split(" ").length, 0);
              const baseDelay = index * 0.15 + prevWords * 0.045;

              return (
                <div key={index} className="max-w-[240px]">
                  <motion.h3
                    className="font-body text-[1.2rem] uppercase text-primary font-semibold mb-2"
                    variants={{
                      hidden: { x: -35, opacity: 0 },
                      show: {
                        x: 0,
                        opacity: 1,
                        transition: { duration: 0.95, ease, delay: baseDelay },
                      },
                    }}
                  >
                    {item.title}
                  </motion.h3>

                  <p className="text-sm leading-[1.8] text-white font-light">
                    {item.description.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="mr-1 inline-block"
                        variants={{
                          hidden: { y: 14, opacity: 0 },
                          show: {
                            y: 0,
                            opacity: 1,
                            transition: {
                              duration: 0.5,
                              ease,
                              delay: baseDelay + 0.15 + i * 0.045,
                            },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* LINE */}
          <div className="flex items-stretch">
            <motion.div
              className="w-px bg-primary"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease, delay: leftFinishDelay }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* BENTO */}
          <div>
            <div className="overflow-hidden mb-5">
              <motion.h3
                className="font-body text-[1.2rem] uppercase text-primary font-semibold"
                initial={{ x: -35, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.95, ease, delay: leftFinishDelay + 0.6 }}
              >
                {landingData.vision.headingBento}
              </motion.h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {landingData.vision.bento.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.9,
                    ease,
                    delay: leftFinishDelay + 0.75 + index * 0.18,
                  }}
                  className={`
                    rounded-2xl px-6 py-7
                    ${index === 0 || index === 2
                      ? "bg-primary text-black"
                      : "bg-gray text-white"}
                    ${index >= 2 ? "col-span-2" : ""}
                  `}
                >
                  <h4 className="mb-3 font-body font-bold text-xl leading-tight">
                    {item.title}
                  </h4>
                  <p className={`text-sm leading-relaxed font-normal ${
                    index === 0 || index === 2 ? "text-black" : "text-white"
                  }`}>
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