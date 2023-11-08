import { Post } from '$components'
import { GET_TYPE, HTTP_STATUS } from '$constants'
import { getForum } from '$features/forum'
import { useFetchDispatch } from '$hooks'
import { AppLayout } from '$layout'
import { useAppDispatch, useAppSelector } from '$store'
import { type Forum } from '$types'
import { Typography } from '@mui/material'
import { useEffect, type ReactElement, EffectCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ForumPage(): ReactElement {
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    const forum: Forum | Record<string, any> = useAppSelector(state => state.forum)
    console.log(forum.forum)

    useEffect(() => {
        (async () => {
            const response = await dispatch(getForum(id ?? ''))
            
            const status = GET_TYPE(response.type)
            if (status === HTTP_STATUS.FULFILLED) {
                setIsLoading(false)
            }
        })()
    }, [ dispatch, id ])

    return (
        <AppLayout withSidebars>
            { isLoading ? (
                <Typography>Carregando...</Typography>
            ) : (
                <Post
                    title={forum.title}
                    date={forum.createdAt}
                    user={{ name: forum.createdBy }}
                    content={forum.description}
                />
            )}
        </AppLayout>
    )
}