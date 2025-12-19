import { type IPicture } from '@/types'
import { apiSlice } from '@/lib/api'
import { extractData } from '@/lib/api/helpers'

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
      transformResponse: (response: unknown) =>
        extractData<{ file: filetype & { _id?: string }; src?: string }>(response)
    }),

    getFileData: builder.mutation<IPicture, string>({
      query: pictureId => `/files/${pictureId}`,
      transformResponse: (response: unknown) => extractData<IPicture>(response)
    }),

    deleteFile: builder.mutation<unknown, string>({
      query: pictureId => ({
        url: `/files/${pictureId}`,
        method: 'DELETE'
      }),
      transformResponse: (response: unknown) => extractData<unknown>(response)
    })
  })
})

export const {
  useUploadFileMutation,
  useGetFileDataMutation,
  useDeleteFileMutation
} = pictureApiSlice
