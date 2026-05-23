"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Tag from "./Tag";
import Button from "./Button";
import { landingData } from "@/app/data/landing";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CTA() {
  const data = landingData.cta;
  return (
    <section id="contact" className="flex items-center relative min-h-screen overflow-hidden bg-black text-white">
      <Image
        src="/photos/Contact and Footer.webp"
        alt=""
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1100px] items-center px-6 py-16">
        <div className="grid w-full grid-cols-1 items-start gap-12 md:grid-cols-[1fr_0.75fr] md:items-center md:gap-16">

          {/* LEFT */}
          <div>
            <div className="mb-5">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 3, ease }}
              >
                <Tag text={data.button} />
              </motion.div>
            </div>

            <div className="overflow-hidden">
              <motion.h2
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease }}
                className="font-heading text-[32px] font-black uppercase leading-[1.2] sm:text-[42px] md:text-[48px]"
              >
                <span className="block text-primary">{data.headingColor}</span>
                <span className="block text-white">THE GAPS IN</span>
                <span className="block text-white">YOUR GROWTH</span>
              </motion.h2>
            </div>

            <p className="mt-4 max-w-2xl text-[0.9rem] leading-relaxed text-white md:text-[1rem]">
              {data.subheading.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 18, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.9 + index * 0.08,
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

          {/* RIGHT */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.22,
                  delayChildren: 0.3,
                },
              },
            }}
            className="flex flex-col items-start gap-1 md:items-end md:mt-44"
          >
            <RightReveal>
              <p className="mb-3 text-[1rem] font-bold text-primary">
                {data.contact}
              </p>
            </RightReveal>

            <div className="text-[0.9rem] text-white md:text-[1rem]">
              <ContactRow type="location" text={data.location} />
              <ContactRow type="email" text={data.email} />
            </div>

            <RightReveal className="mt-5">
              <Button
                href={`mailto:team@davan.digital?subject=Project%20Inquiry&body=Hello%20Davan%20Team,%0D%0A%0D%0AI'm%20interested%20in%20working%20with%20your%20team.%20Would%20love%20to%20discuss%20further.%0D%0A`}
              >
                {data.button}
              </Button>
            </RightReveal>

            <RightReveal className="mt-8 md:mt-24">
              <p className="text-[0.625rem] text-white">{landingData.copyright}</p>
            </RightReveal>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function RightReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { x: 45, opacity: 0 },
        show: {
          x: 0,
          opacity: 1,
          transition: { duration: 0.9, ease },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ContactRow({
  type,
  text,
}: {
  type: "location" | "email";
  text: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="flex items-center justify-start gap-3 md:justify-end"
    >
      <motion.span
        variants={{
          hidden: { x: 28, opacity: 0 },
          show: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.75, ease },
          },
        }}
        className="md:order-2 text-primary"
      >
        {type === "location" ? <PinIcon /> : <MailIcon />}
      </motion.span>

      <motion.span
        variants={{
          hidden: { x: 45, opacity: 0 },
          show: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.85, ease },
          },
        }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
}

function PinIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 12.2a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}