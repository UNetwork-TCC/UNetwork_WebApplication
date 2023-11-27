import { Search } from '@mui/icons-material'
import CustomInput from './CustomInput'
import { Autocomplete, Box } from '@mui/material'
import { useEffect, type ReactElement, useState, type ChangeEvent, type FormEvent } from 'react'
import { useFetchUsersMutation } from '$features/user'

export default function SearchBar(): ReactElement {
    const [ fetchUsers, { data: users, isLoading } ] = useFetchUsersMutation()
    const [ text, setText ] = useState<string | null>(null)

    // const handleClick = (): void => {
    //     (async () => {
    //         await fetchUsers(null)
    //     })()
    // }
    
    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault()

        console.log(text)
    }

    useEffect(() => {
        (async () => {
            if (text?.includes('@')) {
                await fetchUsers(null)
            }

            console.log(text?.includes('@'))
            
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
                        ) : users?.map(e => '@' + e.username) ?? [ '' ]
                    ) : [ 'a', 'b' ]
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
                fullWidth
            />
        </Box>
    )
}