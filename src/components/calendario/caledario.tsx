import { useEffect, useState } from 'react'
import { calendario, day } from '../../interfaces/calendario'
import Card from './card'
import '../../styles/calendario.scss'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { EmptyMeal } from '../../Utils/Constants'
import { MenuService } from '../../services/menuService'

export default function Calendario(props: calendario) {
  const { date } = props
  const [lDays, setLDays] = useState<day[]>([])
  const [currentDate, setCurrentDate] = useState(date)
  const [titelMonth, setTitelMonth] = useState('')

  useEffect(() => {
    getDays()
    renderTitleMonth()
  }, [currentDate])

  useEffect(() => {
    if (lDays.length > 0) getDaysData()
  }, [lDays])

  const getDaysData = async () => {
    const params = {
      startDate: lDays[0].date,
      endDate: lDays[lDays.length - 1].date
    }

    const days = await MenuService.getDaysByPeriod(params)
    console.log(days)
  }

  const getDays = () => {
    const nDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const firstDayIndex = firstDayOfMonth.getDay()

    const days: day[] = []
    const daysPrevMonth = firstDayIndex === 0 ? 6 : firstDayIndex - 1

    if (firstDayIndex !== 1) {
      var lastDayPrevMonth =
        new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() - daysPrevMonth + 1

      const prevMonth = currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1
      const prevYear =
        currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear()

      Array.from({ length: daysPrevMonth }, (_) => {
        const day = lastDayPrevMonth
        days.push({
          date: new Date(prevYear, prevMonth, day),
          isCurrentMonth: false,
          comida: EmptyMeal,
          cena: EmptyMeal
        })
        lastDayPrevMonth++
      })
    }

    Array.from({ length: nDays }, (_, i) => {
      const day = i + 1
      const month = currentDate.getMonth() + 1
      const year = currentDate.getFullYear()
      days.push({
        date: new Date(`${year}-${month}-${day}`),
        isCurrentMonth: true,
        comida: 'Arroz con pollo',
        cena: 'Sopa'
      })
    })

    setLDays(days)
  }

  const nextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)

    setCurrentDate(newDate)
  }

  const prevMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)

    setCurrentDate(newDate)
  }

  const renderTitleMonth = () => {
    let titel = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
    titel = titel.charAt(0).toUpperCase() + titel.slice(1)
    setTitelMonth(titel)
  }

  return (
    <>
      <h1 className="titleMonth">{titelMonth}</h1>
      <div className="calendario">
        <div className="btnMonth">
          <button type="button" onClick={() => prevMonth()}>
            <FaArrowAltCircleLeft />
          </button>
        </div>
        <section className="mainContent">
          {lDays.map((day, index) => (
            <Card key={index} {...day} />
          ))}
        </section>
        <div className="btnMonth">
          <button type="button" onClick={() => nextMonth()}>
            <FaArrowAltCircleRight />
          </button>
        </div>
      </div>
    </>
  )
}
