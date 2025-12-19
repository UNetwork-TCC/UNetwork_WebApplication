'use client'

import { Forum } from '@/components'
import { useGetForumMutation } from '@/features/forum'
import { LoadingBackdrop } from '@/layout'
import { type IForum } from '@/types'
import { use, useEffect, type ReactElement } from 'react'

export default function ForumPage({
  params
}: {
  params: Promise<{ id: string }>
}): ReactElement {
  const { id } = use(params)
  const [getForum, { data: forum, isLoading }] = useGetForumMutation()

  useEffect(() => {
    ;(async () => {
      await getForum(id ?? '')
    })()
  }, [getForum, id])

  return (
    <>
      {isLoading ? (
        <LoadingBackdrop open={true} handleClose={() => {}} />
      ) : (
        <Forum forum={forum as IForum} />
      )}
    </>
  )
}
