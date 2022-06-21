import { Auth0Provider } from '@bcwdev/auth0provider'
import { albumMembersService } from '../services/AlbumMembersService.js'
import BaseController from '../utils/BaseController.js'


export class AlbumMembersController extends BaseController {
  constructor() {
    super('api/albummembers')
    this.router
      
      
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .delete('/:id', this.remove)

  }

  getAlbumsByMember(arg0, getAlbumsByMember) {
    throw new Error("Method not implemented.")
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const albumMember = await albumMembersService.create(req.body)
      return res.send(albumMember)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      await albumMembersService.remove(req.params.id, req.userInfo.id)
      return res.send('AlbumMember removed')
    } catch (error) {
      next(error)
    }
  }
}