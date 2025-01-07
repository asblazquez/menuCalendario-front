import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router'
import * as yup from 'yup'
import TextFieldCustom from '../components/form/TextFieldCustom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import './logIn.scss'
import { FaCircleUser } from 'react-icons/fa6'
import { FaLock } from 'react-icons/fa'
import { LogInService } from '../services/logInService'

export default function LogIn() {
  const [cookies, setCookie] = useCookies()
  const navigate = useNavigate()

  const handleLogIn = () => {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000
    const expirationDate = new Date(Date.now() + oneDayInMilliseconds)
    setCookie(
      'user',
      {
        id: 1,
        name: 'Andres',
        email: 'asanchezb23@gmail.com'
      },
      { path: '/', expires: expirationDate }
    )

    navigate('/')
  }

  const schema = yup
    .object()
    .shape({
      user: yup.string().required(),
      password: yup.string().required()
    })
    .required()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const logIn = async (data: any) => {
    const response = await LogInService.logIn(data)
    if (response) handleLogIn()
  }
  console.log(errors)
  return (
    <div className="logIn">
      <form onSubmit={handleSubmit(logIn)}>
        <div className="row">
          <FaCircleUser className="icon" />
          <TextFieldCustom
            control={control}
            name="user"
            label="Username"
            error={!!errors.user}
            helperText={errors?.user?.message}
          />
        </div>
        <div className="row">
          <FaLock className="icon" />
          <TextFieldCustom
            control={control}
            name="password"
            label="Password"
            error={!!errors.password}
            helperText={errors?.password?.message}
            type="password"
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}
