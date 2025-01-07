import { paramsGetDaysByPeriod } from '../interfaces/calendario'
import baseService from './base/baseService'

export class DayService {
  static async getDaysByPeriod(params: paramsGetDaysByPeriod) {
    return await baseService.get('/Day/GetDaysByPeriod', params)
  }
}
