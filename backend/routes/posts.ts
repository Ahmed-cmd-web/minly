import { Router } from 'express'
import Post from '../models/postModel'
import uploader from '../uploader'

const posts = Router()

posts.get('/', async (_, res) => {
  let query = await Post.find({})
  return res.json(query).status(200)
})

posts.post('/', uploader, async (req, res) => {
  if (req.file) {
    req.body.media = req.file.path
    req.body.type = req.file.mimetype
  }
  let post = new Post(req.body)
  await post.validate()
  await post.save()

  return res.status(201).send('Post created')
})

posts.put('/:id/react', async (req, res) => {
  if (req.body.liked !== undefined) {
    await Post.findByIdAndUpdate(req.params.id, { Liked: req.body.liked })
    return res.status(201).send('reacted!')
  }
  return res.status(400).send('liked in request body is required')
})

posts.put('/:id/changePost', uploader, async (req, res) => {
  if (req.file) {
    req.body.media = req.file.path
    req.body.type = req.file.mimetype
    await Post.findByIdAndUpdate(req.params.id, {
      media: req.body.media,
      type: req.body.type,
    })
    return res.status(201).send('Post created')
  }

  return res.status(400).send('No media attribute found in body')
})

posts.delete('/:id', async (req, res) => {
  await Post.findByIdAndDelete(req.params.id)
  return res.status(204).send('Deleted')
})

export default posts
