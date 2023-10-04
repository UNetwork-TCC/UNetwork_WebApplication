import { type News, type User } from '$types'
import axios, { type AxiosResponse } from 'axios'

const host = 'https://unetwork-api.onrender.com'

const API = axios.create({ baseURL: host })

// USERS REQUESTS

export const fetchUsers = async (): Promise<AxiosResponse<User[], any>> => await API.get<User[]>('/user')
export const createUser = async (data: {
  name: string
  email: string
  password: string
}): Promise<AxiosResponse<typeof data, any>> => await API.post<typeof data>('/user/create', data)
export const loginUser = async (data: { email: string; password: string }): Promise<AxiosResponse<typeof data, any>> =>
    await API.post<typeof data>('/user/login', data)

export const getUser = async (id: string): Promise<AxiosResponse<User, any>> => await API.get<User>('/user/' + id)
export const deleteUser = async (id: string): Promise<AxiosResponse<User, any>> => await API.delete<User>('/user' + id)

export const updateUser = async (id: string, data: Partial<User>): Promise<AxiosResponse<User, any>> =>
    await API.patch<User>('/user' + id, data)

// NEWS REQUESTS

export const fetchNews = async (): Promise<AxiosResponse<News, any>> => await API.get<News>('/news')
