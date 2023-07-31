import { ActionTypes } from '../../../constants'
import * as api from '../../api'

const { FETCH_ALL, CREATE, GET, UPDATE, DELETE } = ActionTypes

export const fetchUsersAction = () => async dispatch => {
    const { data } = await api.fetchUsers()
    dispatch({ type: FETCH_ALL, payload: data })
}

export const createUserAction = () => async dispatch => {
    const { data } = await api.createUser()
    dispatch({ type: CREATE, payload: data })
}

export const getUserAction = id => async dispatch => {
    const { data } = await api.getUser(id)
    dispatch({ type: GET, payload: data })
}

export const updateUserAction = id => async dispatch => {
    const { data } = await api.updateUser(id)
    dispatch({ type: UPDATE, payload: data })
}

export const deleteUserAction = id => async dispatch => {
    const { data } = await api.deleteUser(id)
    dispatch({ type: DELETE, payload: data })
}

export const fetchNewsAction = () => async dispatch => {
    const { data } = await api.fetchNews()
    dispatch({ type: FETCH_ALL, payload: data })
}