import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://unetwork-api.onrender.com',
    prepareHeaders: (headers, { getState }: { getState: any }) => {
        const token = getState().auth.token
        
        if (token) headers.set('authorization', `Bearer ${token}`)

        return headers
    }
})

export const apiSlice = createApi({
    baseQuery,
    endpoints: (_builder) => ({
        // ...
    })
})