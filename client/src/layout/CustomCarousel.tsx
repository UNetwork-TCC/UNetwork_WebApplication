import { Box } from '@mui/material'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import { type ReactElement } from 'react'

export default function CustomCarousel(): ReactElement {
    return (
        <CarouselProvider
            naturalSlideWidth={100  }
            naturalSlideHeight={125}
            totalSlides={3}
        >
            <Slider style={{ display: 'flex', alignItems: 'center', flexDirection:'row', gap:'10rem' }}>
                <Slide style={{ width: '100%' }} index={0}>
                    <Box display={'flex'} gap={'2rem'} justifyContent={'center'} width={'100%'}>
                        <Box width={50} height={50} bgcolor={'red'}>
                        </Box> 
                        <Box width={50} height={50} bgcolor={'blue'}>
                        </Box>
                        <Box width={50} height={50} bgcolor={'green'}>
                        </Box>
                    </Box>
                </Slide>
            </Slider>
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
    )
}