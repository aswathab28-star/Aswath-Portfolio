"use client"

import { useFadeIn } from "@/hooks/use-fade-in"
import { Mail, Linkedin, Github, ArrowUpRight, MapPin, Send } from "lucide-react"
import { useState } from "react"

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "aswath@example.com",
    href: "mailto:aswath@example.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/aswath",
    href: "https://linkedin.com/in/aswath",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/aswath",
    href: "https://github.com/aswath",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "India",
    href: null,
  },
]

export function Contact() {
  const { ref, isVisible } = useFadeIn()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:aswath@example.com?subject=Portfolio Contact from ${formState.name}&body=${formState.message}`
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-16">
          <p className="text-[#10B981] text-sm font-semibold uppercase tracking-[0.2em] mb-3">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
            Get In Touch
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto leading-relaxed text-pretty">
            {"Whether you need a security audit, penetration test, or just want to discuss cybersecurity, I'd love to hear from you."}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Form */}
          <div className="rounded-xl border border-border bg-card p-7">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#10B981] focus:outline-none focus:ring-1 focus:ring-[#10B981] transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#10B981] focus:outline-none focus:ring-1 focus:ring-[#10B981] transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, message: e.target.value }))
                  }
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#10B981] focus:outline-none focus:ring-1 focus:ring-[#10B981] transition-colors resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#10B981] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:brightness-110 transition-all duration-300"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact cards */}
          <div className="flex flex-col gap-4">
            {contactLinks.map((link) => {
              const isLink = !!link.href
              const Tag = isLink ? "a" : "div"
              const linkProps = isLink
                ? {
                    href: link.href!,
                    target: "_blank" as const,
                    rel: "noopener noreferrer",
                  }
                : {}

              return (
                <Tag
                  key={link.label}
                  {...linkProps}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 hover:border-[#10B981]/30 hover:shadow-[0_0_20px_rgba(16,185,129,0.06)] transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10B981]/10 group-hover:bg-[#10B981]/15 transition-colors duration-300">
                      <link.icon className="h-5 w-5 text-[#10B981]" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {link.label}
                      </p>
                      <p className="text-foreground font-medium text-sm">
                        {link.value}
                      </p>
                    </div>
                  </div>
                  {isLink && (
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-[#10B981] transition-colors" />
                  )}
                </Tag>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
