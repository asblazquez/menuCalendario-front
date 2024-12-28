import baseService from './base/baseService'

export class MenuService {
  static async getDaysByPeriod(params: object) {
    return await baseService.get('/GetDaysByPeriod', params)
  }
}
