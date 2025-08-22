"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Star, Wheat, Milk, Egg, Fish, Nut, Bean, Info } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
// import GlobalSearch from "./global-search"

// Allergen icons mapping
const allergenIcons = {
  gluten: Wheat,
  dairy: Milk,
  eggs: Egg,
  fish: Fish,
  nuts: Nut,
  peanuts: Nut,
  soy: Bean,
}

const menuCategories = {
  pollos: {
    title: "Pollos Asados",
    subtitle: "Nuestras especialidades de pollo, jugosos y dorados",
    items: [
      {
        name: "Pollo Entero Tradicional",
        description: "Pollo entero asado con nuestra mezcla secreta de especias mediterráneas",
        price: "12.50€",
        image: "/placeholder.svg?width=300&height=200",
        popular: true,
        calories: 850,
        protein: "65g",
        allergens: ["gluten"],
        nutritional: {
          fat: "45g",
          carbs: "2g",
          fiber: "0g",
          sodium: "1200mg",
        },
      },
      {
        name: "Medio Pollo Premium",
        description: "Media ración de pollo con hierbas frescas y limón",
        price: "7.50€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 425,
        protein: "32g",
        allergens: [],
        nutritional: {
          fat: "22g",
          carbs: "1g",
          fiber: "0g",
          sodium: "600mg",
        },
      },
      {
        name: "Cuarto de Pollo con Patatas",
        description: "Cuarto de pollo tierno con patatas asadas al romero",
        price: "5.50€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 380,
        protein: "28g",
        allergens: [],
        nutritional: {
          fat: "18g",
          carbs: "25g",
          fiber: "3g",
          sodium: "450mg",
        },
      },
      {
        name: "Alitas de Pollo Picantes",
        description: "8 alitas marinadas con especias picantes y miel",
        price: "6.90€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 320,
        protein: "24g",
        allergens: ["soy"],
        nutritional: {
          fat: "20g",
          carbs: "8g",
          fiber: "0g",
          sodium: "580mg",
        },
      },
    ],
  },
  costillasYPatas: {
    title: "Costillas y Patas",
    subtitle: "Costillas tiernas y piernas asadas a la perfección",
    items: [
      {
        name: "Costillas BBQ Guantanamera",
        description: "Costillas de cerdo con nuestra salsa barbacoa casera y especias secretas",
        price: "15.90€",
        image: "/placeholder.svg?width=300&height=200",
        popular: true,
        calories: 680,
        protein: "45g",
        allergens: ["gluten", "soy"],
        nutritional: {
          fat: "38g",
          carbs: "15g",
          fiber: "1g",
          sodium: "890mg",
        },
      },
      {
        name: "Costillas al Horno con Miel",
        description: "Costillas tiernas al horno con glaseado de miel y mostaza",
        price: "14.50€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 620,
        protein: "42g",
        allergens: [],
        nutritional: {
          fat: "32g",
          carbs: "18g",
          fiber: "0g",
          sodium: "720mg",
        },
      },
      {
        name: "Media Ración de Costillas",
        description: "Perfecta para compartir o como entrante",
        price: "9.90€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 340,
        protein: "22g",
        allergens: ["gluten", "soy"],
        nutritional: {
          fat: "19g",
          carbs: "8g",
          fiber: "0g",
          sodium: "445mg",
        },
      },
      {
        name: "Pierna de Cordero al Romero",
        description: "Pierna de cordero asada con romero fresco y ajo",
        price: "18.90€",
        image: "/placeholder.svg?width=300&height=200",
        popular: true,
        calories: 720,
        protein: "52g",
        allergens: [],
        nutritional: {
          fat: "42g",
          carbs: "2g",
          fiber: "0g",
          sodium: "650mg",
        },
      },
      {
        name: "Pierna de Cerdo Glaseada",
        description: "Pierna de cerdo con glaseado de miel y mostaza antigua",
        price: "16.50€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 650,
        protein: "48g",
        allergens: [],
        nutritional: {
          fat: "35g",
          carbs: "12g",
          fiber: "0g",
          sodium: "580mg",
        },
      },
    ],
  },
  guarniciones: {
    title: "Guarniciones",
    subtitle: "Acompañamientos perfectos para completar tu comida",
    items: [
      {
        name: "Patatas Asadas 'Guantanamera'",
        description: "Patatas cortadas a mano, asadas con romero y aceite de oliva virgen",
        price: "4.50€",
        image: "/placeholder.svg?width=300&height=200",
        popular: true,
        calories: 220,
        protein: "4g",
        allergens: [],
        nutritional: {
          fat: "8g",
          carbs: "35g",
          fiber: "4g",
          sodium: "320mg",
        },
      },
      {
        name: "Ensalada Mixta Fresca",
        description: "Lechuga, tomate, cebolla roja, aceitunas y vinagreta casera",
        price: "3.90€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 85,
        protein: "2g",
        allergens: [],
        nutritional: {
          fat: "6g",
          carbs: "8g",
          fiber: "3g",
          sodium: "180mg",
        },
      },
      {
        name: "Pimientos Asados del Piquillo",
        description: "Pimientos rojos asados con ajo, perejil y aceite de oliva",
        price: "4.20€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 95,
        protein: "2g",
        allergens: [],
        nutritional: {
          fat: "7g",
          carbs: "6g",
          fiber: "2g",
          sodium: "240mg",
        },
      },
      {
        name: "Arroz con Verduras",
        description: "Arroz basmati con verduras de temporada salteadas",
        price: "3.80€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 180,
        protein: "4g",
        allergens: [],
        nutritional: {
          fat: "3g",
          carbs: "36g",
          fiber: "2g",
          sodium: "290mg",
        },
      },
    ],
  },
  quesadillasYBurritos: {
    title: "Quesadillas y Burritos",
    subtitle: "Sabores mexicanos con ingredientes frescos",
    items: [
      {
        name: "Quesadilla de Pollo",
        description: "Tortilla de trigo con pollo asado, queso fundido y pimientos",
        price: "8.90€",
        image: "/placeholder.svg?width=300&height=200",
        popular: true,
        calories: 520,
        protein: "28g",
        allergens: ["gluten", "dairy"],
        nutritional: {
          fat: "22g",
          carbs: "45g",
          fiber: "3g",
          sodium: "890mg",
        },
      },
      {
        name: "Burrito de Costillas",
        description: "Tortilla grande con costillas desmenuzadas, frijoles, arroz y queso",
        price: "11.50€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 680,
        protein: "35g",
        allergens: ["gluten", "dairy", "soy"],
        nutritional: {
          fat: "28g",
          carbs: "65g",
          fiber: "8g",
          sodium: "1200mg",
        },
      },
      {
        name: "Quesadilla Vegetariana",
        description: "Tortilla con verduras asadas, queso y guacamole casero",
        price: "7.50€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 420,
        protein: "18g",
        allergens: ["gluten", "dairy"],
        nutritional: {
          fat: "18g",
          carbs: "42g",
          fiber: "6g",
          sodium: "650mg",
        },
      },
      {
        name: "Burrito Mixto",
        description: "Pollo y costillas con arroz, frijoles negros y salsa picante",
        price: "12.90€",
        image: "/placeholder.svg?width=300&height=200",
        calories: 750,
        protein: "42g",
        allergens: ["gluten", "dairy", "soy"],
        nutritional: {
          fat: "32g",
          carbs: "68g",
          fiber: "9g",
          sodium: "1350mg",
        },
      },
    ],
  },
}

