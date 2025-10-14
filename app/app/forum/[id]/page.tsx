'use client';

import { Forum } from '@/components'
import { useGetForumMutation } from '@/features/forum'
import { LoadingBackdrop } from '@/layout'
import { type Forum as ForumInterface } from '@/types'
import { useEffect, type ReactElement } from 'react'

export default function ForumPage({ params: { id } }: { params: { id: string } }): ReactElement {
    const [ getForum, { data: forum, isLoading } ] = useGetForumMutation()

    useEffect(() => {
        (async () => {
            await getForum(id ?? '')
        })()
    }, [ getForum, id ])

    return (
        <>
            {isLoading ? (
                <LoadingBackdrop 
                    open={true}
                    handleClose={() => {}}
                />
            ) : (
                <Forum forum={forum as ForumInterface} />
            )}
        </>
    )
}