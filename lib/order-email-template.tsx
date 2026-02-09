import * as React from 'react'
import {
    Body,
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

const hr = {
    borderColor: '#e6e6e6',
    margin: '30px 0',
}

const footer = {
    color: '#8c8c8c',
    fontSize: '12px',
    textAlign: 'center' as const,
}

interface OrderItem {
    name: string
    quantity: number
}

interface OrderConfirmationProps {
    customerName: string
    pickupTime: string
    items: OrderItem[]
    total: number
}

export function OrderConfirmationTemplate({
    customerName,
    pickupTime,
    items,
    total,
}: OrderConfirmationProps) {
    return (
        <Html>
            <Head />
            <Preview>Tu pedido está confirmado - Guantanamera</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>
                        🔥 ¡Pedido Confirmado!
                    </Heading>
                    <Text style={paragraph}>
                        ¡Hola {customerName}!
                    </Text>
                    <Text style={paragraph}>
                        Tu pedido ha sido recibido y estará listo para recoger a las{' '}
                        <strong>{pickupTime}</strong>.
                    </Text>

                    <Hr style={hr} />

                    <Text style={{ ...paragraph, fontWeight: '600', marginBottom: '16px' }}>
                        Resumen del pedido:
                    </Text>

                    <Section style={{
                        backgroundColor: '#f9f9f9',
                        padding: '20px',
                        borderRadius: '6px',
                        border: '1px solid #e6e6e6',
                    }}>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '8px 0',
                                    borderBottom: index < items.length - 1 ? '1px solid #e6e6e6' : 'none',
                                }}
                            >
                                <Text style={{ ...paragraph, margin: 0 }}>
                                    {item.name} x{item.quantity}
                                </Text>
                            </div>
                        ))}
                        <div style={{
                            marginTop: '16px',
                            paddingTop: '16px',
                            borderTop: '2px solid #c41e3a',
                        }}>
                            <Text style={{
                                ...paragraph,
                                margin: 0,
                                fontWeight: '700',
                                fontSize: '18px',
                                color: '#c41e3a',
                            }}>
                                Total: {total.toFixed(2)}€
                            </Text>
                        </div>
                    </Section>

                    <Hr style={hr} />

                    <Text style={paragraph}>
                        <strong>📍 Dirección de recogida:</strong><br />
                        C. Castro, 7, 38611 San Isidro, Santa Cruz de Tenerife
                    </Text>

                    <Text style={paragraph}>
                        Si tienes alguna pregunta, llámanos al{' '}
                        <Link href="tel:+34922173039" style={{ color: '#c41e3a' }}>
                            922 17 30 39
                        </Link>
                    </Text>

                    <Hr style={hr} />

                    <Text style={footer}>
                        © {new Date().getFullYear()} Bar Guantanamera. Todos los derechos reservados.
                        <br />
                        Gracias por elegirnos. ¡Hasta pronto!
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}
