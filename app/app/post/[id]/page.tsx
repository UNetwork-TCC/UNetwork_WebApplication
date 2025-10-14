'use client';

import { type ReactElement, useEffect } from 'react'
import { Post } from '@/components'
import { useGetPostMutation } from '@/features/post'
import { PostSkeleton } from '@/layout/skeletons'
import { Box } from '@mui/material'

export default function PostPage({ params: { id } }: { params: { id: string } }): ReactElement {
    const [ getPost, { data: post, isLoading } ] = useGetPostMutation()

    useEffect(() => {
        (async () => {
            getPost(id ?? '')
        })()
    }, [ getPost, id ])

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}
        >
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
        </Box>
    )
}
