import { logInParams } from '../interfaces/logIn'
import baseService from './base/baseService'

export class LogInService {
  static async logIn(params: logInParams) {
    return await baseService.get('login/login', params)
  }
}
