import { Box, Grid, Typography } from '@mui/material'
import { type User } from '$types'
import { type ReactElement } from 'react'
import UserAvatar from './UserAvatar'
import { grey } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

export default function ProfilePosts({ user }: { user: User }): ReactElement {
    
    console.log(user.posts)

    return (
        <Box display='flex' gap={3} flexDirection='column'>
            <Grid gap={2} container>
                {user?.posts?.map(e => (
                    <Grid key={e?._id} item>
                        <ProfilePost 
                            user={user} 
                            image={e?.content?.picture}
                            desc={e?.description}
                            postId={e?._id ?? ''}
                        />
                    </Grid>
                ))}
            </Grid>
            <Box />
        </Box>
    )
}

function ProfilePost({
    image,
    user,
    postId,
    desc
}: {
    user: User,
    postId: string,
    image?: string,
    desc?: string
}): ReactElement {
    const navigate = useNavigate()

    return (
        <Box 
            sx={{ cursor: 'pointer' }} 
            onClick={() => { navigate(`/app/post/${postId}`) }} 
            height='23rem' 
            width='23rem'
        >
            {image ? (
                <img
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        backgroundImage: 'no-repeat'
                    }} 
                    src={image} 
                    alt={'Post de ' + user.username} 
                />
            ) : (
                <Box 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                    height='100%' 
                    width='100%' 
                    bgcolor={grey[500]}
                    p={5}
                >
                    <Box 
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        gap={2}
                        width='100%'
                    >
                        <UserAvatar 
                            user={user}
                            onClick={() => {}}
                        />
                        <Typography color='white'>
                            {(desc?.length ?? 0) > 40 ? desc?.slice(0, 40) + '...' : desc}
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    )
}