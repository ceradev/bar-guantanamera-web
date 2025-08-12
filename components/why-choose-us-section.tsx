import { Heart, Leaf, Users } from "lucide-react"

const features = [
  {
    icon: <Heart className="h-8 w-8 text-red-600" />,
    title: "Receta Familiar",
    description:
      "Nuestro sabor único proviene de una receta que ha pasado de generación en generación, llena de tradición y amor.",
  },
  {
    icon: <Leaf className="h-8 w-8 text-red-600" />,
    title: "Ingredientes Frescos",
    description:
      "Seleccionamos a diario los mejores ingredientes locales para garantizar la máxima calidad y frescura en cada plato.",
  },
  {
    icon: <Users className="h-8 w-8 text-red-600" />,
    title: "Ambiente Acogedor",
    description:
      "Queremos que te sientas como en casa. Nuestro restaurante es un espacio familiar donde crear buenos recuerdos.",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-black">{feature.title}</h3>
              <p className="mt-2 text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
