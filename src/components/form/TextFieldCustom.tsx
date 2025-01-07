import { Controller } from 'react-hook-form'
import '../../styles/formComponents.scss'
import { MdError } from 'react-icons/md'

interface TextFieldCustomProps {
  control: any
  name: string
  label: string
  disabled?: boolean
  error: boolean
  helperText?: string
  defaultValue?: unknown
  type?: string
}

export default function TextFieldCustom(props: TextFieldCustomProps) {
  const { control, name, disabled, label, error, helperText, type = 'text' } = props

  return (
    <div className="textFieldCustom">
      <Controller
        control={control}
        name={name}
        disabled={disabled}
        render={({ field }) => <input type={type} placeholder={label} {...field} />}
      />
      {error && (
        <span className="helperText">
          {<MdError className="icon" />} {helperText}
        </span>
      )}
    </div>
  )
}
