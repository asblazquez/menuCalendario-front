import { selectList } from '../../interfaces/global'

interface SelectListCustomProps {
  label: string
  options: selectList[]
  id: string
  hasSelected: boolean
  styles?: string
  defaultValue?: number
  getValue: (value: string) => void
}

export default function SelectListCustom(props: SelectListCustomProps) {
  const { label, options, id, getValue, hasSelected, styles, defaultValue } = props

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('hola')
    getValue(event.target.value)
  }

  return (
    <div className="selectList">
      <label htmlFor="select">{props.label}</label>
      <select className={`${styles}`} id={id} onChange={onChange} defaultValue={defaultValue}>
        {hasSelected ? (
          <option value="" selected>
            -- Seleccione --
          </option>
        ) : null}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}
