import { apiSlice } from '$api'
import { type AppLayout, type User } from '$types'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
// INITIAL VALUES

const appLayout: AppLayout = {
    sideBar: {
        dropdownButtonClicked: false,
        shortcutsExpanded: true
    },

    window: {
        size: {
            height: '95vh',
            width: '95vw',
            borderRadius: '1rem'
        }
    }
}

const theme: string = 'light'

const initialState = {
    appLayout,
    theme
}

// REDUCERS

export const configSlice = createSlice({
    initialState,
    name: 'config',
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload
        },

        setAppLayout: (state, action: PayloadAction<AppLayout>) => {
            state.appLayout = action.payload
        }
    }
})

// USER API SLICE

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchUsers: builder.mutation<User[], unknown>({
            query: () => '/user'
        }),

        getUser: builder.mutation<User, string>({
            query: id => `/user/${id}`
        }),

        updateUser: builder.mutation<User, Partial<User>>({
            query: ({ _id, ...data }) => ({
                url: `/user/${_id}`,
                method: 'PATCH',
                body: data
            })
        }),

        deleteUser: builder.mutation<User, string>({
            query: id => ({
                url: `/user/${id}`,
                method: 'DELETE'
            })
        })
    })
})

// Exports

export const { setAppLayout, setTheme } = configSlice.actions
export const configReducer = configSlice.reducer

export const {
    useDeleteUserMutation,
    useFetchUsersMutation,
    useGetUserMutation,
    useUpdateUserMutation
} = userApiSlice