import React from "react"
import { Button } from "@/components/ui/button"
import { Flame, CupSoda, Beer, GlassWater } from "lucide-react"
import CategoryTabs from "./category-tabs"
import ProductCard from "./product-card"

interface MenuProductGridProps {
    productsRef: React.RefObject<HTMLDivElement | null>
    allCategories: any
    activeCategory: string | null
    scrollToCategory: (id: string) => void
    menuCategories: any
    cart: any
    inactiveNames: string[]
    canOrder: boolean
    addToCart: (item: any) => void
    increase: (name: string) => void
    decrease: (name: string) => void
    removeItem: (name: string) => void
    comboMeals: any[]
    mojos: any[]
    beveragesByCategory: Record<string, any[]>
}

export default function MenuProductGrid({
    productsRef,
    allCategories,
    activeCategory,
    scrollToCategory,
    menuCategories,
    cart,
    inactiveNames,
    canOrder,
    addToCart,
    increase,
    decrease,
    removeItem,
    comboMeals,
    mojos,
    beveragesByCategory
}: MenuProductGridProps) {
    return (
        <>
            <div className="lg:col-span-3 lg:col-start-1">
                <CategoryTabs categories={allCategories} activeKey={activeCategory} onSelect={scrollToCategory} />
            </div>

            <div ref={productsRef} className="lg:col-span-2 lg:col-start-1 flex flex-col gap-8 overflow-y-auto md:min-h-[110vh] max-h-[calc(100vh-220px)] p-6 border border-border rounded-xl">
                {Object.entries(menuCategories).map(([key, category]: [string, any]) => (
                    <section key={key} id={`cat-${key}`} className="flex flex-col gap-4">
                        <div className="flex items-baseline justify-between border-b border-border pb-4">
                            <h3 className="text-xl md:text-2xl font-bold text-foreground">{category.title}</h3>
                            <span className="text-sm text-muted-foreground font-body">{category.subtitle}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {category.items.map((item: any) => {
                                const inCart = cart[item.name]
                                const inactive = inactiveNames.includes(item.name)
                                return (
                                    <ProductCard
                                        key={item.name}
                                        item={item}
                                        inCart={inCart}
                                        isOpenNow={canOrder}
                                        inactive={inactive}
                                        onAdd={() => addToCart(item)}
                                        onIncrease={() => increase(item.name)}
                                        onDecrease={() => decrease(item.name)}
                                        onRemove={() => removeItem(item.name)}
                                    />
                                )
                            })}
                        </div>
                    </section>
                ))}

                {/* Platos combinados */}
                <section className="flex flex-col gap-4" id="cat-combos">
                    <div className="flex items-baseline justify-between border-b border-border pb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">Platos Combinados</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {comboMeals.map(combo => (
                            <div key={combo.name} className="rounded-xl border border-border bg-card shadow-sm p-5 flex items-start gap-4">
                                <div className="text-4xl leading-none">{combo.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between">
                                        <div className="text-foreground font-semibold text-base flex-1">{combo.name}</div>
                                        <div className="text-primary font-bold text-sm">{combo.price}</div>
                                    </div>
                                    {combo.description && (
                                        <div className="text-sm text-muted-foreground font-body mt-1">{combo.description}</div>
                                    )}
                                    <div className="mt-3">
                                        <Button
                                            onClick={() => addToCart({ name: combo.name, price: combo.price } as any)}
                                            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm text-sm font-semibold"
                                            disabled={inactiveNames.includes(combo.name) || !canOrder}
                                        >
                                            {inactiveNames.includes(combo.name) ? "No disponible" : "+ Anadir"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mojos y salsas */}
                <section className="flex flex-col gap-4" id="cat-salsas">
                    <div className="flex items-baseline justify-between border-b border-border pb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">Mojos y Salsas</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mojos.map(mojo => (
                            <div key={mojo.name} className="rounded-xl border border-border bg-card shadow-sm p-5 flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        {mojo.spicy ? <Flame className="w-5 h-5 text-primary" /> : <span className="text-xl">{"🫙"}</span>}
                                    </div>
                                    <div>
                                        <div className="text-foreground font-semibold text-sm">{mojo.name}</div>
                                        {mojo.spicy && <div className="text-xs text-primary mt-0.5">Picante</div>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-primary font-bold text-sm">{mojo.price}</div>
                                    <Button
                                        onClick={() => addToCart({ name: mojo.name, price: mojo.price } as any)}
                                        variant="outline"
                                        className="rounded-sm border-border text-sm"
                                        disabled={inactiveNames.includes(mojo.name) || !canOrder}
                                    >
                                        {inactiveNames.includes(mojo.name) ? "No disponible" : "+ Anadir"}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Bebidas */}
                <section className="flex flex-col gap-4" id="cat-bebidas">
                    <div className="flex items-baseline justify-between border-b border-border pb-4">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">Bebidas</h3>
                    </div>
                    <div className="flex flex-col gap-6">
                        {Object.entries(beveragesByCategory).map(([category, drinks]) => (
                            <div key={category} className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 border-b border-border px-2 py-2">
                                    {category === "refrescos" && <CupSoda className="w-5 h-5 text-primary" />}
                                    {category === "cervezas" && <Beer className="w-5 h-5 text-primary" />}
                                    {category === "agua" && <GlassWater className="w-5 h-5 text-primary" />}
                                    <h4 className="text-base font-semibold text-foreground capitalize">{category}</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {drinks.map((drink: any) => (
                                        <div key={drink.name} className="rounded-xl border border-border bg-card shadow-sm p-5 flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="text-foreground font-semibold text-sm">{drink.name}</div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-primary font-bold text-sm">{drink.price}</div>
                                                <Button
                                                    onClick={() => addToCart({ name: drink.name, price: drink.price } as any)}
                                                    variant="outline"
                                                    className="rounded-sm border-border text-sm"
                                                    disabled={inactiveNames.includes(drink.name) || !canOrder}
                                                >
                                                    {inactiveNames.includes(drink.name) ? "No disponible" : "+ Anadir"}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}
