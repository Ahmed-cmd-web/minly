import 'express-async-errors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import morgan from 'morgan'
import posts from './routes/posts'
import cors from 'cors'

dotenv.config()
const uri = process.env.mongoDB_URI || ''
const port = process.env.PORT || 8000
mongoose
  .connect(`${uri}/minly`)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err))
const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/posts', posts)
app.disable('etag')

app.listen(port, () => console.log(`app listening on port ${port}!`))
