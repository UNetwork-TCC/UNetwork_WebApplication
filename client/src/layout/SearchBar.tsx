import { Search } from '@mui/icons-material'
import CustomInput from './CustomInput'
import { Autocomplete } from '@mui/material'
import { useEffect, type ReactElement } from 'react'
import { useFetchUsersMutation } from '$features/user'

export default function SearchBar(): ReactElement {
    const [ fetchUsers, { data: users, isLoading } ] = useFetchUsersMutation()

    // const handleClick = (): void => {
    //     (async () => {
    //         await fetchUsers(null)
    //     })()
    // }
    
    useEffect(() => {
        (async () => {
            await fetchUsers(null)
        })()
    }, [ fetchUsers ])

    return (
        <Autocomplete
            disablePortal
            // onClick={handleClick}
            placeholder='Pesquise...'
            options={(isLoading ? [ 'Carregando...' ] : users?.map(e => e.name)) ?? [ '' ]}
            renderInput={(params) => <CustomInput icon={<Search />} {...params} />}
            fullWidth
        />
    )
}