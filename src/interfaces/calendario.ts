import { selectList } from './global'

export interface calendario {
  date: Date
}

export interface day {
  date: Date
  isCurrentMonth: boolean
  comida?: string
  cena?: string
  lMenus?: selectList[]
  reload?: any
}

export interface paramsGetDaysByPeriod {
  startDate: string
  endDate: string
}

export interface paramsAddEditMealDay {
  date: string
  idMenu: number
}

export interface meal {
  id: number
  date: string
  titleMeal: string
  titleDinner: string
}
