import { apiSlice } from '@/lib/api'
import { extractData } from '@/lib/api/helpers'

export interface SearchResults {
  users: any[]
  forums: any[]
  news: any[]
  posts: any[]
}

export interface SearchParams {
  q: string
  type?: 'all' | 'users' | 'forums' | 'news' | 'posts'
  limit?: number
}

const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    search: builder.mutation<SearchResults, SearchParams>({
      query: ({ q, type = 'all', limit = 10 }) => ({
        url: `/search?q=${encodeURIComponent(q)}&type=${type}&limit=${limit}`,
        method: 'GET'
      }),
      transformResponse: (response: unknown) => extractData<SearchResults>(response)
    }),

    searchUsers: builder.mutation<any[], string>({
      query: (q) => ({
        url: `/search?q=${encodeURIComponent(q)}&type=users&limit=10`,
        method: 'GET'
      }),
      transformResponse: (response: unknown) => {
        const data = extractData<SearchResults>(response)
        return data?.users || []
      }
    })
  })
})

export const {
  useSearchMutation,
  useSearchUsersMutation
} = searchApiSlice
