import { type MulterFile, type Picture } from '$types'
import { apiSlice } from '$api'

const pictureApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        uploadPicture: builder.mutation<{ file: MulterFile, message: string }, FormData>({
            query: formData => ({
                url: '/pictures',
                method: 'POST',
                body: formData
            })
        }),

        getPictureData: builder.mutation<Picture, string>({
            query: pictureId => `/uploads/${pictureId}`
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
    useGetPictureDataMutation,
    useDeletePictureMutation
} = pictureApiSlice