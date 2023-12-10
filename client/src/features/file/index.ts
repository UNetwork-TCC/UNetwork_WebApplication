import { type Picture } from '$types'
import { apiSlice } from '$api'

interface filetype {
    userId: string
    filename: string
    file64Based: string,
    at: { 
        id?: string
        type?: 'post' | 'group' | 'class' 
    }
}

const pictureApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadFile: builder.mutation<{ file: filetype & { _id?: string }, message: string }, {
            userId: string,
            file64Based: string,
            filename?: string,
            at?: {
                id?: string,
                type?: string
            }
        }>({
            query: formData => ({
                url: '/pictures',
                method: 'POST',
                body: formData
            })
        }),

        getFileData: builder.mutation<Picture, string>({
            query: pictureId => `/pictures/${pictureId}`
        }),

        deleteFile: builder.mutation<any, string>({
            query: pictureId => ({
                url: `/pictures/${pictureId}`,
                method: 'DELETE'
            })
        })
    })
})

export const { 
    useUploadFileMutation,
    useGetFileDataMutation,
    useDeleteFileMutation
} = pictureApiSlice