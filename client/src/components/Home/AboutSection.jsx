import { Box, Typography } from "@mui/material";
import { CustomDivider, Topic } from "../../layout";
import { AnimateOnScroll } from "../Misc";
import Image from "mui-image";
import { Diversity3, Forum, Newspaper } from "@mui/icons-material";

export default function AboutSection() {
    return (
        <Box>  
            <Box id='sobre' display='flex' justifyContent='center' alignItems='center' flexDirection='column' m={2.5}>
                <AnimateOnScroll style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}  animateOnce animation='fadeInUp'>
                    <Typography variant="h3">Sobre</Typography>
                    <CustomDivider sx={{ width: '50%' }} />
                </AnimateOnScroll>
            </Box>
            <AnimateOnScroll style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}  animateOnce animation='fadeInUp'>
                <Box mt={10} display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
                    <Topic 
                        boxStyle={{ textAlign: 'center' }}
                        title='O que há de novo?'
                        text='A UNetork vem para mudar o conceito de rede social, trazendo aspectos novos e melhorando os antigos.'
                    />
                </Box>
            </AnimateOnScroll>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll animateOnce animation='fadeInLeft' duration={1500}>
                    <Box sx={{ width: '99%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Diversity3 sx={{ width: 500, height: 500 }} />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title='Classes'
                            text='Classes são como grupos, porém são públicos e são voltados para algum tópico acadêmico específico!'
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll animateOnce animation='fadeInRight' duration={1500}>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title='Fóruns'
                            text='Nos fóruns você pode tirar todas suas dúvidas relacionadas a qualquer matéria!'
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                    <Box mb={5} sx={{ width: '50%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Forum sx={{ width: 500, height: 500 }} />
                    </Box>
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll animateOnce animation='fadeInLeft' duration={1500}>
                    <Box sx={{ width: '99%', postion: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', left: '20px' }}>
                        <Newspaper sx={{ width: 500, height: 500 }} />
                    </Box>
                    <Box display='flex' justifyContent='center' alignItems='center'>
                        <Topic
                            title='Notícias'
                            text='Quer ficar por dentro do que anda acontecendo na escola? Fica ligado nas notícias!'
                            boxStyle={{ width: '70%' }}
                            fontSize='1.7rem'
                        />
                    </Box>
                </AnimateOnScroll>
            </Box>
        </Box>
    )
}