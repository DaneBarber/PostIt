import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from '../utils/Errors.js'

class AlbumsService {

  async getAll() {
    const albums = await dbContext.Albums.find()
    return albums;
  }
  async getById(id) {
    const album = await dbContext.Albums.findById(id)
    return album
  }
  async create(body) {
    const album = await dbContext.Albums.create(body)
    return album
  }
  async remove(albumId, userId) {
    const album = await this.getById(albumId)
    if (album.creatorId.toString() !== userId) {
      throw new Forbidden("Denied")
    }
    await album.remove()
  }
}

export const albumsService = new AlbumsService();