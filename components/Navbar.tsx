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
  const [scrolled, setScrolled] = useState(false);
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* ── DESKTOP NAVBAR ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 justify-center px-4 pt-4 hidden md:flex"
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
          <div
            className="absolute top-0 left-[10%] right-[10%] h-px pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.35) 60%, transparent)",
            }}
          />

          <nav className="flex items-center h-16 px-8 gap-12 rounded-2xl overflow-hidden">
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
        </div>
      </motion.header>

      {/* ── MOBILE TOPBAR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex md:hidden items-center justify-center px-5 transition-all duration-500"
        style={{
          height: scrolled ? "64px" : "80px",
          background: scrolled
            ? "rgba(13, 13, 11, 0.82)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(160%)" : "none",
          borderBottom: "none",
          boxShadow: scrolled
            ? "0 1px 0 rgba(255,255,255,0.04), 0 8px 32px 8px rgba(13,13,11,0.7)"
            : "none",
        }}
      >
        {/* Gradient fade bawah navbar */}
        {scrolled && (
          <div
            className="absolute left-0 right-0 pointer-events-none"
            style={{
              top: "100%",
              height: "32px",
              background: "linear-gradient(to bottom, rgba(13,13,11,0.55) 0%, transparent 100%)",
            }}
          />
        )}

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen((p) => !p)}
          className="absolute left-8 flex flex-col justify-center gap-[5px] w-8 h-8 focus:outline-none"
          aria-label="Open menu"
        >
          <span className="block h-[2px] w-6 bg-primary rounded-full" />
          <span className="block h-[2px] w-6 bg-primary rounded-full" />
          <span className="block h-[2px] w-6 bg-primary rounded-full" />
        </button>

        {/* Logo tengah */}
        <button type="button" onClick={() => scrollToSection("#home")}>
          <Image
            src="/photos/logo/DAVAN_Logo_2.png"
            alt="Davan"
            width={100}
            height={30}
            className="h-10 w-auto object-contain"
            priority
          />
        </button>
      </motion.div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-0 left-0 bottom-0 z-50 md:hidden flex flex-col"
              style={{
                width: "75%",
                background: "rgba(231, 230, 230, 0.29)",
                backdropFilter: "blur(32px) saturate(160%)",
                WebkitBackdropFilter: "blur(32px) saturate(160%)",
                borderRight: "1px solid rgba(227, 227, 227, 0.43)",
                borderRadius: "0 24px 24px 0",
              }}
            >
              {/* Glow accent kiri atas */}
              <div
                className="absolute top-0 left-0 w-px h-40 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, #c8f135 0%, transparent 100%)",
                  opacity: 0.4,
                }}
              />

              {/* Close button */}
              <div className="flex items-center px-6 pt-8 pb-2">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="relative flex items-center justify-center w-8 h-8 focus:outline-none"
                  aria-label="Close menu"
                >
                  <span
                    className="absolute block h-[2px] w-5 rounded-full"
                    style={{ background: "#c8f135", transform: "rotate(45deg)" }}
                  />
                  <span
                    className="absolute block h-[2px] w-5 rounded-full"
                    style={{ background: "#c8f135", transform: "rotate(-45deg)" }}
                  />
                </button>
              </div>

              {/* Logo */}
              <div className="px-6 pt-8 pb-10">
                <button type="button" onClick={() => scrollToSection("#home")}>
                  <Image
                    src="/photos/logo/DAVAN_Logo_2.png"
                    alt="Davan"
                    width={140}
                    height={42}
                    className="h-10 w-auto object-contain"
                    priority
                  />
                </button>
              </div>

              {/* Nav items */}
              <nav className="flex-1 flex flex-col px-6 gap-1">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -12, opacity: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <button
                        type="button"
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left py-3.5 font-body tracking-widest transition-colors duration-150"
                        style={{
                          fontSize: "clamp(1.3rem, 5vw, 1.7rem)",
                          fontWeight: isActive ? 700 : 400,
                          color: isActive ? "#c8f135" : "rgba(255,255,255,0.85)",
                        }}
                      >
                        {item.label}
                      </button>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}