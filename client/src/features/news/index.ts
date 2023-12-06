import { type News } from '$types'
import { apiSlice } from '$api'

const newsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        fetchNews: builder.mutation<News[], unknown>({
            query: () => '/news'
        }),

        getNews: builder.mutation<News[], string>({
            query: id => `/news/${id}`
        }),

        createNews: builder.mutation<News, Partial<News>>({
            query: data => ({
                url: '/news',
                method: 'POST',
                body: data
            })
        }),
    
        updateNews: builder.mutation<News, Partial<News>>({
            query: ({ _id, ...data }) => ({
                url: '/news',
                method: 'PATCH',
                body: data
            })
        }),
    
        deleteNews: builder.mutation<News, string>({
            query: id => ({
                url: `/news/${id}`,
                method: 'DELETE'
            })
        })
        
    })
})

// Exports

export const {
    useFetchNewsMutation,
    useGetNewsMutation,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation
} = newsApiSlice