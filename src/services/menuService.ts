import baseService from './base/baseService'

export class MenuService {
  static async getAllMenusSelectList() {
    return await baseService.get('/Menu/GetAllMenusSelectList')
  }
}
