"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

type DropdownItem = {
  title: string;
  description: string;
};

type PillarCardProps = {
  number: string;
  title: string;
  heading: string;
  description?: string;
  info?: string;
  subheading?: string;
  dropdown?: DropdownItem[];
  isActive?: boolean;
};

const CARD_HEIGHT = "min-h-[620px] md:min-h-[620px]";
const CARD_WIDTH = "w-[88vw] max-w-[380px]";

export default function PillarCard({
  number,
  title,
  heading,
  description,
  info,
  subheading,
  dropdown,
  isActive = false,
}: PillarCardProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!isActive) {
    return (
      <div
        className={`
          ${CARD_HEIGHT}
          ${CARD_WIDTH}
          overflow-hidden
          rounded-[24px]
          border border-white/[0.18]
          bg-gradient-to-br
          from-white/[0.13]
          via-white/[0.05]
          to-white/[0.03]
          shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_20px_60px_rgba(0,0,0,0.6)]
          backdrop-blur-md
        `}
      />
    );
  }

  return (
    <div
      className={`
        flex
        ${CARD_HEIGHT}
        ${CARD_WIDTH}
        flex-col
        overflow-y-auto
        rounded-[24px]
        bg-primary
        px-5
        py-5
        text-dark
        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden

        pb-24
        md:px-7
        md:py-6
        md:pb-6
      `}
    >
      {/* TOP */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="shrink-0 font-heading text-[0.95rem] leading-none md:text-[44px]">
          {number}
        </h3>

        <p className="shrink-0 whitespace-nowrap text-right text-[0.8rem] leading-tight md:text-[0.675rem]">
          {title}
        </p>
      </div>

      {/* HEADING */}
      <h2 className="mt-6 max-w-[92%] text-left font-heading text-[1.65rem] leading-[1.5] md:mt-8 md:max-w-[280px] md:text-[2rem]">
        {heading}
      </h2>

      {/* SUBHEADING */}
      {subheading && (
        <p className="md:mt-4 mt-6 text-left text-[1.2rem] font-normal leading-[1.55] md:mt-5 md:text-[1rem]">
          <BoldText text={subheading} />
        </p>
      )}

      {/* DESCRIPTION */}
      {description && (
        <p className="mt-4 text-left text-[0.95rem] leading-[1.65] text-dark md:mt-5 md:text-[1rem]">
          <BoldText text={description} />
        </p>
      )}

      {/* INFO */}
      {info && (
        <p className="pt-4 text-left text-[0.78rem] leading-[1.65] text-dark md:pt-5">
          <BoldText text={info} />
        </p>
      )}

      {/* DROPDOWN */}
      {dropdown && (
        <div className="mt-6 flex flex-col gap-3">
          {dropdown.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenIndex(isOpen ? null : index);
                  }}
                  className="
                    flex
                    w-full
                    items-center
                    justify-between
                    rounded-xl
                    bg-dark
                    px-4
                    py-3
                    text-left
                    text-[1rem]
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:opacity-95
                    md:text-[0.8rem]
                  "
                >
                  <span>{item.title}</span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={14} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -4 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -4 }}
                      transition={{
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className="overflow-hidden"
                    >
                      <p
                        className="
                          px-2
                          pt-3
                          text-left
                          text-[0.9rem]
                          leading-[1.6]
                          text-dark
                          md:text-[0.8rem]
                        "
                      >
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}