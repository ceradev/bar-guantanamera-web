"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Phone, Navigation, Car, Train, Bus, Copy, ExternalLink } from "lucide-react"
import { motion, easeOut, useInView } from "framer-motion"
import { useRef, useState } from "react"

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
}

const mapVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeOut,
      delay: 0.2,
    },
  },
}

const infoVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
      delay: 0.4,
    },
  },
}

const transportOptions = [
  {
    icon: <Train className="w-5 h-5" />,
    name: "Metro",
    details: "Línea 1 - Estación Gran Vía (5 min a pie)",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <Bus className="w-5 h-5" />,
    name: "Autobús",
    details: "Líneas 1, 2, 46, 74, 146 - Parada Gran Vía",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <Car className="w-5 h-5" />,
    name: "Parking",
    details: "Parking público a 100m - Plaza del Carmen",
    color: "bg-purple-100 text-purple-600",
  },
]

const businessHours = [
  { day: "Lunes - Viernes", hours: "11:00 - 23:00", isToday: false },
  { day: "Sábados", hours: "12:00 - 24:00", isToday: false },
  { day: "Domingos", hours: "12:00 - 23:00", isToday: true },
]

export default function LocationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [copiedAddress, setCopiedAddress] = useState(false)

  const address = "Calle Falsa, 123, 28080 Madrid, España"

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopiedAddress(true)
      setTimeout(() => setCopiedAddress(false), 2000)
    } catch (err) {
      console.error("Failed to copy address:", err)
    }
  }

  const openInMaps = () => {
    const encodedAddress = encodeURIComponent(address)
    window.open(`https://www.google.com/maps/search/${encodedAddress}`, "_blank")
  }

  return (
    <section id="ubicacion" className="w-full scroll-mt-16 bg-gray-50 py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Enhanced Header */}
        <motion.div
          className="mb-16 text-center"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
            <MapPin className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-sm font-medium tracking-wide">UBICACIÓN</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
            Ven a <span className="text-red-600">Visitarnos</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed">
            Estamos ubicados en el corazón de Madrid, fácilmente accesible en transporte público y con opciones de
            aparcamiento cercanas. Te esperamos con los brazos abiertos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Map */}
          <motion.div
            className="lg:col-span-2"
            variants={mapVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Card className="overflow-hidden rounded-3xl border-0 shadow-xl hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-0 relative">
                <div className="relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.649499513813!2d-3.705789184604108!3d40.41677537936505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422880a0b0b0b1%3A0x4a4b0b0b0b0b0b0b!2sPlaza%20Mayor!5e0!3m2!1ses!2ses!4v1678886543210!5m2!1ses!2ses"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de ubicación del Restaurante Guantanamera"
                    className="rounded-3xl"
                  />

                  {/* Map Overlay with Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={openInMaps}
                      className="bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg border-0 rounded-full"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir en Maps
                    </Button>
                  </div>

                  {/* Custom Map Legend */}
                  <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-800">Guantanamera</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-600">Parking público</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Location Info */}
          <motion.div
            className="space-y-6"
            variants={infoVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Address Card */}
            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Dirección</h3>
                    <p className="text-gray-600 leading-relaxed">{address}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyAddress}
                    className="flex-1 rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    {copiedAddress ? "¡Copiado!" : "Copiar"}
                  </Button>
                  <Button
                    size="sm"
                    onClick={openInMaps}
                    className="flex-1 bg-red-600 text-white hover:bg-red-700 rounded-full"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Cómo llegar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Hours Card */}
            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Horarios</h3>
                </div>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-xl transition-colors ${
                        schedule.isToday ? "bg-green-50 border border-green-200" : "bg-gray-50"
                      }`}
                    >
                      <span className={`font-medium ${schedule.isToday ? "text-green-800" : "text-gray-700"}`}>
                        {schedule.day}
                      </span>
                      <span className={`font-semibold ${schedule.isToday ? "text-green-600" : "text-gray-900"}`}>
                        {schedule.hours}
                      </span>
                      {schedule.isToday && <Badge className="bg-green-600 text-white text-xs ml-2">Hoy</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="rounded-2xl border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900">Contacto</h3>
                </div>
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start rounded-xl border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    <a href="tel:922173039">
                      <Phone className="w-4 h-4 mr-3" />
                      922 173 039
                    </a>
                  </Button>
                  <Button asChild className="w-full bg-red-600 text-white hover:bg-red-700 rounded-xl">
                    <a href="#pedir">Hacer Pedido</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Transport Options */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-black mb-4">Cómo Llegar</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Múltiples opciones de transporte para que llegues fácilmente a nuestro restaurante
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {transportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Card className="rounded-2xl border-0 shadow-md hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      {option.icon}
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{option.name}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{option.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-4">¿Necesitas más información?</h3>
            <p className="text-gray-600 mb-6">
              Si tienes alguna duda sobre cómo llegar o necesitas indicaciones específicas, no dudes en contactarnos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
              >
                <a href="tel:922173039">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar
                </a>
              </Button>
              <Button asChild className="bg-red-600 text-white hover:bg-red-700 rounded-full">
                <a href="#pedir">Hacer Reserva</a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
