import { paramsAddEditMealDay, paramsGetDaysByPeriod } from '../interfaces/calendario'
import baseService from './base/baseService'

export class DayService {
  static async getDaysByPeriod(params: paramsGetDaysByPeriod) {
    return await baseService.get('/Day/GetDaysByPeriod', params)
  }

  static async AddEditMealDay(params: paramsAddEditMealDay) {
    return await baseService.post('/Day/AddEditMealDay', params)
  }

  static async AddEditDinnerDay(params: paramsAddEditMealDay) {
    return await baseService.post('/Day/AddEditDinnerDay', params)
  }
}
