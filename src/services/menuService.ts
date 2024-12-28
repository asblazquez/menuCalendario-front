import { paramsGetDaysByPeriod } from '../interfaces/calendario'
import baseService from './base/baseService'

export class MenuService {
  static async getDaysByPeriod(params: paramsGetDaysByPeriod) {
    return await baseService.get('/Day', params)
  }
}
