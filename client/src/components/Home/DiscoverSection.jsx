import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { themeContext } from "../../contexts";
import CustomDivider from "../../layout/CustomBar";
import Image from "mui-image";
import ScrollAnimation from 'react-animate-on-scroll'
import discoverFeature from '../../assets/svg/Home/DiscoverFeature.svg'
import discoverFeature2 from '../../assets/svg/Home/DiscoverFeature2.svg'
import discoverFeature3 from '../../assets/svg/Home/DiscoverFeature3.svg'
import discoverFeature3Decoration from '../../assets/svg/Home/DiscoverFeature3Decoration.svg'
import Topic from "../../layout/Topic";

export default function DiscoverSection() {
    return (
        <Box minHeight='100vh'>
            <Box m={2.5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h3">Descubra</Typography>
                    <CustomDivider />
                </Box>
            </Box>
            <ScrollAnimation animateIn="fadeIn">
                <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                    <Box sx={{ width: '99%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Image style={{ userSelect: 'none' }} height={600} width={600} src={discoverFeature} />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic 
                            title='Conexões e Conhecimentos'
                            text='Conecte-se instantaneamente com pessoas afins na UNetwork! Encontre novos amigos, compartilhe conhecimentos e crie laços!'
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7em'
                        />
                    </Box>
                </Box>
            </ScrollAnimation>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Topic 
                        title='Compartilhe Momentos'
                        text='Compartilhe, inspire e conecte-se com outros apaixonados por momentos inesquecíveis'
                        boxStyle={{ width: '70%' }}
                        fontSize='1.7em'
                    />
                </Box>
                <Box mb={5} sx={{ width: '80%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                    <Image style={{ userSelect: 'none' }} height={600} width={700} src={discoverFeature2} />
                </Box>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' flexDirection='column' alignItems='center' p={5}>
                <Box display='flex' justifyContent='center' alignItems='center'>
                    <Topic 
                        title='Fique atualizado diariamente!'
                        text='Sua timeline estará sempre atualizada de acordo com seus interesses.'
                        boxStyle={{ width: '70%' }}
                        titleStyle={{ display: 'flex', flexDirection: 'column-reverse' }}
                        circleStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        fontSize='1.7em'
                    />
                </Box>
                <Box mb={5} sx={{ postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                    <Image style={{ userSelect: 'none' }} height={700} width={1100} src={discoverFeature3} />
                </Box>
                <Box mb={5} sx={{ width: '100vw', postion: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ userSelect: 'none', position: 'aboslute', bottom: 300, zIndex: 1 }} height={1600} width='100%' src={discoverFeature3Decoration} />
                </Box>

                {/* ...Continuação */}

            </Box>
        </Box>
    )
}