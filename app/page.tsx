import PhotoGallery from "@/components/photo-gallery"
import SiteHeader from "@/components/site-header"
import BackToTopButton from "@/components/back-to-top-button"
import FloatingCallButton from "@/components/floating-call-button"
import HeroSection from "@/components/hero-section"
import MenuSection from "@/components/menu-section"
import WhyChooseUsSection from "@/components/why-choose-us-section"
import TestimonialsSection from "@/components/testimonials-section"
import LocationSection from "@/components/location-section"
import OrderSection from "@/components/order-section"
import SiteFooter from "@/components/site-footer"

export default function GuantanameraPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white text-gray-800">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />
        <MenuSection />
        <WhyChooseUsSection />
        <PhotoGallery />
        <TestimonialsSection />
        <LocationSection />
        <OrderSection />
      </main>

      <SiteFooter />
      <BackToTopButton />
      <FloatingCallButton />
    </div>
  )
}
