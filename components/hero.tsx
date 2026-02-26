"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, Github, Linkedin, Mail, Download, Shield, Terminal, Lock, Wifi } from "lucide-react"
import GradientText from "@/components/GradientText"

const roles = [
  "Cyber Security Specialist",
  "Ethical Hacker",
  "Penetration Tester",
  "Security Researcher",
]

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(24px)"
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    })
  }, [])

  useEffect(() => {
    const current = roles[roleIndex]
    const speed = isDeleting ? 35 : 70

    if (!isDeleting && charIndex === current.length) {
      const timeout = setTimeout(() => setIsDeleting(true), 2200)
      return () => clearTimeout(timeout)
    }
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timeout = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1))
    }, speed)
    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  const displayedText = roles[roleIndex].slice(0, charIndex)

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      {/* Radial glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#10B981]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-[#10B981]/3 rounded-full blur-[100px] pointer-events-none" />

      <div
        ref={containerRef}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 pb-16"
      >
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/20 bg-[#10B981]/5 px-4 py-1.5 mb-6">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-xs font-medium text-[#10B981] tracking-wide">
                Available for hire
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-4 text-balance leading-[1.1]">
              {"Hi, I'm "}
              <GradientText
                colors={["#5227FF", "#FF9FFC", "#7d58f9"]}
                animationSpeed={4}
                showBorder={false}
                className="custom-class"
              >
                Aswath
              </GradientText>
            </h1>

            <div className="h-8 lg:h-10 flex items-center justify-center lg:justify-start mb-5">
              <span className="text-lg lg:text-2xl text-muted-foreground font-medium">
                {displayedText}
              </span>
              <span className="ml-0.5 inline-block w-[2px] h-5 lg:h-7 bg-[#10B981] animate-pulse" />
            </div>

            <p className="text-muted-foreground text-base lg:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed text-pretty">
              I identify vulnerabilities, secure systems, and protect digital
              assets. Passionate about keeping organizations safe from evolving
              cyber threats.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#10B981] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:brightness-110 transition-all duration-300"
              >
                <Mail className="h-4 w-4" />
                Get in Touch
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-[#10B981]/40 hover:text-[#10B981] transition-all duration-300"
              >
                View Projects
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:border-[#10B981]/40 hover:text-[#10B981] transition-all duration-300"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              {[
                { icon: Github, href: "https://github.com/aswath", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/aswath", label: "LinkedIn" },
                { icon: Mail, href: "mailto:aswath@example.com", label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground hover:border-[#10B981]/40 hover:text-[#10B981] hover:bg-[#10B981]/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="relative flex-shrink-0">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-[#10B981]/10 animate-[spin_20s_linear_infinite]">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-[#10B981]/40" />
                <div className="absolute bottom-4 right-4 h-1.5 w-1.5 rounded-full bg-[#10B981]/30" />
              </div>

              {/* Inner ring */}
              <div className="absolute inset-6 rounded-full border border-[#10B981]/10 animate-[spin_15s_linear_infinite_reverse]">
                <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-[#10B981]/30" />
              </div>

              {/* Center icon */}
              <div className="absolute inset-12 flex items-center justify-center rounded-full bg-[#10B981]/5 border border-[#10B981]/20 shadow-[0_0_60px_rgba(16,185,129,0.1)]">
                <Shield className="h-16 w-16 lg:h-20 lg:w-20 text-[#10B981]" />
              </div>

              {/* Floating badges */}
              <div className="absolute top-6 -right-2 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg animate-[float_3s_ease-in-out_infinite]">
                <Terminal className="h-4 w-4 text-[#10B981]" />
                <span className="text-xs font-medium text-foreground">Kali Linux</span>
              </div>

              <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg animate-[float_3s_ease-in-out_infinite_0.5s]">
                <Lock className="h-4 w-4 text-[#10B981]" />
                <span className="text-xs font-medium text-foreground">Pen Testing</span>
              </div>

              <div className="absolute bottom-6 right-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 shadow-lg animate-[float_3s_ease-in-out_infinite_1s]">
                <Wifi className="h-4 w-4 text-[#10B981]" />
                <span className="text-xs font-medium text-foreground">Network Sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-[#10B981] transition-colors"
            aria-label="Scroll to about section"
          >
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  )
}
