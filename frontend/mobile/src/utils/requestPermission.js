import * as ImagePicker from 'expo-image-picker'
import { Platform } from 'react-native'

const requestPermission = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted')
      alert('Sorry, we need camera roll permissions to make this work!')
    return status === 'granted'
  }
  return true
}

export default requestPermission
