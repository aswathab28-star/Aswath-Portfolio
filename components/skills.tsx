"use client"

import { useFadeIn } from "@/hooks/use-fade-in"
import {
  ShieldCheck,
  Bug,
  Network,
  Search,
  Globe,
  Terminal,
} from "lucide-react"

const skills = [
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    desc: "Comprehensive security assessments, risk management, and compliance strategies.",
    level: 90,
  },
  {
    icon: Bug,
    title: "Ethical Hacking",
    desc: "Authorized testing to discover and responsibly report security weaknesses.",
    level: 85,
  },
  {
    icon: Network,
    title: "Network Security",
    desc: "Designing and securing network infrastructure against intrusions.",
    level: 88,
  },
  {
    icon: Search,
    title: "Penetration Testing",
    desc: "Simulating real-world attacks to evaluate system resilience.",
    level: 92,
  },
  {
    icon: Globe,
    title: "Web Security",
    desc: "Protecting web apps from OWASP Top 10 vulnerabilities.",
    level: 87,
  },
  {
    icon: Terminal,
    title: "Security Tools",
    desc: "Expert in Kali Linux, Wireshark, Metasploit, Burp Suite, and more.",
    level: 90,
  },
]

const tools = [
  "Kali Linux",
  "Wireshark",
  "Metasploit",
  "Burp Suite",
  "Nmap",
  "John the Ripper",
  "Hashcat",
  "Nessus",
  "Ghidra",
  "OWASP ZAP",
  "Splunk",
  "Snort",
]

function SkillBar({ level, visible }: { level: number; visible: boolean }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-border/50 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#10B981] to-[#34D399] transition-all duration-1000 ease-out"
        style={{ width: visible ? `${level}%` : "0%" }}
      />
    </div>
  )
}

export function Skills() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="skills" className="py-24 px-6 bg-card/40">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-[#10B981] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Skills
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            What I Do Best
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              className="group rounded-xl border border-border bg-card p-6 hover:border-[#10B981]/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.06)] transition-all duration-300"
              style={{
                transitionDelay: isVisible ? `${i * 80}ms` : "0ms",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10B981]/10 group-hover:bg-[#10B981]/15 transition-colors duration-300">
                  <skill.icon className="h-5 w-5 text-[#10B981]" />
                </div>
                <span className="text-xs font-bold text-[#10B981] tabular-nums">
                  {skill.level}%
                </span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {skill.desc}
              </p>
              <SkillBar level={skill.level} visible={isVisible} />
            </div>
          ))}
        </div>

        {/* Tools */}
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Tools & Technologies
          </h3>
          <p className="text-sm text-muted-foreground">
            Technologies I work with daily
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5">
          {tools.map((tool) => (
            <span
              key={tool}
              className="rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-[#10B981]/40 hover:text-[#10B981] hover:bg-[#10B981]/5 transition-all duration-300 cursor-default"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
