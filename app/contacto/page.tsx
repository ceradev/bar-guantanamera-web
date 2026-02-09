import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import PageHero from "@/components/common/page-hero"
import ContactContent from "@/components/sections/contact/contact-content"
import InstagramBanner from "@/components/common/instagram-banner"

export const metadata = {
  title: "Contacto | Guantanamera",
  description: "Contacta con Bar Cafeteria Guantanamera. Ubicados en C. Castro, 7, San Isidro, Santa Cruz de Tenerife.",
}

export default function ContactoPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          image="/images/contact/hero-contact.jpg"
          imageAlt="Fachada del restaurante Guantanamera"
          subtitle="Donde ubicarnos"
          titleWhite="VEN A"
          titleRed="VISITARNOS"
          description="Estamos ubicados en el corazon de San Isidro. Facilmente accesible en transporte publico y con opciones de aparcamiento cercanas."
        />
        <ContactContent />
        <InstagramBanner />
      </main>
      <SiteFooter />
    </div>
  )
}
