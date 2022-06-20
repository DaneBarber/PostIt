import { dbContext } from "../db/DbContext.js";

class AlbumsService {
  async getAll() {
    const albums = await dbContext.Albums.find()
    return albums;
  }
}

export const albumsService = new AlbumsService();