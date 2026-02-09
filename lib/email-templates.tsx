import * as React from 'react'
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components'

// Estilos compartidos
const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '40px 20px',
    borderRadius: '8px',
    maxWidth: '560px',
}

const heading = {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center' as const,
    margin: '30px 0',
}

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px',
    color: '#4a4a4a',
}

const button = {
    backgroundColor: '#c41e3a',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '14px 24px',
    margin: '30px auto',
}

const hr = {
    borderColor: '#e6e6e6',
    margin: '30px 0',
}

const footer = {
    color: '#8c8c8c',
    fontSize: '12px',
    textAlign: 'center' as const,
}

// ============================================
// Email de Confirmación de Cuenta
// ============================================
interface ConfirmEmailProps {
    confirmationUrl: string
    userName?: string
}

export function ConfirmEmailTemplate({ confirmationUrl, userName }: ConfirmEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Confirma tu correo electrónico - Guantanamera</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>
                        🔥 Guantanamera
                    </Heading>
                    <Text style={paragraph}>
                        ¡Hola{userName ? ` ${userName}` : ''}!
                    </Text>
                    <Text style={paragraph}>
                        Gracias por registrarte. Para completar tu registro y verificar tu correo
                        electrónico, haz clic en el siguiente botón:
                    </Text>
                    <Section style={{ textAlign: 'center' }}>
                        <Button style={button} href={confirmationUrl}>
                            Confirmar mi correo
                        </Button>
                    </Section>
                    <Text style={paragraph}>
                        Si no solicitaste esta verificación, puedes ignorar este correo.
                    </Text>
                    <Text style={{ ...paragraph, fontSize: '14px', color: '#8c8c8c' }}>
                        Este enlace expirará en 24 horas.
                    </Text>
                    <Hr style={hr} />
                    <Text style={footer}>
                        © {new Date().getFullYear()} Bar Guantanamera. Todos los derechos reservados.
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

// ============================================
// Email Interno de Contacto (para el negocio)
// ============================================
interface ContactInternalProps {
    name: string
    email: string
    message: string
    sentAt: string
}

export function ContactInternalTemplate({ name, email, message, sentAt }: ContactInternalProps) {
    return (
        <Html>
            <Head />
            <Preview>📩 Nuevo mensaje de {name} - Responder ahora</Preview>
            <Body style={main}>
                <Container style={{
                    ...container,
                    padding: '0',
                    overflow: 'hidden',
                }}>
                    {/* Header con gradiente */}
                    <Section style={{
                        background: 'linear-gradient(135deg, #c41e3a 0%, #8b1528 100%)',
                        padding: '32px 24px',
                        textAlign: 'center' as const,
                    }}>
                        <Text style={{
                            color: '#ffffff',
                            fontSize: '28px',
                            fontWeight: '700',
                            margin: '0 0 8px 0',
                            letterSpacing: '1px',
                        }}>
                            📩 NUEVO MENSAJE
                        </Text>
                        <Text style={{
                            color: 'rgba(255,255,255,0.85)',
                            fontSize: '14px',
                            margin: '0',
                        }}>
                            Recibido el {sentAt}
                        </Text>
                    </Section>

                    <Section style={{ padding: '32px 24px' }}>
                        {/* Tarjeta del remitente */}
                        <Section style={{
                            backgroundColor: '#fafafa',
                            border: '1px solid #e8e8e8',
                            borderRadius: '12px',
                            padding: '20px',
                            marginBottom: '24px',
                        }}>
                            <table style={{ width: '100%' }}>
                                <tr>
                                    <td style={{ width: '48px', verticalAlign: 'top' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            backgroundColor: '#c41e3a',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff',
                                            fontSize: '20px',
                                            fontWeight: '700',
                                            textAlign: 'center' as const,
                                            lineHeight: '48px',
                                        }}>
                                            {name.charAt(0).toUpperCase()}
                                        </div>
                                    </td>
                                    <td style={{ paddingLeft: '16px', verticalAlign: 'middle' }}>
                                        <Text style={{
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            color: '#1a1a1a',
                                            margin: '0 0 4px 0',
                                        }}>
                                            {name}
                                        </Text>
                                        <Link href={`mailto:${email}`} style={{
                                            fontSize: '14px',
                                            color: '#c41e3a',
                                            textDecoration: 'none',
                                        }}>
                                            {email}
                                        </Link>
                                    </td>
                                </tr>
                            </table>
                        </Section>

                        {/* Mensaje */}
                        <Text style={{
                            fontSize: '12px',
                            fontWeight: '600',
                            color: '#888',
                            textTransform: 'uppercase' as const,
                            letterSpacing: '1px',
                            margin: '0 0 12px 0',
                        }}>
                            Mensaje
                        </Text>
                        <Section style={{
                            backgroundColor: '#ffffff',
                            border: '2px solid #e8e8e8',
                            borderLeft: '4px solid #c41e3a',
                            borderRadius: '8px',
                            padding: '20px 24px',
                            marginBottom: '28px',
                        }}>
                            <Text style={{
                                ...paragraph,
                                margin: 0,
                                whiteSpace: 'pre-wrap',
                                fontSize: '15px',
                                lineHeight: '1.7',
                                color: '#333',
                            }}>
                                {message}
                            </Text>
                        </Section>

                        {/* Botón de respuesta */}
                        <Section style={{ textAlign: 'center' as const }}>
                            <Button
                                href={`mailto:${email}?subject=Re: Mensaje desde la web de Guantanamera`}
                                style={{
                                    ...button,
                                    display: 'inline-block',
                                    margin: '0',
                                }}
                            >
                                ✉️ Responder a {name}
                            </Button>
                        </Section>
                    </Section>

                    {/* Footer */}
                    <Section style={{
                        backgroundColor: '#f5f5f5',
                        padding: '20px 24px',
                        borderTop: '1px solid #e8e8e8',
                    }}>
                        <Text style={{
                            ...footer,
                            margin: 0,
                        }}>
                            Este mensaje fue enviado desde el formulario de contacto de{' '}
                            <Link href="https://barguantanamera.com" style={{ color: '#c41e3a' }}>
                                barguantanamera.com
                            </Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

// ============================================
// Email de Confirmación al Usuario
// ============================================
interface ContactUserProps {
    name: string
    message: string
}

export function ContactUserTemplate({ name, message }: ContactUserProps) {
    return (
        <Html>
            <Head />
            <Preview>Hemos recibido tu mensaje - Guantanamera</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>
                        🔥 Guantanamera
                    </Heading>
                    <Text style={paragraph}>
                        ¡Hola {name}!
                    </Text>
                    <Text style={paragraph}>
                        Hemos recibido tu mensaje y te responderemos lo antes posible.
                        Normalmente respondemos en un plazo de 24-48 horas.
                    </Text>
                    <Hr style={hr} />
                    <Text style={{ ...paragraph, fontWeight: '600' }}>
                        Tu mensaje:
                    </Text>
                    <Section style={{
                        backgroundColor: '#f9f9f9',
                        padding: '20px',
                        borderRadius: '6px',
                        border: '1px solid #e6e6e6',
                    }}>
                        <Text style={{ ...paragraph, margin: 0, whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>
                            "{message}"
                        </Text>
                    </Section>
                    <Hr style={hr} />
                    <Text style={paragraph}>
                        Mientras tanto, puedes visitarnos en nuestro local o llamarnos al{' '}
                        <Link href="tel:+34922173039" style={{ color: '#c41e3a' }}>
                            922 17 30 39
                        </Link>
                        .
                    </Text>
                    <Text style={footer}>
                        © {new Date().getFullYear()} Bar Guantanamera. Todos los derechos reservados.
                        <br />
                        C/ Castro, 7, 38611 San Isidro, Santa Cruz de Tenerife
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}
