export interface calendario {
  date: Date
}

export interface day {
  date: Date
  isCurrentMonth: boolean
  comida?: string
  cena?: string
}

export interface paramsGetDaysByPeriod {
  startDate: string
  endDate: string
}

export interface meal {
  id: number
  date: string
  titleMeal: string
  titleDinner: string
}
