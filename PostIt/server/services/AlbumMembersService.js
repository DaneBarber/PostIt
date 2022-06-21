import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";


class AlbumMembersService {
  
 
  async getAccountAlbumMembers(accountId, albumId) {
    const albumMembers = await dbContext.AlbumMembers.findOne({ accountId: accountId, albumId: albumId })
      .populate('account', 'name picture')
      .populate('album')
      .populate('picture')

    return albumMembers
  }

  async getMyAlbums(accountId) {
    const albums = await dbContext.AlbumMembers.find({ accountId })
      .populate('albums')
    return albums
  }
  async getAllMembersByAlbum(albumId) {
    const albumMembers = await dbContext.AlbumMembers.find({ albumId })
      .populate('account', 'name picture')
    return albumMembers
  }

  async getById(id) {
    const albumMember = await dbContext.AlbumMembers.findById(id)
    if (!albumMember) {
      throw new BadRequest("AlbumMember not found")
    }
    return albumMember
  }
  async create(albumMemberData) {
    const isMember = await this.getAccountAlbumMembers(albumMemberData.accountId, albumMemberData.albumId)
    if (isMember) {
      throw new BadRequest("Already a member")
    }
    const albumMember = await dbContext.AlbumMembers.create(albumMemberData)
    await albumMember.populate('album')
    await albumMember.populate('account')
    await albumMember.populate('picture')
    return albumMember
  }
  async remove(id, userId) {
    const albumMember = await this.getById(id)
    if (albumMember.accountId.toString() !== userId) {
      throw new Forbidden("Denied")
    }
    await albumMember.remove()
  }
}
export const albumMembersService = new AlbumMembersService();
