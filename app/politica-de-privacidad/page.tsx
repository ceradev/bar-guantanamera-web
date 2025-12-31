import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database, Users } from "lucide-react";

export default function PoliticaPrivacidadPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Política de Privacidad
            </h1>
            <p className="text-gray-600 mt-2">
              Última actualización: 29 de agosto de 2024
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-8 w-8 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Información General
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              En Restaurante Guantanamera ("nosotros", "nuestro", "la empresa") 
              respetamos y protegemos su privacidad. Esta Política de Privacidad 
              describe cómo recopilamos, utilizamos, almacenamos y protegemos su 
              información personal cuando utiliza nuestro sitio web y servicios.
            </p>
          </div>

          {/* Data Collection */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="h-8 w-8 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Información que Recopilamos
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Información de Contacto
                </h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Nombre y apellidos</li>
                  <li>• Número de teléfono</li>
                  <li>• Dirección de correo electrónico</li>
                  <li>• Dirección de entrega</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Información de Pedidos
                </h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Historial de pedidos</li>
                  <li>• Preferencias alimentarias</li>
                  <li>• Métodos de pago</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Información Técnica
                </h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Dirección IP</li>
                  <li>• Tipo de navegador</li>
                  <li>• Páginas visitadas</li>
                  <li>• Cookies y tecnologías similares</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Usage */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-8 w-8 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Cómo Utilizamos su Información
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Propósitos Principales
                </h3>
                <ul className="text-gray-700 space-y-1 ml-4">
                  <li>• Procesar y entregar sus pedidos</li>
                  <li>• Comunicarnos con usted sobre su pedido</li>
                  <li>• Mejorar nuestros servicios y experiencia del usuario</li>
                  <li>• Enviar comunicaciones de marketing (con su consentimiento)</li>
                  <li>• Cumplir con obligaciones legales</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-8 w-8 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Compartir Información
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              No vendemos, alquilamos ni compartimos su información personal con 
              terceros, excepto en las siguientes circunstancias:
            </p>
            <ul className="text-gray-700 space-y-1 ml-4">
              <li>• Con su consentimiento explícito</li>
              <li>• Con proveedores de servicios que nos ayudan a operar (entregas, pagos)</li>
              <li>• Para cumplir con obligaciones legales</li>
              <li>• Para proteger nuestros derechos y seguridad</li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-8 w-8 text-red-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                Seguridad de Datos
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Implementamos medidas de seguridad técnicas y organizativas apropiadas 
              para proteger su información personal contra acceso no autorizado, 
              alteración, divulgación o destrucción.
            </p>
            <ul className="text-gray-700 space-y-1 ml-4">
              <li>• Encriptación de datos sensibles</li>
              <li>• Acceso restringido a información personal</li>
              <li>• Monitoreo regular de seguridad</li>
              <li>• Formación del personal en protección de datos</li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Cookies y Tecnologías Similares
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Utilizamos cookies y tecnologías similares para mejorar su experiencia 
              en nuestro sitio web. Puede controlar el uso de cookies a través de 
              la configuración de su navegador.
            </p>
            <div className="space-y-2">
              <p className="text-gray-700">
                <strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico del sitio
              </p>
              <p className="text-gray-700">
                <strong>Cookies de Rendimiento:</strong> Nos ayudan a entender cómo se utiliza el sitio
              </p>
              <p className="text-gray-700">
                <strong>Cookies de Funcionalidad:</strong> Recuerdan sus preferencias y configuraciones
              </p>
            </div>
          </div>

          {/* User Rights */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Sus Derechos
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Según la legislación aplicable, tiene los siguientes derechos:
            </p>
            <ul className="text-gray-700 space-y-1 ml-4">
              <li>• Acceder a su información personal</li>
              <li>• Rectificar información inexacta</li>
              <li>• Solicitar la eliminación de sus datos</li>
              <li>• Limitar el procesamiento de sus datos</li>
              <li>• Portabilidad de sus datos</li>
              <li>• Oponerse al procesamiento</li>
              <li>• Retirar el consentimiento</li>
            </ul>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Retención de Datos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Conservamos su información personal solo durante el tiempo necesario 
              para cumplir con los propósitos para los que fue recopilada, o según 
              lo requiera la ley. Los datos de pedidos se conservan durante 5 años 
              por obligaciones fiscales, mientras que la información de contacto 
              se conserva mientras mantenga una relación activa con nosotros.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Contacto
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Si tiene preguntas sobre esta Política de Privacidad o desea ejercer 
              sus derechos, puede contactarnos:
            </p>
            <div className="space-y-2 text-gray-700">
              <p><strong>Email:</strong> info@guantanamera.com</p>
              <p><strong>Teléfono:</strong> +34 922 17 30 39</p>
              <p><strong>Dirección:</strong> C. Castro, 7, 38611 San Isidro, Santa Cruz de Tenerife</p>
            </div>
          </div>

          {/* Changes */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Cambios en la Política
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Nos reservamos el derecho de actualizar esta Política de Privacidad 
              en cualquier momento. Los cambios entrarán en vigor inmediatamente 
              después de su publicación en nuestro sitio web. Le recomendamos 
              revisar esta política periódicamente para mantenerse informado sobre 
              cómo protegemos su información.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
