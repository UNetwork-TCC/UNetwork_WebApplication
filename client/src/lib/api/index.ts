import { 
    type Class,
    type Chat,
    type Message,
    type News,
    type User,
    type Forum,
    type Group,
    type Post
} from '$types'
import axios, { type AxiosResponse } from 'axios'

const host = 'https://unetwork-api.onrender.com'

const API = axios.create({ baseURL: host })

type ApiRequest<T> = Promise<AxiosResponse<T, any>>

// USERS REQUESTS

export const fetchUsers = async (): ApiRequest<User[]> => await API.get<User[]>('/user')
export const createUser = async (data: {
  name: string
  email: string
  password: string
}): ApiRequest<typeof data> => await API.post<typeof data>('/user', data)
export const loginUser = async (data: { email: string; password: string }): ApiRequest<typeof data> => await API.post<typeof data>('/user/login', data)
export const getUser = async (id: string): ApiRequest<User> => await API.get<User>('/user/' + id)
export const deleteUser = async (id: string): ApiRequest<User> => await API.delete<User>('/user' + id)
export const updateUser = async (id: string, data: Partial<User>): ApiRequest<User> => await API.patch<User>('/user' + id, data)

// NEWS REQUESTS

export const fetchNews = async (): ApiRequest<News[]> => await API.get<News[]>('/news')
export const getNews = async (id: string): ApiRequest<News> => await API.get<News>('/news/' + id)
export const createNews = async (data: {
  name: string,
  description: string,
  content: Record<string, unknown>,
}): ApiRequest<typeof data> => await API.post<typeof data>('/news', data)

export const updateNews = async (id: string, data: Partial<News>): ApiRequest<News> => await API.patch<News>('/news/' + id, data)
export const deleteNews = async (id: string): ApiRequest<News> => await API.delete('/news/' + id)

// CHAT REQUESTS

export const fetchChats = async (): ApiRequest<Chat[]> => await API.get<Chat[]>('/chat')
export const getChat = async (id: string): ApiRequest<Chat> => await API.get<Chat>('/chat' + id)
export const createChat = async (data: {
  users: User[],
  messages: Message[] | undefined
}): ApiRequest<Chat> => await API.post<Chat>('/chat', data)

export const deleteChat = async (id: string): ApiRequest<Chat> => await API.delete<Chat>('/chat' + id)
export const updateChat = async (id: string, data: Partial<Chat>): ApiRequest<Chat> => await API.patch<Chat>('/chat' + id, data)

// MESSAGE REQUESTS

export const fetchMessages = async (): ApiRequest<Message[]> => await API.get<Message[]>('/message')
export const getMessages = async (id: string): ApiRequest<Message> => await API.get<Message>('/message' + id)
export const createMessage = async (data: {
  chat: Chat,
  content: string
}): ApiRequest<Message> => await API.post<Message>('/message', data)

export const deleteMessage = async (id: string): ApiRequest<Message> => await API.delete<Message>('/message' + id)
export const updateMessage = async (id: string, data: Partial<Message>): ApiRequest<Message> => await API.patch<Message>('/message' + id, data)

// CLASS REQUESTS

export const fetchClasses = async (): ApiRequest<Class[]> => await API.get<Class[]>('/class')
export const getClass = async (id: string): ApiRequest<Class> => await API.get<Class>('/class/' + id)
export const createClass = async (data: {
  name: string,
  description: string,
  content: Record<string, unknown>,
}): ApiRequest<typeof data> => await API.post<typeof data>('/class', data)

export const deleteClass = async (id: string): ApiRequest<Class> => await API.delete<Class>('/class/' + id)
export const updateClass = async (id: string, data: Partial<Class>): ApiRequest<Class> => await API.patch<Class>('/class/' + id, data)

// FORUM REQUESTS

export const fetchForums = async (): ApiRequest<Forum[]> => await API.get<Forum[]>('/forum')
export const getForum = async (id: string): ApiRequest<Forum> => await API.get<Forum>('/forum/' + id)
export const createForum = async (data: {
  title: string,
  description: string,
  theme: string,
}): ApiRequest<Forum> => await API.post<Forum>('/forum', data)

export const deleteForum = async (id: string): ApiRequest<Forum> => await API.delete<Forum>('/forum/' + id)
export const updateForum = async (id: string, data: Partial<Forum>): ApiRequest<Forum> => await API.patch<Forum>('/forum/' + id, data)

// GROUP REQUESTS

export const fetchGroups = async (): ApiRequest<Group[]> => await API.get<Group[]>('/group')
export const getGroup = async (id: string): ApiRequest<Group> => await API.get<Group>('/group/' + id)
export const createGroup = async (data: {
  name: string,
  description: string,
  theme: string,
}): ApiRequest<Group> => await API.post<Group>('/group', data)

export const deleteGroup = async (id: string): ApiRequest<Group> => await API.delete<Group>('/group/' + id)
export const updateGroup = async (id: string, data: Partial<Group>): ApiRequest<Group> => await API.patch<Group>('/group/' + id, data)

// POST REQUESTS

export const fetchPosts = async (): ApiRequest<Post[]> => await API.get<Post[]>('/post')
export const getPost = async (id: string): ApiRequest<Post> => await API.get<Post>('/post/' + id)
export const createPost = async (data: {
  name: string,
  description: string,
  content: Record<string, unknown>,
}): ApiRequest<Post> => await API.post<Post>('/post', data)

export const deletePost = async (id: string): ApiRequest<Post> => await API.delete<Post>('/post/' + id)
export const updatePost = async (id: string, data: Partial<Post>): ApiRequest<Post> => await API.patch<Post>('/post/' + id, data)
