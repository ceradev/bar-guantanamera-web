"use client";

import Link from "next/link";
import {
  Flame,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="h-8 w-8 text-red-500" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold">Guantanamera</span>
                <span className="text-sm text-gray-400">
                  23 años a su servicio
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Crujiente por fuera, jugoso por dentro. Especialidad en pollos,
              costillas y patas asadas con la receta casera que nos define.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#menu"
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                >
                  Nuestro Menú
                </Link>
              </li>
              <li>
                <Link
                  href="#galeria"
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link
                  href="#opiniones"
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                >
                  Opiniones
                </Link>
              </li>
              <li>
                <Link
                  href="#ubicacion"
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                >
                  Ubicación
                </Link>
              </li>
              <li>
                <Link
                  href="#pedir"
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                >
                  Hacer Pedido
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  C. Castro, 7,
                  <br />
                  38611 San Isidro,
                  <br />
                  Santa Cruz de Tenerife
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-red-500 flex-shrink-0" />
                <Link
                  href="tel:+34922173039"
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                >
                  +34 922 17 30 39
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-red-500 flex-shrink-0" />
                <Link
                  href="mailto:info@guantanamera.com"
                  className="text-gray-300 hover:text-red-500 transition-colors text-sm"
                >
                  info@guantanamera.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Horarios</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="text-gray-300">
                    <div className="font-medium text-white mb-1">
                      Lunes y Viernes
                    </div>
                    <div>9:00 - 18:00</div>
                  </div>
                  <div className="text-gray-300 mt-2">
                    <div className="font-medium text-white mb-1">
                      Sábados y Domingos
                    </div>
                    <div>9:00 - 17:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 Restaurante Guantanamera. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Política de Privacidad
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
