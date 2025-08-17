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
      <Card className="group overflow-hidden rounded-xl border-gray-200 bg-white shadow-md transition-all hover:shadow-xl hover:-translate-y-1 h-full">
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
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-xs font-semibold text-gray-700">{item.calories} kcal</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3 md:p-4 flex flex-col h-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
            <h4 className="text-base md:text-lg font-bold text-black leading-tight">{item.name}</h4>
            <span className="text-lg md:text-xl font-bold text-red-600 sm:ml-2">{item.price}</span>
          </div>
          <p className="text-gray-700 text-xs md:text-sm mb-3 flex-grow">{item.description}</p>

          {/* Nutritional Info */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-1 mb-2">
              <Info className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-700">Información Nutricional</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>
                Proteínas: <span className="font-semibold">{item.protein}</span>
              </div>
              <div>
                Grasas: <span className="font-semibold">{item.nutritional.fat}</span>
              </div>
              <div>
                Carbohidratos: <span className="font-semibold">{item.nutritional.carbs}</span>
              </div>
              <div>
                Sodio: <span className="font-semibold">{item.nutritional.sodium}</span>
              </div>
            </div>
          </div>

          {/* Allergens */}
          {item.allergens.length > 0 && (
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-xs text-gray-600">Alérgenos:</span>
              <div className="flex gap-1">{renderAllergenIcons(item.allergens)}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )

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
            Descubre nuestras especialidades preparadas con ingredientes frescos y técnicas tradicionales
          </p>

          {/* Global Search Bar */}
          {/* <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlobalSearch />
          </motion.div> */}

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

        {/* Main Menu Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-white border border-gray-200 h-auto">
              <TabsTrigger
                value="pollos"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white py-3 px-4 text-sm font-semibold"
              >
                🍗 Pollos Asados
              </TabsTrigger>
              <TabsTrigger
                value="costillasYPatas"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white py-3 px-4 text-sm font-semibold"
              >
                🥩 Costillas y Patas
              </TabsTrigger>
              <TabsTrigger
                value="guarniciones"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white py-3 px-4 text-sm font-semibold"
              >
                🥗 Guarniciones
              </TabsTrigger>
              <TabsTrigger
                value="quesadillasYBurritos"
                className="data-[state=active]:bg-red-600 data-[state=active]:text-white py-3 px-4 text-sm font-semibold"
              >
                🌯 Quesadillas y Burritos
              </TabsTrigger>
            </TabsList>
          </motion.div>

          {Object.entries(menuCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-black mb-2">{category.title}</h3>
                  <p className="text-gray-600 italic">{category.subtitle}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {category.items.map((item, index) => renderMenuItem(item, index))}
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Combo Meals */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 shadow-md border border-red-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-black mb-6">🍽️ Menús Combinados</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">Menú Pollo</h4>
                <p className="text-sm text-gray-600 mb-3">Medio pollo + Patatas + Bebida</p>
                <span className="text-2xl font-bold text-red-600">9.90€</span>
                <p className="text-xs text-gray-500 mt-1">~650 kcal</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">Menú Costillas</h4>
                <p className="text-sm text-gray-600 mb-3">Media ración + Ensalada + Bebida</p>
                <span className="text-2xl font-bold text-red-600">16.50€</span>
                <p className="text-xs text-gray-500 mt-1">~550 kcal</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2">Menú Familiar</h4>
                <p className="text-sm text-gray-600 mb-3">Pollo entero + 2 acompañamientos</p>
                <span className="text-2xl font-bold text-red-600">18.90€</span>
                <p className="text-xs text-gray-500 mt-1">~1200 kcal</p>
              </div>
            </div>

            {/* Allergen Legend */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Leyenda de Alérgenos:</h4>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Wheat className="w-4 h-4 text-orange-600" />
                  <span>Gluten</span>
                </div>
                <div className="flex items-center gap-1">
                  <Milk className="w-4 h-4 text-orange-600" />
                  <span>Lácteos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Egg className="w-4 h-4 text-orange-600" />
                  <span>Huevos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Nut className="w-4 h-4 text-orange-600" />
                  <span>Frutos Secos</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bean className="w-4 h-4 text-orange-600" />
                  <span>Soja</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">
                * Todos los precios incluyen IVA. Consulta disponibilidad de platos del día.
                <br />
                ** Si tienes alguna alergia alimentaria, por favor informa a nuestro personal.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Mojos and Beverages Section */}
        <motion.div
          className="mt-12 space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Mojos */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-6 text-center flex items-center justify-center">
              🥄 Mojos Caseros
            </h3>
            <div className="space-y-3">
              {bebidasYMojos.mojos.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-800">{item.name}</h5>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{item.calories} kcal</span>
                      {item.allergens.length > 0 && (
                        <div className="flex gap-1">{renderAllergenIcons(item.allergens)}</div>
                      )}
                    </div>
                  </div>
                  <span className="text-lg font-bold text-red-600 ml-4">{item.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Beverages */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-black mb-6 text-center flex items-center justify-center">
              🍺 Bebidas
            </h3>
            <div className="space-y-3">
              {bebidasYMojos.bebidas.map((item) => (
                <div key={item.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-800">{item.name}</h5>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{item.calories} kcal</span>
                      {item.allergens.length > 0 && (
                        <div className="flex gap-1">{renderAllergenIcons(item.allergens)}</div>
                      )}
                    </div>
                  </div>
                  <span className="text-lg font-bold text-red-600 ml-4">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
