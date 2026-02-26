"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight, Sun, Moon } from "lucide-react"

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type Theme = "dark" | "light"

interface Tech {
  label: string
  darkColor: string
  darkBg: string
  lightColor: string
  lightBg: string
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  accentColor: string
  tech: Tech[]
  liveUrl: string
  githubUrl: string
  featured?: boolean
}

/* ─────────────────────────────────────────────────────────────
   THEME TOKENS
   dark  → rgb(21, 30, 49)
   light → #ffffff
───────────────────────────────────────────────────────────── */
const T = {
  dark: {
    sectionBg:      "rgb(21, 30, 49)",
    blobA:          "rgba(99,102,241,0.14)",
    blobB:          "rgba(16,185,129,0.1)",
    blobC:          "rgba(56,189,248,0.07)",
    dotColor:       "rgba(148,163,184,0.5)",
    dotOpacity:     0.025,
    eyebrowBg:      "rgba(99,102,241,0.12)",
    eyebrowBorder:  "rgba(99,102,241,0.3)",
    eyebrowColor:   "#818CF8",
    titleColor:     "rgba(236,242,255,0.97)",
    subtitleColor:  "rgba(148,163,184,0.75)",
    dividerColor:   "rgba(99,102,241,0.55)",
    cardBg:         "linear-gradient(160deg, rgba(30,42,65,0.98) 0%, rgba(18,27,48,0.99) 100%)",
    cardBorder:     "rgba(255,255,255,0.07)",
    cardShadow:     "0 4px 28px rgba(0,0,0,0.5)",
    cardTitleColor: "rgba(236,242,255,0.95)",
    cardDescColor:  "rgba(100,116,139,0.9)",
    cardDivider:    "rgba(255,255,255,0.06)",
    secBtnBg:       "rgba(255,255,255,0.05)",
    secBtnBorder:   "rgba(255,255,255,0.1)",
    secBtnColor:    "rgba(203,213,225,0.9)",
    ghBg:           "rgba(0,0,0,0.55)",
    ghBorder:       "rgba(255,255,255,0.15)",
    ghColor:        "#E2E8F0",
    toggleBg:       "rgba(255,255,255,0.07)",
    toggleBorder:   "rgba(255,255,255,0.13)",
    toggleColor:    "rgba(226,232,240,0.9)",
  },
  light: {
    sectionBg:      "#ffffff",
    blobA:          "rgba(99,102,241,0.07)",
    blobB:          "rgba(16,185,129,0.06)",
    blobC:          "rgba(56,189,248,0.05)",
    dotColor:       "rgba(99,102,241,0.25)",
    dotOpacity:     0.04,
    eyebrowBg:      "rgba(99,102,241,0.08)",
    eyebrowBorder:  "rgba(99,102,241,0.22)",
    eyebrowColor:   "#6366F1",
    titleColor:     "rgba(15,23,42,0.95)",
    subtitleColor:  "rgba(71,85,105,0.85)",
    dividerColor:   "rgba(99,102,241,0.4)",
    cardBg:         "linear-gradient(160deg, #ffffff 0%, #f8fafc 100%)",
    cardBorder:     "rgba(15,23,42,0.09)",
    cardShadow:     "0 4px 24px rgba(15,23,42,0.09)",
    cardTitleColor: "rgba(15,23,42,0.95)",
    cardDescColor:  "rgba(71,85,105,0.85)",
    cardDivider:    "rgba(15,23,42,0.07)",
    secBtnBg:       "rgba(15,23,42,0.04)",
    secBtnBorder:   "rgba(15,23,42,0.12)",
    secBtnColor:    "rgba(51,65,85,0.9)",
    ghBg:           "rgba(255,255,255,0.82)",
    ghBorder:       "rgba(0,0,0,0.1)",
    ghColor:        "#1E293B",
    toggleBg:       "rgba(15,23,42,0.06)",
    toggleBorder:   "rgba(15,23,42,0.13)",
    toggleColor:    "rgba(51,65,85,0.9)",
  },
}

