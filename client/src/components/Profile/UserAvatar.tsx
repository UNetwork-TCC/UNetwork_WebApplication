import { type User } from '$types'
import { type ReactElement } from 'react'
import { Avatar, Skeleton, type AvatarOwnProps, type SxProps } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function UserAvatar({ 
    sx,
    user,
    variant,
    isLoading 
}: {
    sx?: SxProps,
    user: User,
    variant?: AvatarOwnProps['variant'],
    isLoading?: boolean 
}): ReactElement {
    const navigate = useNavigate()

    return (
        <>
            {isLoading ? (
                <Skeleton
                    variant='rectangular'
                    sx={{
                        borderRadius: 3,
                        height: '3.5rem',
                        width: '3.5rem'
                    }} 
                />
            ) : (
                <Avatar 
                    variant={variant ?? 'rounded'}
                    onClick={() => { navigate('/app/profile/' + user?._id) }}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: 3,
                        height: '3.5rem',
                        width: '3.5rem',
                        bgcolor: 'primary.main',
                        ...sx 
                    }}
                >
                    {!user?.otherInfo?.avatar ? 
                        (
                            user?.username?.charAt(0).toUpperCase()
                        ) : 
                        (
                            <img style={{ backgroundRepeat: 'no-repeat' }} alt={'Avatar de ' + user?.username} src={user?.otherInfo?.avatar}></img>
                        )
                    }
                </Avatar>
            )}
        </>
    )
}