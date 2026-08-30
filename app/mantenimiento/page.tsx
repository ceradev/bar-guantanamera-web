import type { Metadata } from "next"
import Image from "next/image"

import styles from "./maintenance.module.css"

const PHONE_DISPLAY = "922 17 30 39"
const PHONE_LINK = "tel:+34922173039"

export const metadata: Metadata = {
  title: "Seguimos abiertos",
  description:
    "Guantanamera sigue abierto mientras renovamos nuestra web. Llama al 922 17 30 39 para hacer tu encargo en San Isidro.",
  robots: { index: false, follow: false },
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function MaintenancePage() {
  return (
    <main className={styles.shell}>
      <div className={styles.ambientGlow} aria-hidden="true" />

      <header className={styles.header}>
        <Image
          className={styles.logo}
          src="/images/maintenance/guantanamera-logo-white.png"
          width={1500}
          height={800}
          priority
          alt="Guantanamera Bar Cafetería"
        />
        <p className={styles.history}>
          Más de dos décadas
          <br />
          cocinando para San Isidro
        </p>
      </header>

      <section className={styles.hero} aria-labelledby="maintenance-title">
        <div className={styles.copy}>
          <p className={styles.status}>
            <span aria-hidden="true" />
            Seguimos abiertos
          </p>

          <h1 id="maintenance-title" className={styles.title}>
            <span>Estamos dando</span>
            <span>un nuevo</span>
            <strong>giro</strong>
          </h1>

          <p className={styles.intro}>
            Estamos preparando una nueva experiencia digital. Mientras tanto,
            seguimos cocinando el sabor de siempre.
          </p>

          <div className={styles.callActions}>
            <a
              className={styles.primaryCta}
              href={PHONE_LINK}
              aria-label={`Llamar y encargar al ${PHONE_DISPLAY}`}
            >
              <PhoneIcon />
              <span>Llamar y encargar</span>
            </a>
            <a className={styles.phoneNumber} href={PHONE_LINK}>
              <PhoneIcon />
              <span>{PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        <div className={styles.productStage} aria-hidden="true">
          <div className={styles.orbit} />
          <div className={`${styles.orbit} ${styles.orbitTwo}`} />
          <div className={`${styles.orbit} ${styles.orbitThree}`} />
          <Image
            className={styles.chicken}
            src="/images/maintenance/guantanamera-hero-chicken.webp"
            width={760}
            height={676}
            priority
            sizes="(max-width: 900px) 112vw, 70vw"
            alt=""
          />
        </div>
      </section>

      <footer className={styles.footer}>
        <a
          href="https://www.google.com/maps/search/?api=1&query=C.+Castro,+7,+38611+San+Isidro+(Guantanamera)"
          target="_blank"
          rel="noreferrer"
          aria-label="Ver Guantanamera en Google Maps"
        >
          <LocationIcon />
          <span>C. Castro, 7 · San Isidro</span>
        </a>
        <span className={styles.footerRule} aria-hidden="true" />
        <a
          href="https://www.instagram.com/guantanamera.bar/"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir el Instagram de Guantanamera"
        >
          <InstagramIcon />
          <span>@guantanamera.bar</span>
        </a>
      </footer>

      <a
        className={styles.mobileCallBar}
        href={PHONE_LINK}
        aria-label={`Llamar y encargar al ${PHONE_DISPLAY}`}
      >
        <PhoneIcon />
        <span>Llamar y encargar</span>
      </a>
    </main>
  )
}
