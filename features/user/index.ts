import { apiSlice } from '@/lib/api'
import { extractData } from '@/lib/api/helpers'
import { type AppLayout, type IUser } from '@/types'
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
    fetchUsers: builder.mutation<IUser[], unknown>({
      query: () => '/user',
      transformResponse: (response: unknown) => extractData<IUser[]>(response)
    }),

    getUser: builder.mutation<IUser, string>({
      query: id => `/user/${id}`,
      transformResponse: (response: unknown) => extractData<IUser>(response)
    }),

    updateUser: builder.mutation<IUser, Partial<IUser>>({
      query: ({ _id, ...data }) => ({
        url: `/user/${_id}`,
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: unknown) => extractData<IUser>(response)
    }),

    deleteUser: builder.mutation<IUser, string>({
      query: id => ({
        url: `/user/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: unknown) => extractData<IUser>(response)
    }),

    fetchUsersByIds: builder.mutation<IUser[], string[]>({
      query: ids => ({
        url: '/user/batch',
        method: 'POST',
        body: { ids }
      }),
      transformResponse: (response: unknown) => extractData<IUser[]>(response)
    })
  })
})

// Exports

export const { setAppLayout, setTheme } = configSlice.actions
export const configReducer = configSlice.reducer

export const {
  useDeleteUserMutation,
  useFetchUsersMutation,
  useFetchUsersByIdsMutation,
  useGetUserMutation,
  useUpdateUserMutation
} = userApiSlice
