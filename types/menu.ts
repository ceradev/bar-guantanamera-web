export interface NutritionalInfo {
  fat: string
  carbs: string
  fiber: string
  sodium: string
}

export interface MenuItem {
  name: string
  description: string
  price: string
  image: string
  popular?: boolean
  calories: number
  protein: string
  allergens: string[]
  nutritional: NutritionalInfo
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
  calories: number
  allergens: string[]
}

export interface ComboMeal {
  name: string
  description: string
  price: string
  calories: string
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
