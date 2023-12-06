import { type User } from '$types'
import { type ReactElement } from 'react'
import { Avatar, Skeleton, type AvatarOwnProps, type SxProps } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function UserAvatar({ 
    sx,
    user,
    variant,
    isLoading,
    avatar,
    onClick
}: {
    sx?: SxProps,
    user: Partial<User>,
    variant?: AvatarOwnProps['variant'],
    isLoading?: boolean,
    avatar?: string,
    onClick?: () => void
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
                    onClick={!onClick ? () => { navigate('/app/profile/' + user?._id) } : onClick}
                    sx={{
                        cursor: 'pointer',
                        borderRadius: 3,
                        height: '3.5rem',
                        width: '3.5rem',
                        bgcolor: 'primary.main',
                        ...sx 
                    }}
                >
                    {!user?.otherInfo?.avatar && !avatar ? 
                        (
                            user?.username?.charAt(0).toUpperCase()
                        ) : 
                        (
                            <img 
                                alt={'Avatar de ' + user?.username} 
                                src={user?.otherInfo?.avatar?.src ?? avatar}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    objectFit: 'cover',
                                    resize: 'both'
                                }}
                            />
                        )
                    }
                </Avatar>
            )}
        </>
    )
}