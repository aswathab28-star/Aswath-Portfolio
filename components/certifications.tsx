"use client"

import { useFadeIn } from "@/hooks/use-fade-in"
import { Award, ExternalLink } from "lucide-react"

const certifications = [
  {
    title: "Certified Ethical Hacker (CEH)",
    org: "EC-Council",
    year: "2024",
    credentialId: "CEH-XXXXX",
    link: "#",
  },
  {
    title: "CompTIA Security+",
    org: "CompTIA",
    year: "2023",
    credentialId: "COMP001XXXXXXX",
    link: "#",
  },
  {
    title: "OSCP",
    org: "Offensive Security",
    year: "2024",
    credentialId: "OS-XXXXX",
    link: "#",
  },
  {
    title: "CISSP",
    org: "ISC2",
    year: "2025",
    credentialId: "ISC2-XXXXX",
    link: "#",
  },
]

export function Certifications() {
  const { ref, isVisible } = useFadeIn()

  return (
    <section id="certifications" className="py-24 px-6 bg-card/40">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-[#10B981] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Certifications
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Professional Credentials
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {certifications.map((cert, i) => (
            <div
              key={cert.title}
              className="group rounded-xl border border-border bg-card p-6 hover:border-[#10B981]/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.06)] transition-all duration-300"
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#10B981]/10 group-hover:bg-[#10B981]/15 transition-colors duration-300">
                  <Award className="h-6 w-6 text-[#10B981]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 text-balance">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {cert.org}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-[#10B981] font-medium bg-[#10B981]/10 rounded-full px-3 py-1">
                      {cert.year}
                    </span>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-[#10B981] transition-colors"
                    >
                      Verify
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
