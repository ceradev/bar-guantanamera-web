import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import PageHero from "@/components/sections/page-hero"
import AboutStory from "@/components/sections/about/about-story"
import AboutGallery from "@/components/sections/about/about-gallery"
import InstagramSection from "@/components/sections/instagram-section"

export const metadata = {
  title: "Sobre Nosotros | Guantanamera",
  description: "Conoce la historia de Bar Cafeteria Guantanamera, mas de 23 anos de tradicion culinaria en Tenerife.",
}

export default function SobreNosotrosPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          image="/images/hero-about.jpg"
          imageAlt="Interior del bar Guantanamera"
          subtitle="Donde empezo todo"
          titleWhite="NUESTRA"
          titleRed="HISTORIA"
          description="Tantos anos de experiencia nos ha dado la oportunidad de brindaros el mejor servicio."
        />
        <AboutStory />
        {/* Full-width image band */}
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
          <img
            src="/images/about-bread.jpg"
            alt="Pan y reposteria artesanal"
            className="w-full h-full object-cover"
          />
        </section>
        <AboutGallery />
        <InstagramSection />
      </main>
      <SiteFooter />
    </div>
  )
}
