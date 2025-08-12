"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Star } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

const menuCategories = {
  pollos: {
    title: "Pollos Asados",
    items: [
      {
        name: "Pollo Entero Tradicional",
        description: "Pollo entero asado con nuestra mezcla secreta de especias",
        price: "12.50€",
        image: "/placeholder.svg?width=300&height=200",
        popular: true,
      },
      {
        name: "Medio Pollo",
        description: "Media ración perfecta para una persona",
        price: "7.50€",
        image: "/placeholder.svg?width=300&height=200",
      },
      {
        name: "Cuarto de Pollo",
        description: "Cuarto de pollo con patatas asadas",
        price: "5.50€",
        image: "/placeholder.svg?width=300&height=200",
      },
    ],
  },
  costillas: {
    title: "Costillas",
    items: [
      {
        name: "Costillas BBQ",
        description: "Costillas de cerdo con salsa barbacoa casera",
        price: "15.90€",
        image: "/placeholder.svg?width=300&height=200",
        popular: true,
      },
      {
        name: "Costillas al Horno",
        description: "Costillas tiernas al horno con hierbas aromáticas",
        price: "14.50€",
        image: "/placeholder.svg?width=300&height=200",
      },
    ],
  },
  acompañamientos: {
    title: "Acompañamientos",
    items: [
      {
        name: "Patatas Asadas 'Guantanamera'",
        description: "Patatas cortadas a mano y asadas con romero",
        price: "4.50€",
        image: "/placeholder.svg?width=300&height=200",
        popular: true,
      },
      {
        name: "Ensalada Mixta",
        description: "Lechuga, tomate, cebolla y aceitunas",
        price: "3.90€",
        image: "/placeholder.svg?width=300&height=200",
      },
      {
        name: "Pimientos Asados",
        description: "Pimientos rojos asados con ajo y perejil",
        price: "4.20€",
        image: "/placeholder.svg?width=300&height=200",
      },
    ],
  },
  bebidas: {
    title: "Bebidas",
    items: [
      {
        name: "Cerveza Estrella Galicia",
        description: "Cerveza rubia de barril (caña)",
        price: "2.50€",
        image: "/placeholder.svg?width=300&height=200",
      },
      {
        name: "Vino de la Casa",
        description: "Vino tinto o blanco (copa)",
        price: "3.20€",
        image: "/placeholder.svg?width=300&height=200",
      },
      {
        name: "Refrescos",
        description: "Coca-Cola, Fanta, Sprite (lata)",
        price: "2.80€",
        image: "/placeholder.svg?width=300&height=200",
      },
    ],
  },
  postres: {
    title: "Postres",
    items: [
      {
        name: "Flan Casero",
        description: "Flan tradicional hecho en casa",
        price: "4.50€",
        image: "/placeholder.svg?width=300&height=200",
      },
      {
        name: "Tarta de Queso",
        description: "Tarta de queso con mermelada de frutos rojos",
        price: "5.20€",
        image: "/placeholder.svg?width=300&height=200",
      },
      {
        name: "Helado Artesanal",
        description: "Helado de vainilla, chocolate o fresa",
        price: "3.80€",
        image: "/placeholder.svg?width=300&height=200",
      },
    ],
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

export default function MenuSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const handleDownloadMenu = () => {
    // Simular descarga de PDF
    const link = document.createElement("a")
    link.href = "/menu-guantanamera.pdf" // Aquí iría la URL real del PDF
    link.download = "Menu-Guantanamera.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="menu" className="w-full scroll-mt-16 bg-gray-50 py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">Nuestra Carta</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
            Descubre todos nuestros platos preparados con ingredientes frescos y mucho cariño
          </p>
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button onClick={handleDownloadMenu} className="bg-red-600 text-white hover:bg-red-700" size="lg">
              <Download className="mr-2 h-5 w-5" />
              Descargar Carta Completa (PDF)
            </Button>
          </motion.div>
        </motion.div>

        <Tabs defaultValue="pollos" className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-white border border-gray-200">
              <TabsTrigger value="pollos" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Pollos
              </TabsTrigger>
              <TabsTrigger value="costillas" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Costillas
              </TabsTrigger>
              <TabsTrigger
                value="acompañamientos"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white"
              >
                Acompañamientos
              </TabsTrigger>
              <TabsTrigger value="bebidas" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Bebidas
              </TabsTrigger>
              <TabsTrigger value="postres" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
                Postres
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {Object.entries(menuCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                <h3 className="text-2xl font-bold text-black mb-6 text-center">{category.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, index) => (
                    <motion.div key={item.name} variants={itemVariants}>
                      <Card className="group overflow-hidden rounded-xl border-gray-200 bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1">
                        <CardHeader className="p-0 relative">
                          <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              layout="fill"
                              objectFit="cover"
                              className="transition-transform duration-300 group-hover:scale-105"
                            />
                            {item.popular && (
                              <Badge className="absolute top-3 right-3 bg-red-600 text-white">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Popular
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-lg font-bold text-black">{item.name}</h4>
                            <span className="text-xl font-bold text-red-600">{item.price}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-black mb-3">Menús Combinados</h3>
            <div className="space-y-3 text-left">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Menú Pollo + Patatas + Bebida</span>
                <span className="font-bold text-red-600">9.90€</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Menú Costillas + Ensalada + Bebida</span>
                <span className="font-bold text-red-600">16.50€</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Menú Familiar (Pollo entero + 2 acompañamientos)</span>
                <span className="font-bold text-red-600">18.90€</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4 italic">
              * Todos los precios incluyen IVA. Consulta disponibilidad de platos del día.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
