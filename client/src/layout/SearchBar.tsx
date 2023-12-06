import { Search } from '@mui/icons-material'
import CustomInput from './CustomInput'
import { Autocomplete, Box, Typography } from '@mui/material'
import { useEffect, type ReactElement, useState, type ChangeEvent, type FormEvent } from 'react'
import { useFetchUsersMutation } from '$features/user'
import { useNavigate } from 'react-router-dom'

export default function SearchBar(): ReactElement {
    const [ fetchUsers, { data: users, isLoading } ] = useFetchUsersMutation()
    const [ text, setText ] = useState<string | null>(null)

    const navigate = useNavigate()
    
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault()

        console.log(text)
    }

    useEffect(() => {
        (async () => {
            if (text?.includes('@')) {
                await fetchUsers(null)
            }
        })()
    }, [ fetchUsers, text ])

    return (
        <Box 
            component='form' 
            width='100%'
            onSubmit={handleSubmit}
        >
            <Autocomplete
                disablePortal
                options={
                    text?.includes('@') ? (
                        isLoading ? (
                            [ 'Carregando' ]
                        ) : users?.map(e => '@' + JSON.stringify({ username: e.username, avatar: e.otherInfo?.avatar?.src, _id: e._id })) ?? [ 'Pesquise...' ]
                    ) : [ 'Pesquise...' ]
                }
                renderInput={
                    (params) => (
                        <CustomInput 
                            placeholder='Pesquise...' 
                            icon={<Search />}
                            value={text ?? ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => { setText(e.currentTarget.value) }}
                            {...params} 
                        />
                    ) 
                }
                renderOption={
                    (props, option) => {
                        const { username, avatar, _id } = JSON.parse(option.split('@')[1] ?? JSON.stringify({ username: undefined }))

                        return (
                            <Box
                                onClick={() => { navigate('/app/profile/' + _id) }}
                                onTouchStart={() => { navigate('/app/profile/' + _id) }}
                                onTouchEnd={() => { navigate('/app/profile/' + _id) }}
                                onTouchMove={() => { navigate('/app/profile/' + _id) }}
                                onSelect={() => { navigate('/app/profile/' + _id) }}
                                onMouseEnter={() => { navigate('/app/profile/' + _id) }}
                                component='li'
                                {...props}
                            >
                                <Box
                                    display='flex'
                                    justifyContent='center'
                                    gap={1}
                                >
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            alt={username}
                                            style={{
                                                borderRadius: '50%',
                                                height: '2.5rem',
                                                width: '2.5rem',
                                                objectFit: 'cover'
                                            }}
                                        />
                                    ) : username?.[0] ? (
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: '50%',
                                                height: '2.5rem',
                                                width: '2.5rem',
                                                bgcolor: 'primary.main',
                                                objectFit: 'cover'
                                            }}
                                        >
                                            {username[0]}
                                        </Box>
                                    ) : null}
                                    <Typography>
                                        {!username ? 'Pesquise...' : '@' + username}
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    }
                }
                fullWidth
            />
        </Box>
    )
}