/* ─────────────────────────────────────────────────────────────
   TECH DATA
───────────────────────────────────────────────────────────── */
const TECH: Record<string, Tech> = {
  React:      { label:"React",      darkColor:"#22D3EE", darkBg:"rgba(34,211,238,0.13)",  lightColor:"#0891B2", lightBg:"rgba(8,145,178,0.09)"   },
  "Next.js":  { label:"Next.js",    darkColor:"#A5B4FC", darkBg:"rgba(165,180,252,0.12)", lightColor:"#4F46E5", lightBg:"rgba(79,70,229,0.09)"   },
  TypeScript: { label:"TypeScript", darkColor:"#60A5FA", darkBg:"rgba(96,165,250,0.13)",  lightColor:"#1D4ED8", lightBg:"rgba(29,78,216,0.09)"   },
  Tailwind:   { label:"Tailwind",   darkColor:"#38BDF8", darkBg:"rgba(56,189,248,0.13)",  lightColor:"#0284C7", lightBg:"rgba(2,132,199,0.09)"   },
  "Node.js":  { label:"Node.js",    darkColor:"#4ADE80", darkBg:"rgba(74,222,128,0.12)",  lightColor:"#15803D", lightBg:"rgba(21,128,61,0.09)"   },
  MongoDB:    { label:"MongoDB",    darkColor:"#4ADE80", darkBg:"rgba(74,222,128,0.1)",   lightColor:"#166534", lightBg:"rgba(22,101,52,0.09)"   },
  PostgreSQL: { label:"PostgreSQL", darkColor:"#7DD3FC", darkBg:"rgba(125,211,252,0.12)", lightColor:"#0369A1", lightBg:"rgba(3,105,161,0.09)"   },
  Prisma:     { label:"Prisma",     darkColor:"#C4B5FD", darkBg:"rgba(196,181,253,0.12)", lightColor:"#6D28D9", lightBg:"rgba(109,40,217,0.09)"  },
  Stripe:     { label:"Stripe",     darkColor:"#818CF8", darkBg:"rgba(129,140,248,0.12)", lightColor:"#4338CA", lightBg:"rgba(67,56,202,0.09)"  },
  Redis:      { label:"Redis",      darkColor:"#FCA5A5", darkBg:"rgba(252,165,165,0.12)", lightColor:"#B91C1C", lightBg:"rgba(185,28,28,0.09)"  },
  OpenAI:     { label:"OpenAI",     darkColor:"#6EE7B7", darkBg:"rgba(110,231,183,0.12)", lightColor:"#047857", lightBg:"rgba(4,120,87,0.09)"   },
  Supabase:   { label:"Supabase",   darkColor:"#34D399", darkBg:"rgba(52,211,153,0.12)",  lightColor:"#059669", lightBg:"rgba(5,150,105,0.09)"  },
}

