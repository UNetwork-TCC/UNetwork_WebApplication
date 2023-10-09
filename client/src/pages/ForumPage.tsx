import { AppLayout } from '$layout'
import { type ReactElement } from 'react'
import { useParams } from 'react-router-dom'

export default function ForumPage(): ReactElement {
    const { id } = useParams()

    return (
        <AppLayout withSidebars>
            {id}
        </AppLayout>
    )
}