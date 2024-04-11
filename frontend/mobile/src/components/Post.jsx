import React from 'react'
import { Card, IconButton, MD3Colors } from 'react-native-paper'
import { ResizeMode, Video } from 'expo-av'
import { changePost, deletePost, reactToPost } from '../api/posts'
import requestPermission from '../utils/requestPermission'
import * as ImagePicker from 'expo-image-picker'

const Post = ({
  media,
  Liked,
  type = 'video',
  _id,
  load,
  setLoading,
  setProgress,
}) => {
  return (
    <Card
      style={{
        margin: 5,
        width: '95%',
        backgroundColor: 'white',
      }}
    >
      {type.includes('image') ? (
        <Card.Cover
          source={{ uri: media }}
          height={300}
          style={{ height: 200 }}
          resizeMethod='resize'
          resizeMode='stretch'
        />
      ) : (
        <Video
          style={{
            height: 200,
          }}
          source={{
            uri: media,
          }}
          useNativeControls
          resizeMode={ResizeMode.STRETCH}
          isLooping
          shouldPlay
        />
      )}
      <Card.Actions
        style={{
          flexDirection: 'row',
        }}
      >
        <IconButton
          icon={Liked ? 'thumb-up' : 'thumb-up-outline'}
          onPress={async () => {
            try {
              let { status } = await reactToPost(_id, !Liked)
              if (status === 201) load()
            } catch (error) {
              console.log(error)
            }
          }}
          iconColor={Liked ? 'white' : MD3Colors.text}
          containerColor={Liked ? 'blue' : MD3Colors.text}
          animated
        />
        <IconButton
          icon='tooltip-edit'
          iconColor={MD3Colors.text}
          containerColor='transparent'
          onPress={async () => {
            let permitted = await requestPermission()
            if (permitted) {
              try {
                setLoading(true)
                let media = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: true,
                  quality: 1,
                })

                let { status } = await changePost(
                  _id,
                  media.assets[0].uri,
                  setProgress
                )
                if (status === 200) load()
              } catch (error) {
                console.log(error.message)
              } finally {
                setLoading(false)
                setProgress(0)
              }
            }
          }}
        />
        <IconButton
          icon='delete'
          iconColor={MD3Colors.error50}
          containerColor='transparent'
          onPress={async () => {
            try {
              let { status } = await deletePost(_id)
              if (status === 204) load()
            } catch (error) {
              console.log(error)
            }
          }}
        />
      </Card.Actions>
    </Card>
  )
}

export default Post
