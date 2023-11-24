import { Search } from '@mui/icons-material'
import CustomInput from './CustomInput'
import { Autocomplete } from '@mui/material'
import { useEffect, type ReactElement, useState, type ChangeEvent } from 'react'
import { useFetchUsersMutation } from '$features/user'

export default function SearchBar(): ReactElement {
    const [ fetchUsers, { data: users, isLoading } ] = useFetchUsersMutation()
    const [ text, setText ] = useState<string | null>(null)

    // const handleClick = (): void => {
    //     (async () => {
    //         await fetchUsers(null)
    //     })()
    // }
    
    useEffect(() => {
        (async () => {
            if (text?.includes('@')) {
                await fetchUsers(null)
            }

            console.log(text?.includes('@'))
            
        })()
    }, [ fetchUsers, text ])

    return (
        <Autocomplete
            disablePortal
            options={
                text?.includes('@') ? (
                    isLoading ? (
                        [ 'Carregando' ]
                    ) : users?.map(e => '@' + e.username) ?? [ '' ]
                ) : [ 'a', 'b' ]
            }
            renderInput={params => 
                <CustomInput 
                    placeholder='Pesquise...' 
                    icon={<Search />}
                    value={text ?? ''} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => { setText(e.currentTarget.value) }}
                    {...params} 
                />}
            fullWidth
        />
    )
}