import { TPost } from '../types/TPost'
import http from './http'

export const getPosts = async () => await http.get<TPost[]>('/posts')
export const createPost = async (data: FormData) =>
  await http.post('/posts', data)
export const reactToPost = async (id: string, liked: boolean) =>
  await http.put(`/posts/${id}/react`, { liked })
export const changePost = async (id: string, data: FormData) =>
  await http.put(`/posts/${id}/changePost`, data)
export const deletePost = async (id: string) =>
  await http.delete(`/posts/${id}`)
