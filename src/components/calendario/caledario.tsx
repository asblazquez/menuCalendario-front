import { useEffect, useState } from 'react'
import { calendario, day } from '../../interfaces/calendario'
import Card from './card'
import '../../styles/calendario.scss'

export default function Calendario(props: calendario) {
  const { date } = props
  const [lDays, setLDays] = useState<day[]>([])

  useEffect(() => {
    getDays()
  }, [date])

  const getDays = () => {
    const nDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const firstDayIndex = firstDayOfMonth.getDay()

    const days: day[] = []
    const daysPrevMonth = firstDayIndex === 0 ? 6 : firstDayIndex - 1

    if (firstDayIndex !== 1) {
      const prevMonth = date.getMonth() - 1
      const prevYear = prevMonth < 0 ? date.getFullYear() - 1 : date.getFullYear()
      const prevMonthDays = new Date(prevYear, prevMonth + 1, 0).getDate()

      Array.from({ length: daysPrevMonth }, (_, i) => {
        const day = prevMonthDays - daysPrevMonth + i + 1
        days.push({ date: new Date(prevYear, prevMonth, day), isCurrentMonth: false })
      })
    }

    Array.from({ length: nDays }, (_, i) => {
      const day = i + 1
      const month = date.getMonth() + 1
      const year = date.getFullYear()
      days.push({
        date: new Date(`${year}-${month}-${day}`),
        isCurrentMonth: true,
        comida: 'Arroz con pollo',
        cena: 'Sopa'
      })
    })

    setLDays(days)
  }

  console.log(lDays)

  return (
    <section className="calendario">
      {lDays.map((day, index) => (
        <Card key={index} {...day} />
      ))}
    </section>
  )
}
