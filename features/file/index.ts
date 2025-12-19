import { type IPicture } from '@/types'
import { apiSlice } from '@/lib/api'

interface ApiResponse<T> {
  message: string
  data: T
  status: number
}

interface filetype {
  userId: string
  filename: string
  file64Based: string
  at: {
    id?: string
    type?: 'post' | 'group' | 'class'
  }
}

const pictureApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    uploadFile: builder.mutation<
      { file: filetype & { _id?: string }; src?: string },
      {
        userId: string
        file64Based: string
        filename?: string
        at?: {
          id?: string
          type?: string
        }
      }
    >({
      query: formData => ({
        url: '/files',
        method: 'POST',
        body: formData
      }),
      transformResponse: (
        response: ApiResponse<{ file: filetype & { _id?: string }; src?: string }>
      ) => response.data
    }),

    getFileData: builder.mutation<IPicture, string>({
      query: pictureId => `/files/${pictureId}`,
      transformResponse: (response: ApiResponse<IPicture>) => response.data
    }),

    deleteFile: builder.mutation<unknown, string>({
      query: pictureId => ({
        url: `/files/${pictureId}`,
        method: 'DELETE'
      }),
      transformResponse: (response: ApiResponse<unknown>) => response.data
    })
  })
})

export const {
  useUploadFileMutation,
  useGetFileDataMutation,
  useDeleteFileMutation
} = pictureApiSlice
