import Image from "next/image"

export default function PhotoGallery() {
  const images = [
    { src: "/placeholder.svg?width=600&height=400", alt: "Pollo asado jugoso", className: "md:col-span-2" },
    { src: "/placeholder.svg?width=400&height=400", alt: "Interior del restaurante" },
    { src: "/placeholder.svg?width=400&height=400", alt: "Clientes disfrutando" },
    { src: "/placeholder.svg?width=600&height=400", alt: "Costillas asadas", className: "md:col-span-2" },
  ]

  return (
    <section id="galeria" className="w-full scroll-mt-16 bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Un Vistazo a Guantanamera</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Nuestros sabores, nuestro local y los buenos momentos que compartimos.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative h-48 w-full overflow-hidden rounded-xl shadow-md md:h-64 ${image.className}`}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-4 left-4 text-sm font-bold text-white md:text-lg">{image.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
