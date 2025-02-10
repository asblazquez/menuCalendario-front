import { selectList } from './global'

export interface calendario {
  date: Date
}

export interface day {
  date: Date
  isCurrentMonth: boolean
  comida?: selectList
  cena?: selectList
  lMenus?: selectList[]
  reload?: any
  isEditMode: boolean
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
  meal: selectList
  dinner: selectList
}
