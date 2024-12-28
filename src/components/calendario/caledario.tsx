import { useEffect, useState } from 'react'
import { calendario, day, meal, paramsGetDaysByPeriod } from '../../interfaces/calendario'
import Card from './card'
import '../../styles/calendario.scss'
import { FaArrowAltCircleRight } from 'react-icons/fa'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { MenuService } from '../../services/menuService'
import { formatDateToServer, formatStringToDate } from '../../Utils/utils'

export default function Calendario(props: calendario) {
  const { date } = props
  const [lDays, setLDays] = useState<day[]>([])
  const [currentDate, setCurrentDate] = useState(date)
  const [titelMonth, setTitelMonth] = useState('')

  useEffect(() => {
    getDays()
    renderTitleMonth()
  }, [currentDate])

  const getDaysData = async (firstDay: Date, lastDay: Date) => {
    const params: paramsGetDaysByPeriod = {
      startDate: formatDateToServer(firstDay),
      endDate: formatDateToServer(lastDay)
    }

    const days = (await MenuService.getDaysByPeriod(params)) as meal[]
    return days
  }

  const getDays = async () => {
    const { firstDay, lastDay } = getPeriod()
    const lMenus: meal[] = await getDaysData(firstDay, lastDay)
    const nDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const firstDayIndex = firstDayOfMonth.getDay()

    console.log(lMenus)

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
        const date = new Date(prevYear, prevMonth, day)
        date.setHours(0, 0, 0, 0)
        const menu = lMenus.find((x) => formatStringToDate(x.date)?.getTime() == date.getTime())

        days.push({
          date: date,
          isCurrentMonth: false,
          comida: menu?.titleMeal,
          cena: menu?.titleDinner
        })
        lastDayPrevMonth++
      })
    }

    Array.from({ length: nDays }, (_, i) => {
      const day = i + 1
      const month = currentDate.getMonth() + 1
      const year = currentDate.getFullYear()

      const date = new Date(`${year}-${month}-${day}`)
      date.setHours(0, 0, 0, 0)
      const menu = lMenus.find((x) => formatStringToDate(x.date)?.getTime() == date.getTime())
      days.push({
        date: date,
        isCurrentMonth: true,
        comida: menu?.titleMeal,
        cena: menu?.titleDinner
      })
    })

    setLDays(days)
  }

  const getPeriod = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1

    // Crear una fecha para el primer día del mes
    const primerDia = new Date(year, month - 1, 1) // Los meses en JavaScript empiezan desde 0
    const firstDayIndex = primerDia.getDay()
    const daysPrevMonth = firstDayIndex === 0 ? 6 : firstDayIndex - 1
    const lastDayPrevMonth =
      new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() - daysPrevMonth + 1

    const firstDay = new Date(year, month - 2, lastDayPrevMonth)
    // Obtener el mes siguiente
    const siguienteMes = new Date(year, month, 1)

    // Restar un día al siguiente mes para obtener el último día del mes anterior
    const lastDay = new Date(siguienteMes)
    lastDay.setDate(lastDay.getDate() - 1)
    console.log(lastDay)
    return {
      firstDay,
      lastDay
    }
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
