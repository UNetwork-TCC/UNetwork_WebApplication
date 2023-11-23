import { type Picture } from '$types'
import { apiSlice } from '../../lib/api/apiSlice'

const pictureApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadPicture: builder.mutation<any, FormData>({
            query: formData => ({
                url: '/pictures',
                method: 'POST',
                body: formData
            })
        }),

        getPicture: builder.mutation<Picture, string>({
            query: pictureId => `/pictures/${pictureId}`
        }),

        deletePicture: builder.mutation<any, string>({
            query: pictureId => ({
                url: `/pictures/${pictureId}`,
                method: 'DELETE'
            })
        })
    })
})

export const { 
    useUploadPictureMutation,
    useGetPictureMutation,
    useDeletePictureMutation
} = pictureApiSlice