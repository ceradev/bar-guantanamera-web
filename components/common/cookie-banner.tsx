"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, Cookie, Settings, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent")
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      const savedPreferences = JSON.parse(cookieConsent)
      setCookiePreferences(savedPreferences)
    }
  }, [])

  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }
    setCookiePreferences(allAccepted)
    localStorage.setItem("cookieConsent", JSON.stringify(allAccepted))
    setShowBanner(false)
    setShowSettings(false)
  }

  const acceptNecessaryOnly = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }
    setCookiePreferences(necessaryOnly)
    localStorage.setItem("cookieConsent", JSON.stringify(necessaryOnly))
    setShowBanner(false)
    setShowSettings(false)
  }

  const saveCustomPreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(cookiePreferences))
    setShowBanner(false)
    setShowSettings(false)
  }

  const handlePreferenceChange = (type: string, value: boolean) => {
    if (type === "necessary") return // Can't change necessary cookies
    setCookiePreferences((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const closeBanner = () => {
    // If user closes without choosing, assume necessary only
    acceptNecessaryOnly()
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="mx-auto max-w-4xl border-gray-200 bg-white shadow-2xl">
          <CardContent className="p-4 md:p-6">
            {!showSettings ? (
              // Main Cookie Banner
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <Cookie className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-black mb-2">🍪 Utilizamos Cookies</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Utilizamos cookies para mejorar tu experiencia en nuestra web, analizar el tráfico y personalizar
                      el contenido. Al continuar navegando, aceptas nuestro uso de cookies según nuestra{" "}
                      <a href="#" className="text-red-600 hover:underline font-semibold">
                        Política de Privacidad
                      </a>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 md:ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowSettings(true)}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Personalizar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={acceptNecessaryOnly}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Solo Necesarias
                  </Button>
                  <Button size="sm" onClick={acceptAllCookies} className="bg-red-600 text-white hover:bg-red-700">
                    <Check className="h-4 w-4 mr-2" />
                    Aceptar Todas
                  </Button>
                </div>

                <button
                  onClick={closeBanner}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Cerrar banner de cookies"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              // Cookie Settings Panel
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-black">Configuración de Cookies</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Cookies Necesarias</h4>
                      <p className="text-sm text-gray-600">
                        Esenciales para el funcionamiento básico del sitio web. No se pueden desactivar.
                      </p>
                    </div>
                    <div className="ml-4">
                      <div className="w-12 h-6 bg-red-600 rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Cookies de Análisis</h4>
                      <p className="text-sm text-gray-600">
                        Nos ayudan a entender cómo interactúas con nuestro sitio web.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handlePreferenceChange("analytics", !cookiePreferences.analytics)}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          cookiePreferences.analytics ? "bg-red-600 justify-end" : "bg-gray-300 justify-start"
                        } px-1`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Cookies de Marketing</h4>
                      <p className="text-sm text-gray-600">
                        Utilizadas para mostrar anuncios relevantes y medir la efectividad de las campañas.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handlePreferenceChange("marketing", !cookiePreferences.marketing)}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          cookiePreferences.marketing ? "bg-red-600 justify-end" : "bg-gray-300 justify-start"
                        } px-1`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">Cookies Funcionales</h4>
                      <p className="text-sm text-gray-600">
                        Permiten funcionalidades mejoradas y personalización del sitio.
                      </p>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => handlePreferenceChange("functional", !cookiePreferences.functional)}
                        className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                          cookiePreferences.functional ? "bg-red-600 justify-end" : "bg-gray-300 justify-start"
                        } px-1`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={acceptNecessaryOnly}
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  >
                    Solo Necesarias
                  </Button>
                  <Button onClick={saveCustomPreferences} className="flex-1 bg-red-600 text-white hover:bg-red-700">
                    Guardar Preferencias
                  </Button>
                  <Button onClick={acceptAllCookies} className="flex-1 bg-green-600 text-white hover:bg-green-700">
                    Aceptar Todas
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
