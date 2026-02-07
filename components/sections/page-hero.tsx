import Image from "next/image"

interface PageHeroProps {
  image: string
  imageAlt: string
  subtitle: string
  titleWhite: string
  titleRed: string
  description: string
}

export default function PageHero({
  image,
  imageAlt,
  subtitle,
  titleWhite,
  titleRed,
  description,
}: PageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/50 to-foreground/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-sm md:text-base text-background/80 italic font-body mb-4">
          {subtitle}
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-background leading-none mb-2">
          {titleWhite}
        </h1>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-primary leading-none mb-6">
          {titleRed}
        </h1>
        <p className="text-sm md:text-base text-background/80 font-body max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  )
}
