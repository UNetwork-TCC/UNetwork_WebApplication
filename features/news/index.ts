import { type INews } from '@/types'
import { apiSlice } from '@/lib/api'

interface ApiResponse<T> {
  message: string
  data: T
  status: number
}

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchNews: builder.mutation<INews[], unknown>({
      query: () => '/news',
      transformResponse: (response: ApiResponse<INews[]>) => response.data
    }),

    getNews: builder.mutation<INews[], string>({
      query: id => `/news/${id}`,
      transformResponse: (response: ApiResponse<INews[]>) => response.data
    }),

    createNews: builder.mutation<INews, Partial<INews>>({
      query: data => ({
        url: '/news',
        method: 'POST',
        body: data
      }),
      transformResponse: (response: ApiResponse<INews>) => response.data
    }),

    updateNews: builder.mutation<INews, Partial<INews>>({
      query: ({ _id, ...data }) => ({
        url: '/news',
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: ApiResponse<INews>) => response.data
    }),

    deleteNews: builder.mutation<INews, string>({
      query: id => ({
        url: `/news/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: ApiResponse<INews>) => response.data
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
