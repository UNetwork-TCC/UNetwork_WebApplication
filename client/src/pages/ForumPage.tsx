import { Post } from '$components'
import { getForum } from '$features/forum'
import { AppLayout } from '$layout'
import { useAppDispatch, useAppSelector } from '$store'
import { type Forum } from '$types'
import { useEffect, type ReactElement, EffectCallback } from 'react'
import { useParams } from 'react-router-dom'

export default function ForumPage(): ReactElement {
    const { id } = useParams()

    const dispatch = useAppDispatch()
    const forum: Forum | Record<string, any> = useAppSelector(state => state.forum.forum)

    useEffect(() => {
        (async () => {
            await dispatch(getForum(id ?? ''))
        })()
    }, [dispatch, id])

    return (
        <AppLayout withSidebars>
            <Post
                title={forum.title}
                date={forum.createdAt}
                user={{ name: forum.createdBy }}
                content={forum.description}
            />
        </AppLayout>
    )
}