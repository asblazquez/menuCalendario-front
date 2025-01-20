import { useEffect, useState } from 'react'
import { day } from '../../interfaces/calendario'
import { EnumDaysOfWeek } from '../../Utils/Constants'
import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'
import SelectListCustom from '../form/SelectListCustom'
import { DayService } from '../../services/dayService'
import { formatDateToServer } from '../../Utils/utils'
import { toast } from 'react-toastify'

export default function Card(props: day) {
  const { date, isCurrentMonth, comida, cena, lMenus, reload } = props
  const [isHovered, setIsHovered] = useState(false)

  const getValue = async (value: string, isMeal: boolean) => {
    console.log('hola2')
    let response
    if (isMeal) {
      response = (await DayService.AddEditMealDay({
        date: formatDateToServer(date),
        idMenu: parseInt(value)
      })) as string
    } else {
      response = (await DayService.AddEditDinnerDay({
        date: formatDateToServer(date),
        idMenu: parseInt(value)
      })) as string
    }

    if (response) {
      reload()
      toast.success(response)
    }
  }

  const getValueMeal = (value: string) => {
    getValue(value, true)
  }

  const getValueDinner = (value: string) => {
    getValue(value, false)
  }

  return (
    <article
      className={`card ${isCurrentMonth ? 'current' : 'prev'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <h2 className="title">{`${EnumDaysOfWeek[date.getDay()]} ${date.getDate()}`}</h2>
      <div className="content">
        {isHovered ? (
          <>
            <SelectListCustom
              label="Comida"
              options={lMenus ?? []}
              id={`comida${date.getDate()}`}
              getValue={getValueMeal}
              hasSelected
            />
            <SelectListCustom
              label="Cena"
              options={lMenus ?? []}
              id={`comida${date.getDate()}`}
              getValue={getValueDinner}
              hasSelected
            />
          </>
        ) : (
          <>
            <div className="item">
              <FaSun className="icon food" />
              <p>{comida}</p>
            </div>
            <div className="item">
              <FaMoon className="icon dinner" />
              <p>{cena}</p>
            </div>
          </>
        )}
      </div>
    </article>
  )
}