/* ─────────────────────────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "DevFlow — AI Code Review",
    description:
      "An intelligent code review platform using GPT-4 to analyse pull requests, detect bugs, suggest refactors, and enforce style guidelines in real time.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    accentColor: "#6366F1",
    tech: [TECH["Next.js"], TECH.TypeScript, TECH.OpenAI, TECH.Prisma],
    liveUrl: "#", githubUrl: "#", featured: true,
  },
  {
    id: 2,
    title: "ShopSphere — E-Commerce",
    description:
      "Full-stack e-commerce solution with real-time inventory, Stripe payments, admin dashboard, and multi-vendor support built for scale.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    accentColor: "#10B981",
    tech: [TECH.React, TECH["Node.js"], TECH.MongoDB, TECH.Stripe],
    liveUrl: "#", githubUrl: "#", featured: true,
  },
  {
    id: 3,
    title: "Pulse — Analytics SaaS",
    description:
      "Real-time web analytics dashboard with event tracking, funnel visualisation, and exportable reports — a privacy-first alternative to GA.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    accentColor: "#8B5CF6",
    tech: [TECH["Next.js"], TECH.PostgreSQL, TECH.Redis, TECH.Tailwind],
    liveUrl: "#", githubUrl: "#",
  },
  {
    id: 4,
    title: "Habitat — Real Estate App",
    description:
      "Property listing platform with map-based search, mortgage calculator, saved searches, and instant agent messaging powered by Supabase.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    accentColor: "#F59E0B",
    tech: [TECH.React, TECH.Supabase, TECH.TypeScript, TECH.Tailwind],
    liveUrl: "#", githubUrl: "#",
  },
  {
    id: 5,
    title: "Scribe — Markdown Blog CMS",
    description:
      "A headless CMS and blogging engine with MDX support, syntax highlighting, tag filtering, and a blazing-fast static-first architecture.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
    accentColor: "#F43F5E",
    tech: [TECH["Next.js"], TECH.TypeScript, TECH.Prisma, TECH.Tailwind],
    liveUrl: "#", githubUrl: "#",
  },
  {
    id: 6,
    title: "Nexus — Team Chat App",
    description:
      "Slack-inspired real-time team messaging app with channels, DMs, file sharing, reactions, and thread replies using WebSockets.",
    image: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80",
    accentColor: "#0EA5E9",
    tech: [TECH.React, TECH["Node.js"], TECH.MongoDB, TECH.Redis],
    liveUrl: "#", githubUrl: "#",
  },
]

/* ─────────────────────────────────────────────────────────────
   THEME TOGGLE BUTTON
───────────────────────────────────────────────────────────── */
function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  const tk = T[theme]
  const isDark = theme === "dark"

  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.93 }}
      className="fixed top-5 right-5 z-50 flex items-center gap-2.5 rounded-2xl px-4 py-2.5 text-sm font-semibold backdrop-blur-md select-none cursor-pointer"
      style={{
        background: tk.toggleBg,
        border: `1px solid ${tk.toggleBorder}`,
        color: tk.toggleColor,
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        transition: "background 0.35s, border-color 0.35s, color 0.35s",
      }}
      aria-label="Toggle colour theme"
    >
      {/* Icon swap */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{   rotate:  90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <Sun className="h-4 w-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate:  90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0,   opacity: 1, scale: 1   }}
            exit={{   rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <Moon className="h-4 w-4" />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Label swap */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, y: 6  }}
          animate={{ opacity: 1, y: 0  }}
          exit={{   opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

/* ─────────────────────────────────────────────────────────────
   TECH BADGE
───────────────────────────────────────────────────────────── */
function TechBadge({ tech, theme }: { tech: Tech; theme: Theme }) {
  const color = theme === "dark" ? tech.darkColor : tech.lightColor
  const bg    = theme === "dark" ? tech.darkBg    : tech.lightBg

  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -1.5 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide select-none cursor-default"
      style={{
        color,
        background: bg,
        border: `1px solid ${color}28`,
        transition: "color 0.3s, background 0.3s, border-color 0.3s",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: color, boxShadow: `0 0 4px ${color}` }}
      />
      {tech.label}
    </motion.span>
  )
}

/* ─────────────────────────────────────────────────────────────
   CARD BUTTON
───────────────────────────────────────────────────────────── */
function CardButton({
  href, icon: Icon, label, primary, accent, theme,
}: {
  href: string
  icon: React.ElementType
  label: string
  primary?: boolean
  accent: string
  theme: Theme
}) {
  const tk = T[theme]

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
      style={
        primary
          ? {
              background: accent,
              color: "#fff",
              boxShadow: `0 4px 16px ${accent}45`,
            }
          : {
              background: tk.secBtnBg,
              color: tk.secBtnColor,
              border: `1px solid ${tk.secBtnBorder}`,
              transition: "background 0.3s, color 0.3s, border-color 0.3s",
            }
      }
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </motion.a>
  )
}

/* ─────────────────────────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────────────────────────── */
function ProjectCard({
  project, index, theme,
}: {
  project: Project
  index: number
  theme: Theme
}) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  const tk     = T[theme]

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 52 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.11,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -7 }}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: tk.cardBg,
        border: `1px solid ${tk.cardBorder}`,
        boxShadow: tk.cardShadow,
        transition: "background 0.35s, border-color 0.35s, box-shadow 0.35s",
      }}
    >
      {/* Hover accent glow ring */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `inset 0 0 0 1.5px ${project.accentColor}50, 0 8px 48px ${project.accentColor}18`,
        }}
      />

      {/* ── Project image ──────────────────── */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <motion.img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Colour scrim */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${project.accentColor}28 0%, rgba(0,0,0,0.55) 100%)`,
          }}
        />

        {/* Featured pulse badge */}
        {project.featured && (
          <motion.div
            className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
            style={{
              background: `${project.accentColor}22`,
              border: `1px solid ${project.accentColor}55`,
              color: project.accentColor,
              backdropFilter: "blur(8px)",
            }}
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: project.accentColor,
                boxShadow: `0 0 5px ${project.accentColor}`,
              }}
            />
            Featured
          </motion.div>
        )}

        {/* GitHub icon (reveals on card hover) */}
        <motion.a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full opacity-0 group-hover:opacity-100"
          style={{
            background: tk.ghBg,
            border: `1px solid ${tk.ghBorder}`,
            color: tk.ghColor,
            backdropFilter: "blur(8px)",
            transition: "opacity 0.25s, background 0.3s, color 0.3s",
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`${project.title} on GitHub`}
        >
          <Github className="h-3.5 w-3.5" />
        </motion.a>
      </div>

      {/* ── Card body ──────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-3">

        {/* Title + arrow icon */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="font-bold text-base leading-snug tracking-tight"
            style={{
              color: tk.cardTitleColor,
              fontFamily: "'Syne', sans-serif",
              transition: "color 0.3s",
            }}
          >
            {project.title}
          </h3>
          <motion.div
            className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100"
            style={{
              background: `${project.accentColor}18`,
              color: project.accentColor,
              transition: "opacity 0.25s",
            }}
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.div>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: tk.cardDescColor, transition: "color 0.3s" }}
        >
          {project.description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {project.tech.map((t) => (
            <TechBadge key={t.label} tech={t} theme={theme} />
          ))}
        </div>

        {/* Thin divider */}
        <div
          className="w-full h-px mt-auto"
          style={{ background: tk.cardDivider, transition: "background 0.3s" }}
        />

        {/* CTA row */}
        <div className="flex items-center gap-2.5 pt-0.5">
          <CardButton
            href={project.liveUrl}
            icon={ExternalLink}
            label="Live Demo"
            primary
            accent={project.accentColor}
            theme={theme}
          />
          <CardButton
            href={project.githubUrl}
            icon={Github}
            label="GitHub"
            accent={project.accentColor}
            theme={theme}
          />
        </div>
      </div>
    </motion.article>
  )
}

/* ─────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────── */
function SectionHeader({ theme }: { theme: Theme }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const tk     = T[theme]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-16 relative"
    >
      {/* Ambient halo */}
      <div
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-72 h-24 opacity-50"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.28) 0%, transparent 70%)",
          filter: "blur(28px)",
        }}
      />

      {/* Eyebrow pill */}
      <motion.div
        className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-bold uppercase tracking-[0.2em]"
        style={{
          background: tk.eyebrowBg,
          border: `1px solid ${tk.eyebrowBorder}`,
          color: tk.eyebrowColor,
          transition: "background 0.35s, border-color 0.35s, color 0.35s",
        }}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: tk.eyebrowColor,
            boxShadow: `0 0 6px ${tk.eyebrowColor}`,
          }}
        />
        Portfolio
      </motion.div>

      {/* Main title */}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
        style={{
          color: tk.titleColor,
          fontFamily: "'Syne', sans-serif",
          lineHeight: 1.06,
          transition: "color 0.35s",
        }}
      >
        Featured{" "}
        <span
          style={{
            background: "linear-gradient(135deg, #818CF8 0%, #38BDF8 50%, #34D399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Projects
        </span>
      </h2>

      {/* Subtitle */}
      <p
        className="text-base md:text-lg max-w-xl mx-auto leading-relaxed"
        style={{ color: tk.subtitleColor, transition: "color 0.35s" }}
      >
        Some of my recent work — crafted with care, shipped with confidence.
      </p>

      {/* Gradient divider line */}
      <motion.div
        className="mx-auto mt-8 h-px w-24 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${tk.dividerColor}, transparent)`,
          transition: "background 0.35s",
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
      />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   VIEW ALL BUTTON
