import { model } from 'mongoose'
import { IUser, UserSchema } from '../schemas/userSchema'

const User = model<IUser>('User', UserSchema)

export default User
