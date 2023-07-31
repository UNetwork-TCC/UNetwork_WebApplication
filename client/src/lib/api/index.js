import axios from 'axios'

const host = 'https://unetwork-api.onrender.com'

const API = axios.create({ baseURL: host })

export const fetchUsers = () => API.get('/user')
export const createUser = () => API.post('/user')
export const getUser = (id) => API.get('/user/' + id)
export const deleteUser = (id) => API.delete('/user' + id)
export const updateUser = (id, data) => API.patch('/user' + id, data)

export const fetchNews = () => API.get('/news')
