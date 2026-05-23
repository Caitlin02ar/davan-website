"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "WHY DAVAN", href: "#why-davan" },
  { label: "OUR SYSTEM", href: "#our-system" },
  { label: "ABOUT US", href: "#about-us" },
  { label: "RESULTS", href: "#results" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isScrolling = useRef(false);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    setActiveSection(id);
    setMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById(id);
      if (!section) return;

      isScrolling.current = true;

      const navbarHeight = 80;
      const top = section.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({ top, behavior: "smooth" });

      const handleScrollEnd = () => {
        isScrolling.current = false;
        window.removeEventListener("scrollend", handleScrollEnd);
      };

      if ("onscrollend" in window) {
        window.addEventListener("scrollend", handleScrollEnd, { once: true });
      } else {
        setTimeout(() => { isScrolling.current = false; }, 1200);
      }
    }, 320);
  };

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrolling.current) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4"
    >
      <div
        className="w-full max-w-4xl rounded-2xl relative"
        style={{
          background: "rgba(18, 18, 16, 0.45)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          boxShadow: `
            0 0 0 0.5px rgba(255,255,255,0.06) inset,
            0 1px 0 rgba(255,255,255,0.18) inset,
            0 -1px 0 rgba(255,255,255,0.04) inset,
            0 8px 32px rgba(0,0,0,0.5),
            0 2px 8px rgba(0,0,0,0.3)
          `,
        }}
      >
        {/* Top highlight line */}
        <div
          className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.35) 60%, transparent)",
          }}
        />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center h-16 px-8 gap-12 rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="flex-shrink-0"
          >
            <Image
              src="/photos/logo/DAVAN_Logo_2.png"
              alt="Davan"
              width={120}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </button>

          <ul className="flex items-center justify-between flex-1 font-body">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.href)}
                    className={`
                      relative font-body text-xs tracking-widest px-2 py-2 rounded-lg
                      transition-all duration-200 whitespace-nowrap
                      ${isActive
                        ? "text-primary font-bold"
                        : "text-white/70 hover:text-white hover:font-bold"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile top bar */}
        <div className="flex md:hidden items-center justify-between px-5 h-14 rounded-2xl">
          <button type="button" onClick={() => scrollToSection("#home")}>
            <Image
              src="/photos/logo/DAVAN_Logo_2.png"
              alt="Davan"
              width={100}
              height={30}
              className="h-8 w-auto object-contain"
              priority
            />
          </button>

          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="flex flex-col justify-center gap-[5px] w-8 h-8 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[2px] w-6 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-[2px] w-6 bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block h-[2px] w-6 bg-white rounded-full origin-center"
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden overflow-hidden rounded-b-2xl"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <motion.li
                    key={item.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.href)}
                      className={`
                        flex w-full items-center px-6 py-3.5 text-left
                        font-body text-xs tracking-widest
                        transition-colors duration-150
                        ${isActive
                          ? "text-primary font-bold"
                          : "text-white/60 hover:text-white"
                        }
                      `}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}