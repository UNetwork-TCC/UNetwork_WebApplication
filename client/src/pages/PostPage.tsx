import { AppLayout } from '$layout'
import { type ReactElement, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Post } from '$components'
import { useGetPostMutation } from '$features/post'
import { PostSkeleton } from '$skeletons'

export default function PostPage(): ReactElement {
    const { id } = useParams()

    const [ getPost, { data: post, isLoading } ] = useGetPostMutation()

    useEffect(() => {
        (async () => {
            getPost(id ?? '')
        })()
    }, [ getPost, id ])

    return (
        <AppLayout>
            {isLoading ? (
                <PostSkeleton />
            ) : (
                <Post 
                    content={post?.content ?? {}}
                    date={post?.postedAt}
                    id={post?._id ?? ''}
                    postedBy={post?.postedBy ?? ''} 
                    degree={''}
                />
            )}
        </AppLayout>
    )
}
