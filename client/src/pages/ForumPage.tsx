import { Forum } from '$components'
import { useGetForumMutation } from '$features/forum'
import { AppLayout } from '$layout'
import { useAppSelector } from '$store'
import { type Forum as ForumInterface } from '$types'
import { Typography } from '@mui/material'
import { useEffect, type ReactElement } from 'react'
import { useParams } from 'react-router-dom'

export default function ForumPage(): ReactElement {
    const { id } = useParams()

    const [ getForum, { data: forum, isLoading } ] = useGetForumMutation()
    const user = useAppSelector(state => state.auth.user)

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
                <Forum
                    data={forum as ForumInterface}
                    user={user}
                    // date={forum?.createdAt}
                    // user={{ name: forum?.createdBy?.name }}
                    // content={forum?.description}
                />
            )}
        </AppLayout>
    )
}