import { Button } from "@/components/ui/button"
import { ShoppingBag, Bike, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="w-full bg-white">
      <div className="container mx-auto grid items-center gap-8 px-4 py-12 md:grid-cols-2 md:gap-12 md:py-24 lg:py-32">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl md:text-6xl">
            El Sabor que te Hace Sentir en Casa
          </h1>
          <p className="mx-auto max-w-xl text-lg text-gray-700 md:mx-0">
            Especialistas en pollos asados, costillas y patatas con la receta tradicional que nos define.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-start">
            <Button
              size="lg"
              asChild
              className="w-full bg-red-600 text-white shadow-lg shadow-red-500/30 hover:bg-red-700 md:w-auto"
            >
              <a href="#menu">
                Ver el Menú <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <div className="flex w-full gap-4 md:w-auto">
              <Button size="lg" variant="outline" className="w-full border-gray-300 bg-transparent text-black" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="mr-2 h-5 w-5" /> Uber Eats
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full border-gray-300 bg-transparent text-black" asChild>
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Bike className="mr-2 h-5 w-5" /> Glovo
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-2xl md:h-auto md:aspect-[4/3]">
          <Image
            src="/placeholder.svg?width=800&height=600"
            alt="Plato de pollo asado y costillas"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  )
}
