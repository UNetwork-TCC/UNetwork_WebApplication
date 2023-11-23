import { type Picture } from '$types'
import { apiSlice } from '../../lib/api/apiSlice'

const pictureApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadPicture: builder.mutation<any, FormData>({
            query: formData => ({
                url: '/picture/',
                method: 'POST',
                body: formData
            })
        }),

        getPicture: builder.mutation<Picture, string>({
            query: pictureId => `/picture/${pictureId}`
        }),

        deletePicture: builder.mutation<any, string>({
            query: pictureId => ({
                url: `/picture/${pictureId}`,
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