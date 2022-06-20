import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const PicturesSchema = new Schema({
  imgUrl: { type: String, required: true },
  albumId: { type: ObjectId, required: true },
  creatorId: { type: ObjectId, ref: "Profile", required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

PicturesSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile',
})