import { ActionTypes } from '../../../constants'

const { FETCH_ALL, CREATE, LOGOUT, LOGIN } = ActionTypes

export default (state = [], action) => {
    switch (action.type) {
    case FETCH_ALL:
        return action.payload
            
    case CREATE:
        return [ ...state, action.payload ]

    case LOGIN:
        return action.payload

    case LOGOUT:
        return action.payload
    default:
        return [ ...state ]
    }
}