import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database, Users } from "lucide-react";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export default function PoliticaPrivacidadPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1">
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
            <div className="mt-4">
              <h1 className="text-3xl font-bold text-foreground">
                {"Politica de Privacidad"}
              </h1>
              <p className="text-muted-foreground font-body mt-2">
                {"Ultima actualizacion: 29 de agosto de 2024"}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">{"Informacion General"}</h2>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed">
                {"En Restaurante Guantanamera respetamos y protegemos su privacidad. Esta Politica de Privacidad describe como recopilamos, utilizamos, almacenamos y protegemos su informacion personal cuando utiliza nuestro sitio web y servicios."}
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Database className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">{"Informacion que Recopilamos"}</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{"Informacion de Contacto"}</h3>
                  <ul className="text-muted-foreground font-body space-y-1 ml-4">
                    <li>{"- Nombre y apellidos"}</li>
                    <li>{"- Numero de telefono"}</li>
                    <li>{"- Direccion de correo electronico"}</li>
                    <li>{"- Direccion de entrega"}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{"Informacion de Pedidos"}</h3>
                  <ul className="text-muted-foreground font-body space-y-1 ml-4">
                    <li>{"- Historial de pedidos"}</li>
                    <li>{"- Preferencias alimentarias"}</li>
                    <li>{"- Metodos de pago"}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{"Informacion Tecnica"}</h3>
                  <ul className="text-muted-foreground font-body space-y-1 ml-4">
                    <li>{"- Direccion IP"}</li>
                    <li>{"- Tipo de navegador"}</li>
                    <li>{"- Paginas visitadas"}</li>
                    <li>{"- Cookies y tecnologias similares"}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">{"Como Utilizamos su Informacion"}</h2>
              </div>
              <ul className="text-muted-foreground font-body space-y-1 ml-4">
                <li>{"- Procesar y entregar sus pedidos"}</li>
                <li>{"- Comunicarnos con usted sobre su pedido"}</li>
                <li>{"- Mejorar nuestros servicios y experiencia del usuario"}</li>
                <li>{"- Enviar comunicaciones de marketing (con su consentimiento)"}</li>
                <li>{"- Cumplir con obligaciones legales"}</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">{"Compartir Informacion"}</h2>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                {"No vendemos, alquilamos ni compartimos su informacion personal con terceros, excepto en las siguientes circunstancias:"}
              </p>
              <ul className="text-muted-foreground font-body space-y-1 ml-4">
                <li>{"- Con su consentimiento explicito"}</li>
                <li>{"- Con proveedores de servicios que nos ayudan a operar"}</li>
                <li>{"- Para cumplir con obligaciones legales"}</li>
                <li>{"- Para proteger nuestros derechos y seguridad"}</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Seguridad de Datos</h2>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                {"Implementamos medidas de seguridad tecnicas y organizativas apropiadas para proteger su informacion personal contra acceso no autorizado, alteracion, divulgacion o destruccion."}
              </p>
              <ul className="text-muted-foreground font-body space-y-1 ml-4">
                <li>{"- Encriptacion de datos sensibles"}</li>
                <li>{"- Acceso restringido a informacion personal"}</li>
                <li>{"- Monitoreo regular de seguridad"}</li>
                <li>{"- Formacion del personal en proteccion de datos"}</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Contacto</h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                {"Si tiene preguntas sobre esta Politica de Privacidad o desea ejercer sus derechos, puede contactarnos:"}
              </p>
              <div className="space-y-2 text-muted-foreground font-body">
                <p><strong className="text-foreground">Email:</strong> info@guantanamera.com</p>
                <p><strong className="text-foreground">{"Telefono:"}</strong> +34 922 17 30 39</p>
                <p><strong className="text-foreground">{"Direccion:"}</strong> C. Castro, 7, 38611 San Isidro, Santa Cruz de Tenerife</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
