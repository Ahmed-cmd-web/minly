import http from './http'
import * as FileSystem from 'expo-file-system'

export const getPosts = async () => await http.get('/posts')
export const createPost = async (data, setProgress) =>
  await FileSystem.createUploadTask(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/posts/`,
    data,
    {
      fieldName: 'media',
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    },
    ({ totalBytesSent, totalBytesExpectedToSend }) =>
      setProgress(totalBytesSent / totalBytesExpectedToSend)
  ).uploadAsync()
export const reactToPost = async (id, liked) =>
  await http.put(`/posts/${id}/react`, { liked })
export const changePost = async (id, data, setProgress) =>
  await FileSystem.createUploadTask(
    `${process.env.EXPO_PUBLIC_BACKEND_URL}/posts/${id}/changePost`,
    data,
    {
      fieldName: 'media',
      httpMethod: 'PUT',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    },
    ({ totalBytesSent, totalBytesExpectedToSend }) =>
      setProgress(totalBytesSent / totalBytesExpectedToSend)
  ).uploadAsync()
export const deletePost = async (id) => await http.delete(`/posts/${id}`)
