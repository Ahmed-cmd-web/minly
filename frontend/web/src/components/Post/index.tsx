import { Button, Image, notification } from 'antd'
import './index.css'
import { DeleteFilled, EditFilled, LikeTwoTone } from '@ant-design/icons'
import { TPost } from '../../types/TPost'
import ReactPlayer from 'react-player'
import { deletePost, reactToPost } from '../../api/posts'

const Post = ({
  media,
  Liked,
  type,
  _id,
  setUpdating,
  load,
}: TPost & { setUpdating: Function; load: Function }) => {
  return (
    <div className='postContainer'>
      <div style={{ height: '90%' }}>
        {type?.includes('image') ? (
          <Image
            alt={'not found'}
            src={media}
            className='postImage'
            height={'100%'}
            width={'100%'}
          />
        ) : (
          <ReactPlayer url={media} controls width={'100%'} />
        )}
      </div>
      <div className='reactionContainer'>
        <Button
          className='reactionButton'
          style={{
            backgroundColor: Liked ? 'blue' : 'transparent',
            color: Liked ? 'white' : 'black',
          }}
          type='text'
          onClick={async () => {
            try {
              let { status } = await reactToPost(_id, !Liked)
              if (status === 201) {
                notification.success({ message: 'Reacted' })
                load()
              } else notification.error({ message: "Couldn't react" })
            } catch (error) {
              console.log(error)
              notification.error({ message: 'Something went wrong...' })
            }
          }}
        >
          <LikeTwoTone />
          {Liked ? 'Liked' : 'Like'}
        </Button>
        <EditFilled
          className='editIcon'
          style={{ color: 'blue' }}
          onClick={() => setUpdating(_id)}
        />
        <DeleteFilled
          className='deleteIcon'
          style={{ color: 'red' }}
          onClick={async () => {
            try {
              let { status } = await deletePost(_id)
              if (status === 204) {
                notification.success({
                  message: 'post deleted successfully',
                })
                load()
              } else notification.error({ message: "Couldn't delete the post" })
            } catch (error) {
              console.log(error)
              notification.error({ message: 'Something went wrong...' })
            }
          }}
        />
      </div>
    </div>
  )
}

export default Post
