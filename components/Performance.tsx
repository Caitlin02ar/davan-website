"use client";

import Image from "next/image";
import Tag from "./Tag";
import { landingData } from "@/app/data/landing";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const BULLET_DOT   = 0.3;
const BULLET_TITLE = 0.4;
const BULLET_GAP   = 0.08;

export default function Performance() {
  const sectionRef   = useRef<HTMLElement>(null);
  const lineRef      = useRef<HTMLDivElement>(null);
  const dotRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRefs    = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs     = useRef<(HTMLParagraphElement | null)[]>([]);

  const bullets   = landingData.demonstrated.bullets;
  const framework = landingData.demonstrated.framework;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // 1. TAG
      tl.fromTo(".perf-tag",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.55 }
      );

      tl.fromTo(".perf-heading",
        { autoAlpha: 0, x: -44 },
        { autoAlpha: 1, x: 0, duration: 0.6 },
        "-=0.25"
      );

      const bulletEls = section.querySelectorAll<HTMLElement>(".perf-bullet");
      bulletEls.forEach((bullet) => {
        const dot   = bullet.querySelector<HTMLElement>(".perf-bullet-dot")!;
        const title = bullet.querySelector<HTMLElement>(".perf-bullet-title")!;
        const words = bullet.querySelectorAll<HTMLElement>(".perf-bullet-word");

        tl.fromTo(dot,
          { autoAlpha: 0, scale: 0 },
          { autoAlpha: 1, scale: 1, duration: BULLET_DOT, ease: "back.out(2.5)" }
        );
        tl.fromTo(title,
          { autoAlpha: 0, x: -20 },
          { autoAlpha: 1, x: 0, duration: BULLET_TITLE },
          "-=0.05"
        );
        tl.fromTo(words,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.028 },
          "-=0.1"
        );
        tl.addLabel("bulletEnd", `+=${BULLET_GAP}`);
      });

      // 4. FRAMEWORK LABEL
      tl.fromTo(".perf-fw-label",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.45 },
        "+=0.15"
      );

      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center", autoAlpha: 0 });
      gsap.set(dotRefs.current,   { autoAlpha: 0, scale: 0 });
      gsap.set(titleRefs.current, { autoAlpha: 0, y: 12 });
      gsap.set(descRefs.current,  { autoAlpha: 0, y: 10 });

      framework.forEach((_, i) => {
        const progress = (i + 1) / framework.length;

        tl.to(lineRef.current,
          { autoAlpha: 1, scaleX: progress, duration: 0.75, ease: "power2.inOut" },
          i === 0 ? ">" : "-=0.05"
        );

        tl.to(dotRefs.current[i],
          { autoAlpha: 1, scale: 1, duration: 0.32, ease: "back.out(2.5)" },
          "<0.55"
        );

        tl.to(titleRefs.current[i],
          { autoAlpha: 1, y: 0, duration: 0.38 },
          "<0.1"
        );

        tl.to(descRefs.current[i],
          { autoAlpha: 1, y: 0, duration: 0.38 },
          "<0.1"
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="results"
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-24"
    >
      <Image
        src="/photos/performance-bg.webp"
        alt=""
        fill
        priority
        className="object-cover object-[10%_center]"/>

      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="grid items-start gap-20 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <div className="perf-tag">
            <motion.div
              className="perf-tag"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}>
              <Tag text="Demonstrated Performance" />
            </motion.div>            
            </div>
            <h1 className="perf-heading mt-8 max-w-5xl font-heading text-3xl uppercase leading-[1.5] text-primary md:text-[2rem]">
              {landingData.demonstrated.heading}
            </h1>
          </div>

          <div className="space-y-9 pt-3">
            {bullets.map((item, index) => (
              <div key={index} className="perf-bullet max-w-[420px]">
                <div className="mb-2 flex items-start gap-3">
                  <span className="perf-bullet-dot mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-primary" />
                  <div>
                    <h3 className="perf-bullet-title font-body font-bold text-[15px] leading-none text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[0.875rem] leading-[1.75] text-white">
                      {item.description.split(" ").map((word, wi) => (
                        <span
                          key={wi}
                          className="perf-bullet-word inline-block"
                          style={{ marginRight: "0.25em" }}>
                          {word}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FRAMEWORK */}
        <div className="mt-20">
          <h3 className="perf-fw-label mb-6 text-center font-body font-semibold text-[1rem] text-white">
            Project Framework
          </h3>

          <div className="relative mx-auto max-w-[860px]">
            <div
              ref={lineRef}
              className="absolute left-0 top-[4px] h-px w-full origin-left bg-white/60"
              style={{ visibility: "hidden" }}
            />

            {/* Nodes */}
            <div className="relative grid grid-cols-4">
              {framework.map((item, index) => (
                <div key={index} className="text-center">
                  <span
                    ref={(el) => { dotRefs.current[index] = el; }}
                    className="mx-auto block h-[7px] w-[7px] rounded-full bg-primary"
                  />
                  <h4
                    ref={(el) => { titleRefs.current[index] = el; }}
                    className="mt-4 font-body font-semibold text-[14px] text-primary"
                  >
                    {item.title}
                  </h4>
                  <p
                    ref={(el) => { descRefs.current[index] = el; }}
                    className="mx-auto mt-1 text-[0.75rem] leading-[1.55] text-white"
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}