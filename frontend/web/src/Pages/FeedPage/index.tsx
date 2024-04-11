import { useEffect, useState } from 'react'
import { changePost, createPost, getPosts } from '../../api/posts'
import Post from '../../components/Post'
import { TPost } from '../../types/TPost'
import { Button, Modal, notification, Upload } from 'antd'
import './index.css'
import { UploadOutlined } from '@ant-design/icons'

const { Dragger } = Upload

const FeedPage = () => {
  const [posts, setPosts] = useState<TPost[]>([])
  const [openUpload, setOpenUpload] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [media, setMedia] = useState<FormData>(new FormData())
  const [loading, setLoading] = useState(false)
  const [updating, setUpdating] = useState<string>('')
  const loadPosts = async () => {
    try {
      let res = await getPosts()
      if (res.status === 200) setPosts(res.data)
    } catch (error) {
      console.log(error)
      notification.error({ message: 'Failed to load posts' })
    }
  }
  const uploadPost = async () => {
    setLoading(true)
    try {
      let { status } = await createPost(media)
      if (status === 201) {
        notification.success({ message: 'Post uploaded' })
        setOpenUpload(false)
        setUploaded(false)
        loadPosts()
      } else notification.error({ message: 'Failed to upload post' })
    } catch (error) {
      console.log(error)
      notification.error({ message: 'Failed to upload post' })
    } finally {
      setLoading(false)
    }
  }

  const updatePost = async () => {
    setLoading(true)
    try {
      let { status } = await changePost(updating, media)
      if (status === 201) {
        notification.success({ message: 'Post updated' })
        setOpenUpload(false)
        setUpdating('')
        setUploaded(false)
        loadPosts()
      } else notification.error({ message: 'Failed to update post' })
    } catch (error) {
      console.log(error)
      notification.error({ message: 'Failed to update post' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])
  return (
    <main className='feedContainer'>
      {posts.length > 0 &&
        posts.map((post) => (
          <Post
            key={post._id}
            {...post}
            setUpdating={setUpdating}
            load={loadPosts}
          />
        ))}
      <Button
        className='uploadButton'
        onClick={() => setOpenUpload(true)}
        type='primary'
        size='large'
      >
        <UploadOutlined />
        Upload
      </Button>
      {
        <Modal
          open={openUpload || updating.length > 0}
          footer={null}
          title={updating.length > 0 ? 'Change Post' : 'New Post'}
          onCancel={() => {
            setUpdating('')
            setOpenUpload(false)
          }}
          className='uploadModal'
          style={{ padding: '20px' }}
        >
          <div>
            <Dragger
              className='uploadComponent'
              maxCount={1}
              customRequest={({ onSuccess, file }) => {
                if (onSuccess) onSuccess('ok')

                setUploaded(true)
                let form = new FormData()
                form.append('media', file)
                setMedia(form)
              }}
              onRemove={() => setUploaded(false)}
            >
              <UploadOutlined className='uploadIcon' />
              <p>Click or drag file to this area to upload</p>
              <p>Support for a single upload</p>
            </Dragger>
            <Button
              type='primary'
              className='modalUploadButton'
              onClick={updating.length > 0 ? updatePost : uploadPost}
              disabled={!uploaded}
              loading={loading}
            >
              Upload
            </Button>
          </div>
        </Modal>
      }
    </main>
  )
}

export default FeedPage
