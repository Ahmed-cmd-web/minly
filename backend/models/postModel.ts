import { model } from 'mongoose'
import { IPost, PostSchema } from '../schemas/postSchema'

const Post = model<IPost>('Post', PostSchema)

export default Post


