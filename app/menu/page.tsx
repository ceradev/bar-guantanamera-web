import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import PageHero from "@/components/common/page-hero"
import MenuBrowser from "@/components/sections/menu/menu-browser"
import InstagramSection from "@/components/common/instagram-section"

export const metadata = {
  title: "Menu | Guantanamera",
  description: "Explora nuestro menu completo de pollos asados, costillas, patas, guarniciones y mas.",
}

export default function MenuPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <PageHero
          image="/images/menu/hero-menu.jpg"
          imageAlt="Mesa con platos variados del restaurante"
          subtitle="Nuestra especialidad"
          titleWhite="MENU"
          titleRed="GUANTANAMERA"
          description="Disfruta de una experiencia gastronomica unica, desde nuestros clasicos hasta nuevas creaciones"
        />
        <MenuBrowser />
        <InstagramSection />
      </main>
      <SiteFooter />
    </div>
  )
}
