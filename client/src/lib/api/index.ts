import axios from 'axios'

const host = 'https://unetwork-api.onrender.com'

const API = axios.create({ baseURL: host })

export const fetchUsers = () => API.get('/user')
export const createUser = (data: { name: string, email: string, password: string }) => API.post('/user/create', data)
export const loginUser = (data: { email: string, password: string }) => API.post('/user/login', data)
export const getUser = (id: string) => API.get('/user/' + id)
export const deleteUser = (id: string) => API.delete('/user' + id)
export const updateUser = (id: string, data: Object) => API.patch('/user' + id, data)

export const fetchNews = () => API.get('/news')
