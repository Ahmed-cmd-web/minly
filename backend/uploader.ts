import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from 'multer'

dotenv.config()

cloudinary.config({
  cloud_name: process.env.cloudinary_CLOUD_NAME,
  api_key: process.env.cloudinary_API_KEY,
  api_secret: process.env.cloudinary_API_SECRET,
  secure: true,
})



const storage = new CloudinaryStorage({
  cloudinary,
  params: () => ({
    folder: 'uploads',
    resource_type: 'auto',
  }),
})

const upload = multer({ storage })

export default upload.single('media')
export { cloudinary }
