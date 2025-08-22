"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, ShoppingBag, Bike, Clock, Star, CheckCircle, ArrowRight, Utensils, Users, Gift } from "lucide-react"
import Link from "next/link"
import { motion, easeOut, useInView, backOut } from "framer-motion"
import { useRef, useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
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

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: backOut,
    },
  },
}

const quickOrderOptions = [
  {
    id: "pollo-entero",
    name: "Pollo Entero + Patatas",
    price: "12.50€",
    time: "15-20 min",
    popular: true,
    icon: "🍗",
    description: "Nuestro clásico más pedido",
  },
  {
    id: "costillas-bbq",
    name: "Costillas BBQ",
    price: "15.90€",
    time: "20-25 min",
    popular: true,
    icon: "🥩",
    description: "Con nuestra salsa secreta",
  },
  {
    id: "menu-familiar",
    name: "Menú Familiar",
    price: "18.90€",
    time: "25-30 min",
    popular: false,
    icon: "👨‍👩‍👧‍👦",
    description: "Perfecto para 3-4 personas",
  },
]

const deliveryOptions = [
  {
    platform: "Uber Eats",
    icon: <ShoppingBag className="w-6 h-6" />,
    time: "25-35 min",
    fee: "2.99€",
    rating: "4.8",
    color: "bg-black hover:bg-gray-800",
    link: "#",
  },
  {
    platform: "Glovo",
    icon: <Bike className="w-6 h-6" />,
    time: "20-30 min",
    fee: "1.99€",
    rating: "4.9",
    color: "bg-orange-500 hover:bg-orange-600",
    link: "#",
  },
]

const benefits = [
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Entrega Rápida",
    description: "20-35 minutos",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Calidad Garantizada",
    description: "Siempre fresco",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Pedido Seguro",
    description: "Pago protegido",
  },
]

export default function OrderSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedItems, setSelectedItems] = useState([])
  const [orderType, setOrderType] = useState("delivery") // delivery, pickup, dine-in

  const addToOrder = (item) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const getTotalPrice = () => {
    return selectedItems.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("€", ""))
      return total + price * item.quantity
    }, 0)
  }

  const getTotalItems = () => {
    return selectedItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <section id="pedir" className="w-full scroll-mt-16 bg-white py-20 md:py-28" ref={ref}>
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Enhanced Header */}
        <motion.div
          className="mb-16 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
            <Utensils className="w-4 h-4 text-red-600" />
            <span className="text-red-600 text-sm font-medium tracking-wide">HACER PEDIDO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
            ¿Hambre? <span className="text-red-600">¡Pide Ahora!</span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed">
            Elige tu plataforma favorita, llámanos directamente o selecciona tus platos favoritos. ¡Te lo llevamos a
            casa calentito y delicioso!
          </p>
        </motion.div>

        {/* Order Type Selection */}
        <motion.div
          className="mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 rounded-2xl p-2 flex gap-2">
              <Button
                variant={orderType === "delivery" ? "default" : "ghost"}
                onClick={() => setOrderType("delivery")}
                className={`rounded-xl px-6 py-3 transition-all duration-200 ${
                  orderType === "delivery"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:text-gray-800"
                }`}
              >
                <Bike className="w-4 h-4 mr-2" />A Domicilio
              </Button>
              <Button
                variant={orderType === "pickup" ? "default" : "ghost"}
                onClick={() => setOrderType("pickup")}
                className={`rounded-xl px-6 py-3 transition-all duration-200 ${
                  orderType === "pickup"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:text-gray-800"
                }`}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Recoger
              </Button>
              <Button
                variant={orderType === "dine-in" ? "default" : "ghost"}
                onClick={() => setOrderType("dine-in")}
                className={`rounded-xl px-6 py-3 transition-all duration-200 ${
                  orderType === "dine-in"
                    ? "bg-red-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:text-gray-800"
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                En Local
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Order Selection */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-black mb-2">Selección Rápida</h3>
              <p className="text-gray-600">Nuestros platos más populares listos para pedir</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {quickOrderOptions.map((item, index) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <Card className="group overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{item.icon}</div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                                {item.name}
                              </h4>
                              {item.popular && <Badge className="bg-red-600 text-white text-xs">Popular</Badge>}
                            </div>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-600">{item.price}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.time}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() => addToOrder(item)}
                        className="w-full bg-red-600 text-white hover:bg-red-700 rounded-xl group-hover:shadow-lg transition-all duration-200"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Añadir al Pedido
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Delivery Platforms */}
            <motion.div className="mt-12" variants={itemVariants}>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-black mb-2">Plataformas de Delivery</h3>
                <p className="text-gray-600">Pide a través de tu app favorita</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {deliveryOptions.map((option, index) => (
                  <motion.div
                    key={option.platform}
                    variants={buttonVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card className="overflow-hidden rounded-2xl border-0 shadow-md hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {option.icon}
                            <div>
                              <h4 className="font-bold text-gray-900">{option.platform}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-3 h-3" />
                                <span>{option.time}</span>
                                <span>•</span>
                                <span>Envío: {option.fee}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="font-semibold text-gray-900">{option.rating}</span>
                            </div>
                          </div>
                        </div>
                        <Button asChild className={`w-full ${option.color} text-white rounded-xl`}>
                          <Link href={option.link} target="_blank" rel="noopener noreferrer">
                            Pedir en {option.platform}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Order Summary & Direct Order */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Order Summary */}
            {selectedItems.length > 0 && (
              <Card className="rounded-2xl border-0 shadow-lg sticky top-24">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Tu Pedido ({getTotalItems()})
                  </h3>
                  <div className="space-y-3 mb-4">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium text-gray-900">{item.name}</span>
                          <span className="text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {(Number.parseFloat(item.price.replace("€", "")) * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-red-600">{getTotalPrice().toFixed(2)}€</span>
                    </div>
                  </div>
                  <Button className="w-full bg-red-600 text-white hover:bg-red-700 rounded-xl">
                    Proceder al Pago
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Direct Phone Order */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Pedido Directo</h3>
                <p className="text-gray-600 text-sm mb-4">Llámanos y te atendemos personalmente</p>
                <motion.a
                  href="tel:922173039"
                  className="block text-2xl font-bold text-black hover:text-red-600 mb-4 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  922 173 039
                </motion.a>
                <Button asChild className="w-full bg-green-600 text-white hover:bg-green-700 rounded-xl" size="lg">
                  <a href="tel:922173039">
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar Ahora
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card className="rounded-2xl border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-red-600" />
                  ¿Por qué elegirnos?
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <div className="text-red-600">{benefit.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{benefit.title}</h4>
                        <p className="text-gray-600 text-xs">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Coming Soon Web Orders */}
        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 shadow-lg border border-red-100 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4">Pedidos Online Directos</h3>
            <motion.p
              className="text-lg font-bold text-red-600 mb-4"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 2,
              }}
            >
              ¡PRÓXIMAMENTE!
            </motion.p>
            <p className="text-gray-600 mb-6">
              Estamos trabajando en nuestro sistema de pedidos online para que puedas pedir directamente desde nuestra
              web con descuentos exclusivos.
            </p>
            <Button
              variant="outline"
              className="rounded-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
            >
              Notificarme cuando esté listo
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
