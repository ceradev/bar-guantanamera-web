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

            <div ref={productsRef} className="lg:col-span-2 lg:col-start-1 space-y-8 overflow-y-auto md:min-h-[110vh] max-h-[calc(100vh-220px)] p-6 border border-gray-100 rounded-2xl">
                {Object.entries(menuCategories).map(([key, category]: [string, any]) => (
                    <section key={key} id={`cat-${key}`} className="space-y-4">
                        <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">{category.title}</h3>
                            <span className="text-base text-gray-500">{category.subtitle}</span>
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

                {/* Sección: Platos combinados */}
                <section className="space-y-4" id="cat-combos">
                    <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Platos Combinados</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {comboMeals.map(combo => (
                            <div key={combo.name} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex items-start gap-4">
                                <div className="text-5xl leading-none">{combo.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between">
                                        <div className="text-gray-900 font-semibold text-lg flex-1">{combo.name}</div>
                                        <div className="text-red-600 font-bold text-md">{combo.price}</div>
                                    </div>
                                    {combo.description && (
                                        <div className="text-base text-gray-500 mt-2">{combo.description}</div>
                                    )}
                                    <div className="mt-4">
                                        <Button
                                            onClick={() => addToCart({ name: combo.name, price: combo.price } as any)}
                                            className="bg-red-600 text-white hover:bg-red-700 rounded-full"
                                            disabled={inactiveNames.includes(combo.name) || !canOrder}
                                        >
                                            {inactiveNames.includes(combo.name) ? "No disponible" : "+ Añadir"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sección: Mojos y salsas */}
                <section className="space-y-4" id="cat-salsas">
                    <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Mojos y Salsas</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {mojos.map(mojo => (
                            <div key={mojo.name} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                        {mojo.spicy ? <Flame className="w-5 h-5 text-red-600" /> : <span className="text-xl">🫙</span>}
                                    </div>
                                    <div>
                                        <div className="text-gray-900 font-semibold text-md">{mojo.name}</div>
                                        {mojo.spicy && <div className="text-xs text-red-500 mt-1">Picante</div>}
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-red-600 font-bold text-md mr-2">{mojo.price}</div>
                                    <Button
                                        onClick={() => addToCart({ name: mojo.name, price: mojo.price } as any)}
                                        variant="outline"
                                        className="rounded-full"
                                        disabled={inactiveNames.includes(mojo.name) || !canOrder}
                                    >
                                        {inactiveNames.includes(mojo.name) ? "No disponible" : "+ Añadir"}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Sección: Bebidas */}
                <section className="space-y-4" id="cat-bebidas">
                    <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Bebidas</h3>
                    </div>
                    <div className="space-y-6">
                        {Object.entries(beveragesByCategory).map(([category, drinks]) => (
                            <div key={category} className="space-y-3">
                                <div className="flex items-center gap-3 border-b border-gray-100 px-2 py-2">
                                    {category === "refrescos" && <CupSoda className="w-5 h-5 text-red-600" />}
                                    {category === "cervezas" && <Beer className="w-5 h-5 text-amber-600" />}
                                    {category === "agua" && <GlassWater className="w-5 h-5 text-blue-600" />}
                                    <h4 className="text-lg font-semibold text-gray-900 capitalize">{category}</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {drinks.map((drink: any) => (
                                        <div key={drink.name} className="rounded-2xl border border-gray-100 bg-white shadow-sm p-6 flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="text-gray-900 font-semibold text-md">{drink.name}</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-red-600 font-bold text-md mr-2">{drink.price}</div>
                                                <Button
                                                    onClick={() => addToCart({ name: drink.name, price: drink.price } as any)}
                                                    variant="outline"
                                                    className="rounded-full"
                                                    disabled={inactiveNames.includes(drink.name) || !canOrder}
                                                >
                                                    {inactiveNames.includes(drink.name) ? "No disponible" : "+ Añadir"}
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
