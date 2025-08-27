import PhotoGallery from "@/components/sections/photo-gallery"
import SiteHeader from "@/components/layout/site-header"
import BackToTopButton from "@/components/common/back-to-top-button"
import FloatingCallButton from "@/components/common/floating-call-button"
import CookieBanner from "@/components/common/cookie-banner"
import HeroSection from "@/components/sections/hero-section"
import MenuSection from "@/components/sections/menu-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import LocationSection from "@/components/sections/location-section"
import OrderSection from "@/components/sections/order-section"
import SiteFooter from "@/components/layout/site-footer"

export default function GuantanameraPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-gray-800">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />
        <MenuSection />
        <PhotoGallery />
        <TestimonialsSection />
        <LocationSection />
        <OrderSection />
      </main>

      <SiteFooter />
      <BackToTopButton />
      <FloatingCallButton />
      <CookieBanner />
    </div>
  )
}
