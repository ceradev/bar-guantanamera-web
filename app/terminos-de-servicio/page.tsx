import Link from "next/link";
import { ArrowLeft, FileText, ShoppingBag, CreditCard, Truck, AlertTriangle, Phone } from "lucide-react";
import SiteHeader from "@/components/layout/site-header";
import SiteFooter from "@/components/layout/site-footer";

export default function TerminosServicioPage() {
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
                {"Terminos de Servicio"}
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
                <FileText className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {"Aceptacion de Terminos"}
                </h2>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed">
                {"Al acceder y utilizar el sitio web de Restaurante Guantanamera y nuestros servicios, usted acepta estar sujeto a estos Terminos de Servicio. Si no esta de acuerdo con alguna parte de estos terminos, le recomendamos no utilizar nuestros servicios."}
              </p>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                {"Descripcion del Servicio"}
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                {"Restaurante Guantanamera ofrece servicios de restauracion especializados en pollos asados, costillas y patas asadas, incluyendo:"}
              </p>
              <ul className="text-muted-foreground font-body space-y-1 ml-4">
                <li>{"- Venta de comida para llevar"}</li>
                <li>{"- Servicio de entrega a domicilio"}</li>
                <li>{"- Reservas para eventos especiales"}</li>
                <li>{"- Informacion sobre nuestro menu y servicios"}</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Pedidos y Pagos</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{"Realizacion de Pedidos"}</h3>
                  <ul className="text-muted-foreground font-body space-y-1 ml-4">
                    <li>{"- Los pedidos se pueden realizar por telefono o a traves de nuestro sitio web"}</li>
                    <li>{"- Todos los precios estan en euros e incluyen IVA"}</li>
                    <li>{"- Los precios pueden estar sujetos a cambios sin previo aviso"}</li>
                    <li>{"- Se requiere confirmacion del pedido antes de la preparacion"}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{"Metodos de Pago"}</h3>
                  <ul className="text-muted-foreground font-body space-y-1 ml-4">
                    <li>{"- Efectivo en la entrega"}</li>
                    <li>{"- Tarjeta de credito/debito en el local"}</li>
                    <li>{"- Transferencia bancaria (para pedidos especiales)"}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Entrega y Recogida</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Servicio de Entrega</h3>
                  <ul className="text-muted-foreground font-body space-y-1 ml-4">
                    <li>{"- Entregamos en un radio de 10 km desde nuestro local"}</li>
                    <li>{"- Tiempo estimado de entrega: 30-60 minutos"}</li>
                    <li>{"- Coste de entrega: 2.00\u20AC (gratis para pedidos superiores a 25\u20AC)"}</li>
                    <li>{"- Horarios de entrega: segun nuestro horario de apertura"}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Recogida en Local</h3>
                  <ul className="text-muted-foreground font-body space-y-1 ml-4">
                    <li>{"- Los pedidos estaran listos en 15-30 minutos"}</li>
                    <li>{"- Es necesario presentar identificacion al recoger"}</li>
                    <li>{"- Se recomienda confirmar la hora de recogida"}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Cancelaciones y Reembolsos</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{"Politica de Cancelacion"}</h3>
                  <ul className="text-muted-foreground font-body space-y-1 ml-4">
                    <li>{"- Se pueden cancelar pedidos hasta 30 minutos antes de la hora de entrega"}</li>
                    <li>{"- Las cancelaciones tardias pueden incurrir en cargos"}</li>
                    <li>{"- Para eventos especiales, se requiere cancelacion con 24h de antelacion"}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{"Politica de Reembolso"}</h3>
                  <ul className="text-muted-foreground font-body space-y-1 ml-4">
                    <li>{"- Reembolsos completos por errores en el pedido"}</li>
                    <li>{"- Reembolsos parciales por problemas de calidad"}</li>
                    <li>{"- No se reembolsan pedidos ya entregados sin problemas"}</li>
                    <li>{"- Los reembolsos se procesan en 5-7 dias habiles"}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Phone className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">Contacto</h2>
              </div>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                {"Si tiene preguntas sobre estos Terminos de Servicio, puede contactarnos:"}
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
