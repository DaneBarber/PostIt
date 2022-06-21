import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from '../utils/Errors.js'

class AlbumsService {

  async getAll(query = {}) {
    const albums = await dbContext.Albums.find(query).populate('creator', 'name picture')
    return albums;
  }
  async getById(id) {
    const album = await dbContext.Albums.findById(id).populate('creator', 'name picture')
    return album
  }
  async create(body) {
    const album = await dbContext.Albums.create(body)
    await album.populate('creator', 'name picture')
    return album
  }
  async update(id, update) {
    const original = await dbContext.Albums.findById(id).populate('creator', 'name picture')
    if (original.creatorId.toString() !== update.creatorId) {
      throw new BadRequest("Denied")
    }
    original.name = update.name ? update.name : original.name
    original.coverImg = update.coverImg ? update.coverImg : original.coverImg
    await original.save()
    return update
  }
  async remove(albumId, userId) {
    const album = await this.getById(albumId)
    if (album.creatorId.toString() !== userId) {
      throw new Forbidden("Denied")
    }
    await album.remove()
    return 'Album removed'
  }
}

export const albumsService = new AlbumsService();