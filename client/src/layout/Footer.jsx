import { Box } from '@mui/material'
import Image from 'mui-image'

import FooterDecoration from '../assets/svg/Home/FooterDecoration.svg'
import FooterBackground from '../assets/svg/Home/FooterBackground.svg'

export default function Footer() {
    return (
        <Box>
            <Box position='absolute' width='100%'>
                <Image src={FooterBackground} />
            </Box>
            <Box position='absolute' bottom='-491%' width='100%'>
                <Image src={FooterDecoration} />
            </Box>
            <Box display='flex' justifyContent='space-between' alignItems='center' p={4}>
                <Box>lorem ipsum data ken</Box>
                <Box>lorem ipsum data ken</Box>
                <Box>lorem ipsum data ken</Box>
                <Box>lorem ipsum data ken</Box>
            </Box>
        </Box>
    )
}