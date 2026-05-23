"use client";

import Link from "next/link";
import { motion } from "motion/react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  target?: string;
};

export default function Button({
    href,
    children,
    target,
}: ButtonProps) {
    return (
        <motion.div
        className="inline-block"
        whileHover="hover"
        initial="initial">
            <Link
            href={href}
            target={target}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-primary px-6 py-3 text-white font-medium font-body bg-dark">
        <motion.span
            variants={{
            initial: {
                width: 0,
                height: 0,
            },
            hover: {
                width: 500,
                height: 500,
            },
            }}
            transition={{
            duration: 0.8,
            ease: "easeOut",
            }}
            className="
                absolute
                bottom-0
                left-1/2
                -translate-x-1/2
                translate-y-1/2
                rounded-full
                bg-primary"
        />
        <motion.span
            variants={{
            initial: {
                color: "#FFFFFF",
            },
            hover: {
                color: "#0F0F11",
            },
            }}
            transition={{
            duration: 0.25,
            }}
            className="relative z-10 flex items-center gap-2">
                {children}
        <motion.svg
            variants={{
                initial: {
                rotate: 0,
                x: 0,
                y: 0,
                color: "#E0FE08",
                },
                hover: {
                rotate: 8,
                x: 2,
                y: -2,
                color: "#0F0F11",
                },
            }}
            transition={{
                duration: 0.3,
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            >
            <path
                d="M7 17L17 7M17 7H8M17 7V16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            </motion.svg>
            </motion.span>
        </Link>
        </motion.div>
    );
}