import { apiSlice } from '@/lib/api'
import { type AppLayout, type IUser } from '@/types'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface ApiResponse<T> {
  message: string
  data: T
  status: number
}
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
    fetchUsers: builder.mutation<IUser[], unknown>({
      query: () => '/user',
      transformResponse: (response: ApiResponse<IUser[]>) => response.data
    }),

    getUser: builder.mutation<IUser, string>({
      query: id => `/user/${id}`,
      transformResponse: (response: ApiResponse<IUser>) => response.data
    }),

    updateUser: builder.mutation<IUser, Partial<IUser>>({
      query: ({ _id, ...data }) => ({
        url: `/user/${_id}`,
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: ApiResponse<IUser>) => response.data
    }),

    deleteUser: builder.mutation<IUser, string>({
      query: id => ({
        url: `/user/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: ApiResponse<IUser>) => response.data
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
