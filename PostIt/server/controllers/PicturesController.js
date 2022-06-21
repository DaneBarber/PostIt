import { picturesService } from "../services/PicturesService.js"
import BaseController from "../utils/BaseController.js"
import { Auth0Provider } from "@bcwdev/auth0provider";
import { logger } from "../utils/Logger.js";


export class PicturesController extends BaseController {
  constructor() {
    super("api/pictures");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .delete("/:id", this.remove)
  }
  async getAll(req, res, next) {
    try {
      if (req.query.albumId === 'null') {
        req.query.albumId = null
      }
      let pictures = await picturesService.getAll(req.query);
      return res.send(pictures);
    } catch (error) {
      next(error)
    }
  }
  async getById(req, res, next) {
    try {
      const picture = await picturesService.getById(req.params.id)
      res.send(picture)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const pictures = await picturesService.create(req.body);
      res.send(pictures);
    } catch (error) {
      next(error)
      logger.log(error)
    }
  }
  async remove(req, res, next) {
    try {
      const pictureId = req.params.id
      const userId = req.userInfo.id
      await picturesService.remove(pictureId, userId)
      res.send("See Ya!!")
    } catch (error) {
      next(error)
    }
  }
}