import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from '../utils/Errors.js'

class PicturesService {

  async getAll(query = {}) {
    const pictures = await dbContext.Pictures.find(query)
    return pictures;
  }
  async getById(id) {
    const picture = await dbContext.Pictures.findById(id)
    return picture
  }
  async create(body) {
    const picture = await dbContext.Pictures.create(body)
    return picture
  }
  async remove(pictureId, userId) {
    const picture = await this.getById(pictureId)
    if (picture.creatorId.toString() !== userId) {
      throw new Forbidden("Denied")
    }
    await picture.remove()
  }
}

export const picturesService = new PicturesService();