"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BUSINESS_HOURS } from "@/data/business-hours"

const contactInfo = [
  {
    icon: MapPin,
    title: "Ubicacion",
    lines: ["C. Castro, 7, 38611", "San Isidro, Santa Cruz", "de Tenerife"],
  },
  {
    icon: Phone,
    title: "Telefono",
    lines: ["+34 922 17 30 39"],
    href: "tel:+34922173039",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["guantanamera.contact@gmail.com"],
    href: "mailto:guantanamera.contact@gmail.com",
  },
]

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/guantanamera.bar", label: "Instagram" },
  { icon: Music, href: "https://tiktok.com", label: "TikTok" },
]

export default function ContactContent() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic here
  }

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column */}
          <div>
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
              {contactInfo.map((info) => {
                const Icon = info.icon
                const Wrapper = info.href ? "a" : "div"
                const wrapperProps = info.href
                  ? { href: info.href, target: info.href.startsWith("mailto") ? undefined : undefined }
                  : {}

                return (
                  <Wrapper
                    key={info.title}
                    {...wrapperProps}
                    className="flex flex-col items-center text-center p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
                  >
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm mb-2">
                      {info.title}
                    </h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-xs text-muted-foreground font-body">
                        {line}
                      </p>
                    ))}
                  </Wrapper>
                )
              })}
            </div>

            {/* Contact Form */}
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                PONTE EN CONTACTO
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Envianos un mensaje
              </h2>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-8">
                {"Cualquier duda que tengas respecto a nuestro menu, quieras hacer un encargo personalizado, o simplemente decirnos hola, nos encantaria escucharlo de ustedes"}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-border rounded-lg bg-secondary/30 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Your Email
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-border rounded-lg bg-secondary/30 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+34 000 00 00 00"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, phone: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-border rounded-lg bg-secondary/30 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Subject
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, subject: e.target.value }))
                      }
                      className="w-full px-4 py-3 border border-border rounded-lg bg-secondary/30 text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    >
                      <option>General Inquiry</option>
                      <option>Encargo especial</option>
                      <option>Reserva</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    placeholder="How can we help you?"
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg bg-secondary/30 text-foreground text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide rounded-sm px-8 self-start"
                  size="lg"
                >
                  ENVIAR MENSAJE
                </Button>
              </form>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            {/* Google Map */}
            <div className="rounded-xl overflow-hidden border border-border bg-secondary h-[350px] md:h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3510.867!2d-16.3913!3d28.0521!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc6a9f7b0c0a0a0a%3A0x0!2sC.%20Castro%2C%207%2C%2038611%20San%20Isidro!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicacion de Guantanamera en Google Maps"
              />
            </div>

            {/* Business Hours */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Horario
              </h3>
              <div className="flex flex-col gap-3">
                {BUSINESS_HOURS.map((schedule) => (
                  <div
                    key={schedule.dayLabel}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-sm text-muted-foreground font-body">
                      {schedule.dayLabel}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        schedule.hours === "Cerrado"
                          ? "text-primary"
                          : "text-primary"
                      }`}
                    >
                      {schedule.hours}
                    </span>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm font-bold text-foreground mb-3">
                  {"Siguenos"}
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                        aria-label={social.label}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
