import { type BaseQueryApi, type FetchArgs, type FetchBaseQueryError, type FetchBaseQueryMeta, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '$features/auth'
import { type QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import store from '$store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://unetwork-api.onrender.com',
    credentials: 'include',
    prepareHeaders: (headers, { getState }: { getState: any }) => {
        const token = getState().auth.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        
        return headers
    }
})

const baseQueryWithReauth = async (
    args: string | FetchArgs,
    api: BaseQueryApi & any,
    extraOptions: Record<string, unknown>
): Promise<
    QueryReturnValue<
        unknown,
        FetchBaseQueryError,
        FetchBaseQueryMeta
    >
> => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 'FETCH_ERROR') {
        console.log('sending refresh token')

        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        
        if (refreshResult?.data) {
            const user = api.getState().auth.user

            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: buillder => ({

    })
})