───────────────────────────────────────────────────────────── */
function ViewAllButton() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mt-14"
    >
      <motion.a
        href="#"
        whileHover={{ scale: 1.04, boxShadow: "0 0 36px rgba(99,102,241,0.4)" }}
        whileTap={{ scale: 0.97 }}
        className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-3.5 text-sm font-bold tracking-wide text-white"
        style={{
          background: "linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)",
          boxShadow: "0 4px 24px rgba(99,102,241,0.3)",
        }}
      >
        View All Projects
        <ArrowUpRight className="h-4 w-4" />
      </motion.a>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────────────────────── */
export default function FeaturedProjects() {
  const [theme, setTheme] = useState<Theme>("dark")
  const tk = T[theme]

  return (
    /**
     * `animate={{ backgroundColor }}` on the <section> drives the smooth
     * colour transition between rgb(21,30,49) [dark] and #ffffff [light].
     */
    <motion.section
      id="projects"
      className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      animate={{ backgroundColor: tk.sectionBg }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      {/* ── Dark / Light toggle (fixed top-right) ── */}
      <ThemeToggle
        theme={theme}
        onToggle={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
      />

      {/* ── Ambient blobs ── */}
      <motion.div
        className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full"
        animate={{ opacity: theme === "dark" ? 0.5 : 0.3 }}
        transition={{ duration: 0.45 }}
        style={{
          background: `radial-gradient(circle, ${tk.blobA} 0%, transparent 70%)`,
          filter: "blur(72px)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-40 -right-40 w-96 h-96 rounded-full"
        animate={{ opacity: theme === "dark" ? 0.5 : 0.3 }}
        transition={{ duration: 0.45 }}
        style={{
          background: `radial-gradient(circle, ${tk.blobB} 0%, transparent 70%)`,
          filter: "blur(72px)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-72 rounded-full"
        animate={{ opacity: theme === "dark" ? 0.25 : 0.15 }}
        transition={{ duration: 0.45 }}
        style={{
          background: `radial-gradient(ellipse, ${tk.blobC} 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* ── Dot grid ── */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: tk.dotOpacity }}
        transition={{ duration: 0.4 }}
        style={{
          backgroundImage: `radial-gradient(${tk.dotColor} 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Page content ── */}
      <div className="relative mx-auto max-w-6xl">
        <SectionHeader theme={theme} />

        {/* Responsive 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              theme={theme}
            />
          ))}
        </div>

        <ViewAllButton />
      </div>
    </motion.section>
  )
}
