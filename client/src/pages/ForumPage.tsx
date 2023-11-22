import { Post } from '$components'
import { useGetForumMutation } from '$features/forum'
import { AppLayout } from '$layout'
import { Typography } from '@mui/material'
import { useEffect, type ReactElement } from 'react'
import { useParams } from 'react-router-dom'

export default function ForumPage(): ReactElement {
    const { id } = useParams()

    const [ getForum, { data: forum, isLoading } ] = useGetForumMutation()

    useEffect(() => {
        (async () => {
            await getForum(id ?? '')
        })()
    }, [ getForum, id ])

    return (
        <AppLayout>
            {isLoading ? (
                <Typography>Carregando...</Typography>
            ) : (
                <Post
                    date={forum?.createdAt}
                    user={{ name: forum?.createdBy?.name }}
                    content={forum?.description}
                />
            )}
        </AppLayout>
    )
}