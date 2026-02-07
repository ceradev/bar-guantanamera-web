import Image from "next/image"

const stats = [
  { value: "23+", label: "ANOS" },
  { value: "30+", label: "PLATOS" },
  { value: "4.3", label: "VALORACION" },
]

export default function AboutStory() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-secondary">
            <Image
              src="/images/about-restaurant.jpg"
              alt="Interior del Bar Guantanamera"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Text */}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
              QUIENES SOMOS
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
              {"Tradicion Canaria con un "}
              <span className="text-primary">Enfoque Moderno</span>
            </h2>

            <div className="mt-6 flex flex-col gap-4 text-muted-foreground font-body leading-relaxed">
              <p>
                {"Desde hace mas de 20 anos, Bar Cafeteria Guantanamera ha sido un punto de encuentro en Tenerife para quienes buscan el sabor autentico de la cocina casera. Lo que comenzo como un sueno familiar se ha consolidado gracias a nuestras recetas propias y al respeto por el producto local."}
              </p>
              <p>
                {"Hoy evolucionamos para estar mas cerca de ti. Combinamos nuestra maestria en platos iconicos como los pollos, costillas y la pata asada con una plataforma digital disenada para que disfrutes de nuestra esencia con la maxima comodidad."}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10 border-t border-border pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
