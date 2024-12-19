import { day } from '../../interfaces/calendario'
import { EnumDaysOfWeek } from '../../Utils/Constants'
import { FaSun } from 'react-icons/fa'
import { FaMoon } from 'react-icons/fa'

export default function Card(props: day) {
  const { date, isCurrentMonth, comida, cena } = props
  return (
    <article className={`card ${isCurrentMonth ? 'current' : 'prev'}`}>
      <h2>{EnumDaysOfWeek[date.getDay()]}</h2>
      <div className="content">
        <div className="item">
          <FaSun className="icon food" />
          <p>{comida}</p>
        </div>
        <div className="item">
          <FaMoon className="icon dinner" />
          <p>{cena}</p>
        </div>
      </div>
    </article>
  )
}
