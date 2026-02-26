import { Shield, Github, Linkedin, Mail } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/aswath", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/aswath", label: "LinkedIn" },
  { icon: Mail, href: "mailto:aswath@example.com", label: "Email" },
]

export function Footer() {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="mx-auto max-w-6xl flex flex-col items-center gap-6">
        <a
          href="#home"
          className="flex items-center gap-2 text-foreground font-bold text-lg"
        >
          <Shield className="h-5 w-5 text-[#10B981]" />
          <span>
            Aswath<span className="text-[#10B981]">.</span>
          </span>
        </a>

        <div className="flex items-center gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:text-[#10B981] hover:bg-[#10B981]/10 transition-all duration-200"
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-1.5 text-sm text-muted-foreground">
          <p>{"Designed & built by Aswath"}</p>
          <span className="hidden sm:inline text-border">{"/"}</span>
          <p>{"© 2026 All rights reserved."}</p>
        </div>
      </div>
    </footer>
  )
}
