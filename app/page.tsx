import SiteHeader from "@/components/layout/site-header"
import SiteFooter from "@/components/layout/site-footer"
import HomeHero from "@/components/sections/home/home-hero"
import PopularDishes from "@/components/sections/home/popular-dishes"
import FlavorBento from "@/components/sections/home/flavor-bento"
import RecentNews from "@/components/sections/home/recent-news"
import InstagramBanner from "@/components/common/instagram-banner"

export default function HomePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <HomeHero />
        <PopularDishes />
        <FlavorBento />
        <RecentNews />
        <InstagramBanner />
      </main>
      <SiteFooter />
    </div>
  )
}
