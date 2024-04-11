import { StatusBar } from 'expo-status-bar'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import {
  ActivityIndicator,
  Dialog,
  FAB,
  MD2Colors,
  Modal,
  PaperProvider,
  ProgressBar,
} from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Post from './src/components/Post'
import { useEffect, useState } from 'react'
import { createPost, getPosts } from './src/api/posts'
import requestPermission from './src/utils/requestPermission'
import * as ImagePicker from 'expo-image-picker'

export default function App() {
  const [posts, setPosts] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const loadPosts = async () => {
    setRefreshing(true)
    try {
      let res = await getPosts()
      if (res.status === 200) setPosts(res.data)
    } catch (error) {
      console.log('error while loading posts')
      console.log(error.message)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])
  return (
    <PaperProvider>
      <SafeAreaView
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        {loading ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <ProgressBar
              progress={progress}
              style={{ width: 300, height: 10 }}
            />
            <Text style={{ fontSize: 50, marginTop: 10 }}>
              {parseInt(progress * 100)}%
            </Text>
          </View>
        ) : (
          <SafeAreaView
            style={{ flex: 1, alignItems: 'center', width: '100%' }}
          >
            <FlatList
              style={{ width: '100%' }}
              data={posts}
              refreshing={refreshing}
              onRefresh={loadPosts}
              renderItem={({ item }) => (
                <Post
                  media={item.media}
                  Liked={item.Liked}
                  type={item.type}
                  _id={item._id}
                  setLoading={setLoading}
                  load={loadPosts}
                  setProgress={setProgress}
                />
              )}
              keyExtractor={(item) => item._id}
            />
            <FAB
              icon={'plus'}
              onPress={async () => {
                let permitted = await requestPermission()
                if (permitted) {
                  setLoading(true)
                  try {
                    let media = await ImagePicker.launchImageLibraryAsync({
                      mediaTypes: ImagePicker.MediaTypeOptions.All,
                      allowsEditing: true,
                      quality: 1,
                    })

                    const { status } = await createPost(
                      media.assets[0].uri,
                      setProgress
                    )
                    if (status === 201) loadPosts()
                  } catch (error) {
                    console.log(error.message)
                  } finally {
                    setLoading(false)
                    setProgress(0)
                  }
                }
              }}
              label='Create Post'
              style={{ position: 'absolute', right: 20, bottom: '10%' }}
            />
          </SafeAreaView>
        )}
      </SafeAreaView>
    </PaperProvider>
  )
}
