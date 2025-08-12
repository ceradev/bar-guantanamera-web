import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

const specialties = [
  {
    title: "Pollo Asado Tradicional",
    description: "Jugoso y dorado, marinado con nuestra mezcla secreta de hierbas.",
    image: "/placeholder.svg?width=400&height=300",
    tag: "El Favorito",
  },
  {
    title: "Costillas a la Barbacoa",
    description: "Tiernas y sabrosas, se deshacen en la boca. ¡Imposible resistirse!",
    image: "/placeholder.svg?width=400&height=300",
    tag: "Para Chuparse los Dedos",
  },
  {
    title: "Patatas Asadas 'Guantanamera'",
    description: "El acompañamiento perfecto, crujientes por fuera y suaves por dentro.",
    image: "/placeholder.svg?width=400&height=300",
    tag: "La Guarnición Perfecta",
  },
]

export default function SpecialtiesSection() {
  return (
    <section id="menu" className="w-full scroll-mt-16 bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Nuestras Especialidades</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Hecho con ingredientes frescos y mucho cariño. El sabor de siempre, ahora en tu mesa.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {specialties.map((item) => (
            <Card
              key={item.title}
              className="group overflow-hidden rounded-xl border-gray-200 bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <CardHeader className="p-0">
                <div className="relative h-56 w-full">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    {item.tag}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-black">{item.title}</h3>
                <p className="mt-2 text-gray-700">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
