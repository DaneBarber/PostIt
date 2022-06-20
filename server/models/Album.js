import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const AlbumSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  coverImg: { type: String, required: true },
  creatorId: { type: ObjectId, required: true }
},
  { timestamps: true, toJSON: { virtuals: true } })

AlbumSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})