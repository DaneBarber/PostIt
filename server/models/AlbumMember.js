import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AlbumMemberSchema = new Schema({
  albumId: { type: ObjectId, ref: "Album", required: true },
  accountId: { type: ObjectId, ref: "Profile", required: true },
  creatorId: { type: ObjectId, ref: "Profile", required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

AlbumMemberSchema.virtual('album', {
  localField: 'albumId',
  foreignField: '_id',
  justOne: true,
  ref: 'Album',
})

AlbumMemberSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile',
})

AlbumMemberSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile',
})

