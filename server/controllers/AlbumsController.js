import { albumsService } from "../services/AlbumsService.js";
import BaseController from "../utils/BaseController.js"

export class AlbumsController extends BaseController {
  constructor() {
    super("api/albums");
    this.router
      .get("", this.getAll)
  }
  async getAll(req, res, next) {
    try {
      let albums = await albumsService.getAll();
      return res.send(albums);
    } catch (error) {
      next(error)
    }
  }
}