const bebidasYMojos = {
  bebidas: [
    {
      name: "Cerveza Estrella Galicia",
      description: "Cerveza rubia de barril (caña 20cl)",
      price: "2.50€",
      calories: 85,
      allergens: ["gluten"],
    },
    {
      name: "Vino Tinto de la Casa",
      description: "Vino tinto joven D.O. La Mancha (copa)",
      price: "3.20€",
      calories: 125,
      allergens: [],
    },
    {
      name: "Agua Mineral",
      description: "Agua mineral natural (50cl)",
      price: "1.80€",
      calories: 0,
      allergens: [],
    },
    {
      name: "Refrescos Variados",
      description: "Coca-Cola, Fanta, Sprite (lata 33cl)",
      price: "2.80€",
      calories: 140,
      allergens: [],
    },
  ],
  mojos: [
    {
      name: "Mojo Rojo Picante",
      description: "Mojo canario tradicional con pimientos rojos y especias",
      price: "1.50€",
      calories: 45,
      allergens: [],
    },
    {
      name: "Mojo Verde",
      description: "Mojo verde con cilantro, perejil y ajo",
      price: "1.20€",
      calories: 35,
      allergens: [],
    },
    {
      name: "Alioli Tradicional",
      description: "Alioli casero con ajo y aceite de oliva",
      price: "1.20€",
      calories: 95,
      allergens: ["eggs"],
    },
  ],
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
  const [activeTab, setActiveTab] = useState("pollos")

  const handleDownloadMenu = () => {
    const link = document.createElement("a")
    link.href = "/menu-guantanamera.pdf"
    link.download = "Menu-Guantanamera.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderAllergenIcons = (allergens) => {
    return allergens.map((allergen) => {
      const IconComponent = allergenIcons[allergen]
      return (
        <div
          key={allergen}
          className="flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full"
          title={`Contiene ${allergen}`}
        >
          <IconComponent className="w-3 h-3 text-orange-600" />
        </div>
      )
    })
  }

  const renderMenuItem = (item, index) => (
    <motion.div key={item.name} variants={itemVariants}>
      <Card className="group overflow-hidden rounded-2xl border-0 bg-white shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-2 h-full">
        <CardHeader className="p-0 relative">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 group-hover:scale-110"
            />
            {item.popular && (
              <Badge className="absolute top-4 right-4 bg-red-600 text-white shadow-lg border-0 px-3 py-1">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Popular
              </Badge>
            )}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm">
              <span className="text-sm font-semibold text-gray-700">{item.calories} kcal</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-lg font-bold text-black leading-tight group-hover:text-red-600 transition-colors duration-200">
              {item.name}
            </h4>
            <span className="text-2xl font-bold text-red-600 ml-3">{item.price}</span>
          </div>
          <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">{item.description}</p>

          {/* Enhanced Nutritional Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-gray-700">Información Nutricional</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Proteínas:</span>
                <span className="font-semibold text-gray-800">{item.protein}</span>
              </div>
              <div className="flex justify-between">
                <span>Grasas:</span>
                <span className="font-semibold text-gray-800">{item.nutritional.fat}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Allergens */}
          {item.allergens.length > 0 && (
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-sm text-gray-600 font-medium">Alérgenos:</span>
              <div className="flex gap-2">{renderAllergenIcons(item.allergens)}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <section id="menu" className="w-full scroll-mt-16 bg-white py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-red-600 rounded-full"></div>
            <span className="text-red-600 text-sm font-medium tracking-wide">NUESTRA ESPECIALIDAD</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
            Carta <span className="text-red-600">Guantanamera</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed">
            Descubre nuestras especialidades preparadas con ingredientes frescos y técnicas tradicionales que han pasado
            de generación en generación
          </p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              onClick={handleDownloadMenu}
              className="bg-red-600 text-white hover:bg-red-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-full group"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              Descargar Carta Completa
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced Menu Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-gray-50 border-0 rounded-2xl p-2 h-auto shadow-sm">
              <TabsTrigger
                value="pollos"
                className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-md py-4 px-6 text-sm font-semibold rounded-xl transition-all duration-300 hover:bg-white/50"
              >
                <span className="mr-2 text-lg">🍗</span>
                <span className="hidden sm:inline">Pollos Asados</span>
                <span className="sm:hidden">Pollos</span>
              </TabsTrigger>
              <TabsTrigger
                value="costillasYPatas"
                className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-md py-4 px-6 text-sm font-semibold rounded-xl transition-all duration-300 hover:bg-white/50"
              >
                <span className="mr-2 text-lg">🥩</span>
                <span className="hidden sm:inline">Costillas y Patas</span>
                <span className="sm:hidden">Costillas</span>
              </TabsTrigger>
              <TabsTrigger
                value="guarniciones"
                className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-md py-4 px-6 text-sm font-semibold rounded-xl transition-all duration-300 hover:bg-white/50"
              >
                <span className="mr-2 text-lg">🥗</span>
                <span className="hidden sm:inline">Guarniciones</span>
                <span className="sm:hidden">Guarniciones</span>
              </TabsTrigger>
              <TabsTrigger
                value="quesadillasYBurritos"
                className="data-[state=active]:bg-white data-[state=active]:text-red-600 data-[state=active]:shadow-md py-4 px-6 text-sm font-semibold rounded-xl transition-all duration-300 hover:bg-white/50"
              >
                <span className="mr-2 text-lg">🌯</span>
                <span className="hidden sm:inline">Quesadillas</span>
                <span className="sm:hidden">Mexicano</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {Object.entries(menuCategories).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-0">
              <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold text-black mb-3">{category.title}</h3>
                  <div className="w-16 h-1 bg-red-600 mx-auto mb-4 rounded-full"></div>
                  <p className="text-gray-600 text-lg italic max-w-2xl mx-auto">{category.subtitle}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, index) => renderMenuItem(item, index))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Enhanced Combo Meals Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 rounded-3xl p-10 shadow-lg border border-red-100 max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 shadow-sm">
              <span className="text-2xl">🍽️</span>
              <span className="text-red-600 font-semibold">MENÚS COMBINADOS</span>
            </div>
            <h3 className="text-3xl font-bold text-black mb-8">Nuestros Menús Especiales</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <span className="text-2xl">🍗</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-xl">Menú Pollo</h4>
                <p className="text-gray-600 mb-4">Medio pollo + Patatas + Bebida</p>
                <span className="text-3xl font-bold text-red-600">9.90€</span>
                <p className="text-sm text-gray-500 mt-2">~650 kcal</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <span className="text-2xl">🥩</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-xl">Menú Costillas</h4>
                <p className="text-gray-600 mb-4">Media ración + Ensalada + Bebida</p>
                <span className="text-3xl font-bold text-red-600">16.50€</span>
                <p className="text-sm text-gray-500 mt-2">~550 kcal</p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-xl">Menú Familiar</h4>
                <p className="text-gray-600 mb-4">Pollo entero + 2 acompañamientos</p>
                <span className="text-3xl font-bold text-red-600">18.90€</span>
                <p className="text-sm text-gray-500 mt-2">~1200 kcal</p>
              </div>
            </div>

            {/* Enhanced Allergen Legend */}
            <div className="mt-10 pt-8 border-t border-red-200">
              <h4 className="text-lg font-semibold text-gray-700 mb-6">Información de Alérgenos</h4>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm">
                  <Wheat className="w-4 h-4 text-orange-600" />
                  <span>Gluten</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm">
                  <Milk className="w-4 h-4 text-orange-600" />
                  <span>Lácteos</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm">
                  <Egg className="w-4 h-4 text-orange-600" />
                  <span>Huevos</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm">
                  <Nut className="w-4 h-4 text-orange-600" />
                  <span>Frutos Secos</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-full shadow-sm">
                  <Bean className="w-4 h-4 text-orange-600" />
                  <span>Soja</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 italic leading-relaxed">
                  * Todos los precios incluyen IVA. Consulta disponibilidad de platos del día.
                  <br />
                  ** Si tienes alguna alergia alimentaria, por favor informa a nuestro personal.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Mojos and Beverages Section */}
        <motion.div
          className="mt-16 space-y-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Mojos */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
                <span className="text-2xl">🥄</span>
                <span className="text-red-600 font-semibold">MOJOS CASEROS</span>
              </div>
              <h3 className="text-2xl font-bold text-black">Salsas Tradicionales</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {bebidasYMojos.mojos.map((item) => (
                <div
                  key={item.name}
                  className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-gray-800 text-lg">{item.name}</h5>
                    <span className="text-xl font-bold text-red-600">{item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{item.calories} kcal</span>
                    {item.allergens.length > 0 && (
                      <div className="flex gap-1">{renderAllergenIcons(item.allergens)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beverages */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
                <span className="text-2xl">🍺</span>
                <span className="text-red-600 font-semibold">BEBIDAS</span>
              </div>
              <h3 className="text-2xl font-bold text-black">Selección de Bebidas</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {bebidasYMojos.bebidas.map((item) => (
                <div
                  key={item.name}
                  className="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-semibold text-gray-800">{item.name}</h5>
                    <span className="text-lg font-bold text-red-600">{item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{item.calories} kcal</span>
                    {item.allergens.length > 0 && (
                      <div className="flex gap-1">{renderAllergenIcons(item.allergens)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
