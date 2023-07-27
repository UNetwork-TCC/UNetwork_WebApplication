import { Box, Typography } from "@mui/material";
import { CustomDivider } from "../../layout";
import { AnimateOnScroll } from "../Misc";
import Image from "mui-image";

export default function ComunitySection() {
    return (
        <Box position='relative' bottom={400}>
            <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' m={2.5}>
                <AnimateOnScroll style={{ flexDirection: 'column' }}  animateOnce animation='fadeInUp'>
                    <Typography variant="h3">Comunidade</Typography>
                    <CustomDivider />
                </AnimateOnScroll>
            </Box>
            <Box width='100%' display='flex' height='100%' justifyContent='center' alignItems='center' p={5}>
                <AnimateOnScroll>
                    <Image />
                </AnimateOnScroll>
            </Box>
            <Box>
                <Typography variant="body1" >Xing Ling - @LittleXing</Typography>
                <Typography variant="caption" textAlign='center'>"Desde que me juntei a UNetwork, fui imersa em uma comunidade acadêmica vibrante e apaixonada. Encontrei estudantes de diferentes áreas de estudo, todos prontos para compartilhar suas experiênicas, dúvidas, e conquistas. As discussões nos fóruns da UNetwork são enriquecedoras, desafiando meu pensamento e expandindo meus horizontes."</Typography>
            </Box>
        </Box>
    )
}