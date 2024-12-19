export interface calendario {
  date: Date
}

export interface day {
  date: Date
  isCurrentMonth: boolean
  comida?: string
  cena?: string
}
