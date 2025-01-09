import { selectList } from '../../interfaces/global'

interface SelectListCustomProps {
  label: string
  options: selectList[]
  id: string
  getValue: (value: string) => void
}

export default function SelectListCustom(props: SelectListCustomProps) {
  const { label, options, id, getValue } = props

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log('hola')
    getValue(event.target.value)
  }

  return (
    <div className="form-group">
      <label htmlFor="select">{props.label}</label>
      <select className="form-control" id={id} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  )
}
