import { Schema, Types } from 'mongoose'

interface IPost {
  media: string
  Liked?: boolean
  uploadedBy?: Types.ObjectId
  uploadedAt?: Date
  type: string
}

const PostSchema = new Schema<IPost>({
  media: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    required: false,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  Liked: {
    type: Boolean,
    default: false,
  },
})

export { PostSchema, IPost }
