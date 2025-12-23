'use client'

import { Forum } from '@/components'
import { useGetForumMutation } from '@/features/forum'
import { LoadingBackdrop, Breadcrumb } from '@/layout'
import { type IForum } from '@/types'
import { use, useEffect, type ReactElement } from 'react'
import { Box } from '@mui/material'
import { ForumOutlined } from '@mui/icons-material'

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

  const breadcrumbItems = [
    {
      label: 'Forums',
      href: '/app/forum',
      icon: <ForumOutlined sx={{ fontSize: 18, mr: 0.5 }} />
    },
    {
      label: (forum as IForum)?.name || 'Topico'
    }
  ]

  return (
    <>
      {isLoading ? (
        <LoadingBackdrop open={true} handleClose={() => {}} />
      ) : (
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <Breadcrumb items={breadcrumbItems} />
          <Forum forum={forum as IForum} />
        </Box>
      )}
    </>
  )
}
