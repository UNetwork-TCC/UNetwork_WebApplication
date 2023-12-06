import { Forum } from '$components'
import { useGetForumMutation } from '$features/forum'
import { AppLayout, LoadingBackdrop } from '$layout'
import { type Forum as ForumInterface } from '$types'
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
                <LoadingBackdrop 
                    open={true}
                    handleClose={() => {}}
                />
            ) : (
                <Forum forum={forum as ForumInterface} />
            )}
        </AppLayout>
    )
}