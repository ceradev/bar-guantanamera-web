import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import PageHero from "@/components/common/page-hero"
import AboutStory from "@/components/sections/about/about-story"
import AboutGallery from "@/components/sections/about/about-gallery"
import InstagramSection from "@/components/sections/instagram-section"
import ParallaxImageBand from "@/components/sections/about/parallax-image-band"

export const metadata = {
  title: "Sobre Nosotros | Guantanamera",
  description: "Conoce la historia de Bar Cafetería Guantanamera, más de 23 años de tradición culinaria en Tenerife.",
}

export default function SobreNosotrosPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          image="/images/about/about-hero.jpg"
          imageAlt="Interior del bar Guantanamera"
          subtitle="Donde empezó todo"
          titleWhite="NUESTRA"
          titleRed="HISTORIA"
          description="Tantos años de experiencia nos ha dado la oportunidad de brindaros el mejor servicio."
        />
        <AboutStory />
        {/* Full-width parallax image band */}
        <ParallaxImageBand
          src="/images/about/about-chicken.jpg"
          alt="Pollo asado recién hecho"
        />
        <AboutGallery />
        <InstagramSection />
      </main>
      <SiteFooter />
    </div>
  )
}
