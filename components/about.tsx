"use client"

import { useFadeIn } from "@/hooks/use-fade-in"
import { Shield, Lock, Eye, Briefcase, GraduationCap, Award } from "lucide-react"

const stats = [
  { label: "Years Experience", value: "3+" },
  { label: "Projects Completed", value: "15+" },
  { label: "Certifications", value: "4" },
  { label: "Vulnerabilities Found", value: "50+" },
]

const focusAreas = [
  {
    icon: Shield,
    title: "Defensive Security",
    desc: "Building robust security architectures and implementing defense-in-depth strategies to protect critical infrastructure.",
  },
  {
    icon: Lock,
    title: "Offensive Security",
    desc: "Conducting penetration tests and red team operations to uncover vulnerabilities before adversaries do.",
  },
  {
    icon: Eye,
    title: "Threat Intelligence",
    desc: "Monitoring and analyzing emerging threats to stay ahead of adversaries and proactively defend systems.",
  },
]

const timeline = [
  {
    icon: Briefcase,
    title: "Security Analyst",
    org: "CyberShield Corp",
    period: "2023 - Present",
    desc: "Conducting penetration tests, vulnerability assessments, and security audits for enterprise clients.",
  },
  {
    icon: GraduationCap,
    title: "B.Tech in Computer Science",
    org: "University of Technology",
    period: "2019 - 2023",
    desc: "Specialized in cybersecurity and network defense. Active member of the university CTF team.",
  },
  {
    icon: Award,
    title: "Security Intern",
    org: "SecureNet Solutions",
    period: "2022 - 2023",
    desc: "Assisted in security assessments and learned enterprise security tooling and methodologies.",
  },
]

export function About() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="about" className="py-24 px-6">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-[#10B981] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Passionate About Cybersecurity
          </h2>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-foreground text-lg leading-relaxed mb-4">
            I am a dedicated cybersecurity professional with a passion for
            identifying and mitigating security threats. With hands-on
            experience in penetration testing, vulnerability assessment, and
            security auditing, I help organizations strengthen their digital
            defenses.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            My approach combines deep technical expertise with a strategic
            mindset, ensuring comprehensive security solutions that protect
            critical infrastructure and sensitive data from evolving cyber
            threats.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-6 text-center hover:border-[#10B981]/30 transition-colors duration-300"
            >
              <p className="text-3xl md:text-4xl font-bold text-[#10B981] mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Focus areas */}
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {focusAreas.map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-card p-6 hover:border-[#10B981]/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.06)] transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#10B981]/10 mb-5 group-hover:bg-[#10B981]/15 transition-colors duration-300">
                <item.icon className="h-6 w-6 text-[#10B981]" />
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="text-center mb-12">
          <p className="text-[#10B981] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Experience & Education
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
            My Journey
          </h2>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

          <div className="flex flex-col gap-8">
            {timeline.map((item, i) => (
              <div
                key={item.title}
                className="relative flex gap-5 pl-2"
                style={{
                  transitionDelay: isVisible ? `${i * 120}ms` : "0ms",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(12px)",
                  transitionProperty: "opacity, transform",
                  transitionDuration: "600ms",
                  transitionTimingFunction: "ease",
                }}
              >
                <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10B981]/10 border border-[#10B981]/20">
                  <item.icon className="h-5 w-5 text-[#10B981]" />
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <span className="text-xs text-[#10B981] font-medium bg-[#10B981]/10 rounded-full px-3 py-1 w-fit">
                      {item.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {item.org}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
