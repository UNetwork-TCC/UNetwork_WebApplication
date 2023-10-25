/* eslint-disable react-hooks/exhaustive-deps */
import { GET_TYPE } from '$constants'
import { useAppDispatch } from '$store'
import { type AsyncThunkAction } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'

export default async function useFetchDispatch(action: AsyncThunkAction<any, any, any>): Promise<string | undefined> {
    const dispatch = useAppDispatch()
    const [ status, setStatus ] = useState<string>()

    useEffect(() => {
        (async () => {
            const state = await dispatch(action).then(res => GET_TYPE(res.type))
            setStatus(state)
        })()
    }, [ dispatch ])

    return status
}