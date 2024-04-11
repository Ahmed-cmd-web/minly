import { Schema } from 'mongoose'

interface IUser {
  username: string
  password: string
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export { UserSchema, IUser }
