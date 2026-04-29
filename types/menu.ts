export interface OptionGroup {
  id: string
  name: string
  options: string[]
  defaultOption?: string
}

export interface MenuItem {
  name: string
  description: string
  price: string
  image?: string
  popular?: boolean
  iconic?: boolean
  spicy?: boolean
  vegetarian?: boolean
  active?: boolean
  madeToOrder?: boolean
  customizable?: boolean
  optionGroups?: OptionGroup[]
}

export interface MenuCategory {
  title: string
  subtitle: string
  items: MenuItem[]
}

export interface Beverage {
  name: string
  description: string
  price: string
  image?: string
  category?: 'refrescos' | 'cervezas' | 'agua'
  active?: boolean
}

export interface Mojo {
  name: string
  description: string
  price: string
  image?: string
  spicy?: boolean
  vegetarian?: boolean
  active?: boolean
}

export interface ComboMeal {
  name: string
  description: string
  price: string
  image?: string
  icon: string
  active?: boolean
  customizable?: boolean
  optionGroups?: OptionGroup[]
}

export interface MenuData {
  menuCategories: Record<string, MenuCategory>
  bebidas: Beverage[]
  mojos: Mojo[]
  comboMeals: ComboMeal[]
}
