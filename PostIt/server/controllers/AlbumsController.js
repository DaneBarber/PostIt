import { albumsService } from "../services/AlbumsService.js";
import { picturesService } from "../services/PicturesService.js"
import { albumMembersService } from "../services/AlbumMembersService.js";
import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider";
import { logger } from "../utils/Logger.js";


export class AlbumsController extends BaseController {
  constructor() {
    super("api/albums");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get('/:albumId/albummembers', this.getAllMembersByAlbum)
      .get('/:id/pictures', this.getPicturesByAlbumId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.update)
      .delete("/:id", this.remove)
  }
  getAllMembersByAlbum(albumId, req, res, next) {

    try {
      let albumMembers = albumMembersService.getAllMembersByAlbum(albumId)
      return res.send(albumMembers)
    } catch (error) {
      next(error)
    }
  }
  async getAll(req, res, next) {
    try {
      let albums = await albumsService.getAll();
      res.send(albums);
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const album = await albumsService.getById(req.params.id)
      res.send(album)
    } catch (error) {
      next(error)
    }
  }
  async getPicturesByAlbumId(req, res, next) {
    try {
      const pictures = await picturesService.getAll({ albumId: req.params.id })
      return res.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const albums = await albumsService.create(req.body);
      res.send(albums);
    } catch (error) {
      next(error)
      logger.log(error)
    }
  }
  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const album = await albumsService.update(req.params.id, req.body)
      res.send(album)

    } catch (error) {
      next(error)
    }

  }
  async remove(req, res, next) {
    try {
      const albumId = req.params.id
      const userId = req.userInfo.id
      await albumsService.remove(albumId, userId)
      res.send("See Ya!!")
    } catch (error) {
      next(error)
    }
  }
}