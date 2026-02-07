"use client"

import { Button } from "@/components/ui/button"
import { Home, Utensils, MapPin, Phone, ArrowLeft, ChefHat, Flame } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-secondary leading-none">
            404
          </h1>
        </div>

        {/* Main message */}
        <div className="mb-12 -mt-20 md:-mt-32 relative z-20">
          <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-full mb-6">
            <ChefHat className="w-6 h-6 text-primary" />
            <span className="text-primary font-semibold text-lg">{"Pagina no encontrada"}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Parece que te has perdido en el camino
          </h2>
          
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            No te preocupes, en Bar Guantanamera siempre hay un camino de regreso. 
            Mientras tanto, por que no exploras nuestro delicioso menu?
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg rounded-sm font-semibold tracking-wide"
            >
              <Home className="mr-2 h-5 w-5" />
              Volver al Inicio
            </Button>
          </Link>

          <Link href="/menu">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-border text-foreground hover:border-primary hover:text-primary px-8 py-6 text-lg rounded-sm font-semibold tracking-wide"
            >
              <Utensils className="mr-2 h-5 w-5" />
              {"Ver Menu"}
            </Button>
          </Link>
        </div>

        {/* Restaurant info cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{"Visitanos"}</h3>
            <p className="text-muted-foreground text-sm font-body">
              {"Ven a disfrutar de nuestra cocina tradicional en un ambiente acogedor"}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Flame className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Especialidades</h3>
            <p className="text-muted-foreground text-sm font-body">
              Pollos asados, costillas y platos con recetas caseras
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">Reserva</h3>
            <p className="text-muted-foreground text-sm font-body">
              {"Llamanos para hacer tu reserva y asegurar tu pedido"}
            </p>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-12">
          <Link href="/">
            <Button
              variant="ghost"
              size="lg"
              className="text-muted-foreground hover:text-primary px-6 py-3 text-lg"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              {"Volver Atras"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
