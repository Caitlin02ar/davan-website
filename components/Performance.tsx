"use client";

import Image from "next/image";
import Tag from "./Tag";
import { landingData } from "@/app/data/landing";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const BULLET_DOT = 0.3;
const BULLET_TITLE = 0.4;
const BULLET_GAP = 0.08;

export default function Performance() {
  const sectionRef = useRef<HTMLElement>(null);

  const lineRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const mobilePathRef = useRef<SVGPathElement>(null);
  const mobileDotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mobileTitleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const mobileDescRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const bullets = landingData.demonstrated.bullets;
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

      tl.fromTo(
        ".perf-tag",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.55 }
      );

      tl.fromTo(
        ".perf-heading",
        { autoAlpha: 0, x: -44 },
        { autoAlpha: 1, x: 0, duration: 0.6 },
        "-=0.25"
      );

      const bulletEls = section.querySelectorAll<HTMLElement>(".perf-bullet");

      bulletEls.forEach((bullet) => {
        const dot = bullet.querySelector<HTMLElement>(".perf-bullet-dot")!;
        const title = bullet.querySelector<HTMLElement>(".perf-bullet-title")!;
        const words = bullet.querySelectorAll<HTMLElement>(".perf-bullet-word");

        tl.fromTo(
          dot,
          { autoAlpha: 0, scale: 0 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: BULLET_DOT,
            ease: "back.out(2.5)",
          }
        );

        tl.fromTo(
          title,
          { autoAlpha: 0, x: -20 },
          { autoAlpha: 1, x: 0, duration: BULLET_TITLE },
          "-=0.05"
        );

        tl.fromTo(
          words,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.028 },
          "-=0.1"
        );

        tl.addLabel("bulletEnd", `+=${BULLET_GAP}`);
      });

      tl.fromTo(
        ".perf-fw-label",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.45 },
        "+=0.15"
      );

      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        autoAlpha: 0,
      });

      gsap.set(dotRefs.current, { autoAlpha: 0, scale: 0 });
      gsap.set(titleRefs.current, { autoAlpha: 0, y: 12 });
      gsap.set(descRefs.current, { autoAlpha: 0, y: 10 });

      if (mobilePathRef.current) {
        const length = mobilePathRef.current.getTotalLength();

        gsap.set(mobilePathRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
          autoAlpha: 1,
        });
      }

      gsap.set(mobileDotRefs.current, { autoAlpha: 0, scale: 0 });
      gsap.set(mobileTitleRefs.current, { autoAlpha: 0, y: 12 });
      gsap.set(mobileDescRefs.current, { autoAlpha: 0, y: 10 });

      framework.forEach((_, i) => {
        const progress = (i + 1) / framework.length;

        tl.to(
          lineRef.current,
          {
            autoAlpha: 1,
            scaleX: progress,
            duration: 0.75,
            ease: "power2.inOut",
          },
          i === 0 ? ">" : "-=0.05"
        );

        if (mobilePathRef.current) {
          const length = mobilePathRef.current.getTotalLength();

          tl.to(
            mobilePathRef.current,
            {
              strokeDashoffset: length - length * progress,
              duration: 0.75,
              ease: "power2.inOut",
            },
            "<"
          );
        }

        tl.to(
          [dotRefs.current[i], mobileDotRefs.current[i]],
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.32,
            ease: "back.out(2.5)",
          },
          "<0.55"
        );

        tl.to(
          [titleRefs.current[i], mobileTitleRefs.current[i]],
          { autoAlpha: 1, y: 0, duration: 0.38 },
          "<0.1"
        );

        tl.to(
          [descRefs.current[i], mobileDescRefs.current[i]],
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
      className="relative overflow-hidden bg-[#0F0F11] px-6 py-24 pb-0 md:pb-16">
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/photos/performance-bg.webp"
          alt=""
          fill
          priority
          className="object-cover object-[10%_center]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="grid items-start gap-20 md:grid-cols-[0.95fr_1.05fr]">
          <div>
            <motion.div
              className="perf-tag"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tag text="Demonstrated Performance" />
            </motion.div>

            <h1 className="perf-heading mt-8 max-w-5xl font-heading text-3xl uppercase leading-[1.5] text-primary md:text-[2rem]">
              {landingData.demonstrated.heading}
            </h1>
          </div>

          <div className="space-y-9 pt-3">
  {bullets.map((item, index) => (
    <div key={index} className="perf-bullet max-w-[420px]">
      <div className="grid grid-cols-[6px_1fr] gap-x-4">
        <span className="perf-bullet-dot mt-[7px] h-[6px] w-[6px] rounded-full bg-primary" />

        <h3 className="perf-bullet-title font-body text-[1.1rem] font-semibold leading-none tracking-normal text-white md:text-[1.2rem]">
          {item.title}
        </h3>

        <p className="col-span-2 mt-3 text-[0.95rem] font-light leading-[1.75] text-white md:text-[1rem]">
          {item.description.split(" ").map((word, wi) => (
            <span
              key={wi}
              className="perf-bullet-word inline-block"
              style={{ marginRight: "0.25em" }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  ))}
</div>
        </div>

        {/* FRAMEWORK */}
      <div className="relative -mx-6 mt-20 px-6 py-16 md:mx-0 md:px-0 md:py-0">
  {/* MOBILE BG ONLY */}
  <div className="absolute inset-0 md:hidden">
    <Image
      src="/photos/performance-bg.webp"
      alt=""
      fill
      className="object-cover object-[10%_center]"
    />
  </div>

  <div className="relative z-10">
    <h3 className="perf-fw-label mb-6 text-center font-body text-[1rem] font-semibold text-white">
      Project Framework
    </h3>

    {/* DESKTOP */}
    <div className="relative mx-auto hidden max-w-[860px] md:block">
      <div
        ref={lineRef}
        className="absolute left-0 top-[4px] h-px w-full origin-left bg-white/60"
        style={{ visibility: "hidden" }}
      />

      <div className="relative grid grid-cols-4">
        {framework.map((item, index) => (
          <div key={index} className="text-center">
            <span
              ref={(el) => {
                dotRefs.current[index] = el;
              }}
              className="mx-auto block h-[7px] w-[7px] rounded-full bg-primary"
            />

            <h4
              ref={(el) => {
                titleRefs.current[index] = el;
              }}
              className="mt-4 font-body text-[14px] font-semibold text-primary"
            >
              {item.title}
            </h4>

            <p
              ref={(el) => {
                descRefs.current[index] = el;
              }}
              className="mx-auto mt-1 text-[0.75rem] leading-[1.55] text-white"
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* MOBILE */}
<div className="relative mx-auto mt-10 block h-[320px] w-full max-w-[430px] md:hidden">
  <svg
    className="absolute inset-0 h-full w-full"
    viewBox="0 0 430 320"
    fill="none"
    preserveAspectRatio="none"
  >
    <path
      ref={mobilePathRef}
      d="M35 60 H395 V210 H35"
      stroke="rgba(255,255,255,0.55)"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    />
  </svg>

  <MobileFrameworkItem
    item={framework[0]}
    className="left-[32px] top-[52px]"
    index={0}
    dotRefs={mobileDotRefs}
    titleRefs={mobileTitleRefs}
    descRefs={mobileDescRefs}
  />

  <MobileFrameworkItem
    item={framework[1]}
    className="right-[32px] top-[52px]"
    index={1}
    dotRefs={mobileDotRefs}
    titleRefs={mobileTitleRefs}
    descRefs={mobileDescRefs}
  />

  <MobileFrameworkItem
    item={framework[3]}
    className="left-[32px] top-[202px]"
    index={3}
    dotRefs={mobileDotRefs}
    titleRefs={mobileTitleRefs}
    descRefs={mobileDescRefs}
  />

  <MobileFrameworkItem
    item={framework[2]}
    className="right-[32px] top-[202px]"
    index={2}
    dotRefs={mobileDotRefs}
    titleRefs={mobileTitleRefs}
    descRefs={mobileDescRefs}
  />
</div>
  </div>
</div>
      </div>
    </section>
  );
}

function MobileFrameworkItem({
  item,
  className,
  index,
  dotRefs,
  titleRefs,
  descRefs,
}: {
  item: {
    title: string;
    description: string;
  };
  className: string;
  index: number;
  dotRefs: React.MutableRefObject<(HTMLSpanElement | null)[]>;
  titleRefs: React.MutableRefObject<(HTMLHeadingElement | null)[]>;
  descRefs: React.MutableRefObject<(HTMLParagraphElement | null)[]>;
}) {
  return (
    <div className={`absolute z-10 w-[145px] text-center ${className}`}>
      <span
        ref={(el) => {
          dotRefs.current[index] = el;
        }}
        className="mx-auto mt-[4px] block h-[8px] w-[8px] rounded-full bg-primary"
      />

      <h4
        ref={(el) => {
          titleRefs.current[index] = el;
        }}
        className="mt-4 font-body text-[15px] font-semibold leading-none text-primary"
      >
        {item.title}
      </h4>

      <p
        ref={(el) => {
          descRefs.current[index] = el;
        }}
        className="mx-auto mt-2 max-w-[140px] text-[0.78rem] leading-[1.45] text-white"
      >
        {item.description}
      </p>
    </div>
  );
}