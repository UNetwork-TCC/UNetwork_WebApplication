import { type INews } from '@/types'
import { apiSlice } from '@/lib/api'
import { extractData } from '@/lib/api/helpers'

const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchNews: builder.mutation<INews[], unknown>({
      query: () => '/news',
      transformResponse: (response: unknown) => extractData<INews[]>(response)
    }),

    getNews: builder.mutation<INews[], string>({
      query: id => `/news/${id}`,
      transformResponse: (response: unknown) => extractData<INews[]>(response)
    }),

    createNews: builder.mutation<INews, Partial<INews>>({
      query: data => ({
        url: '/news',
        method: 'POST',
        body: data
      }),
      transformResponse: (response: unknown) => extractData<INews>(response)
    }),

    updateNews: builder.mutation<INews, Partial<INews>>({
      query: ({ _id, ...data }) => ({
        url: '/news',
        method: 'PATCH',
        body: data
      }),
      transformResponse: (response: unknown) => extractData<INews>(response)
    }),

    deleteNews: builder.mutation<INews, string>({
      query: id => ({
        url: `/news/${id}`,
        method: 'DELETE'
      }),
      transformResponse: (response: unknown) => extractData<INews>(response)
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
