"use client";
 
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
 
// ─── Helper: parse **bold** markers into <strong> ───────────────────────────
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
 
// ─── Component ───────────────────────────────────────────────────────────────
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
      <div className="h-[430px] w-[340px] overflow-hidden rounded-2xl border border-white/[0.18] bg-gradient-to-br from-white/[0.13] via-white/[0.05] to-white/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-md" />
    );
  }
 
  return (
    <div className="flex min-h-[430px] w-[340px] flex-col overflow-hidden rounded-2xl bg-primary px-7 py-6 text-dark shadow-[0_25px_80px_rgba(0,0,0,0.55)]">
      <div className="flex items-center justify-between gap-6">
        <h3 className="font-heading text-[44px] leading-none">{number}</h3>
        <p className="max-w-[130px] text-right text-[0.675rem] leading-tight">
          {title}
        </p>
      </div>
 
      <h2 className="mt-8 text-left font-heading text-[25px] leading-[1.1] max-w-[230px]">
        {heading}
      </h2>
 
      {subheading && (
        <p className="mt-5 text-left text-[1rem] font-normal leading-[1.45]">
          <BoldText text={subheading} />
        </p>
      )}
 
      {description && (
        <p className="mt-5 text-left text-[1rem] leading-[1.5] text-dark">
          <BoldText text={description} />
        </p>
      )}
 
      {info && (
        <p className="pt-5 text-left text-[0.775rem] leading-[1.5] text-dark">
          <BoldText text={info} />
        </p>
      )}
 
      {dropdown && (
        <div className="mt-6 flex flex-col gap-2">
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
                  className="flex w-full items-center justify-between rounded-md bg-dark px-3 py-2 text-left text-[0.875rem] font-semibold text-white"
                >
                  <span>{item.title}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0"
                  >
                    <ChevronDown size={13} />
                  </motion.span>
                </button>
 
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0, y: -4 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -4 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden px-1 pt-2 text-left text-[0.75rem] leading-[1.4] text-dark"
                    >
                      {item.description}
                    </motion.p>
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
 