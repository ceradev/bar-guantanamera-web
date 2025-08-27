export interface MenuItem {
  name: string
  description: string
  price: string
  image: string
  popular?: boolean
  allergens: string[]
}

export interface MenuCategory {
  title: string
  subtitle: string
  items: MenuItem[]
}

export interface BeverageOrMojo {
  name: string
  description: string
  price: string
  allergens: string[]
}

export interface ComboMeal {
  name: string
  description: string
  price: string
  icon: string
}

export interface MenuData {
  allergenIcons: Record<string, string>
  menuCategories: Record<string, MenuCategory>
  bebidasYMojos: {
    bebidas: BeverageOrMojo[]
    mojos: BeverageOrMojo[]
  }
  comboMeals: ComboMeal[]
}
