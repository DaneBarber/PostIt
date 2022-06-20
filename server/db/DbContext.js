import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { AlbumSchema } from "../models/Album.js";
import { PicturesSchema } from "../models/Picture.js";
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model("Profile", ProfileSchema, 'accounts');
  Albums = mongoose.model('Album', AlbumSchema)
  Pictures = mongoose.model('Pictures', PicturesSchema)
}

export const dbContext = new DbContext()
