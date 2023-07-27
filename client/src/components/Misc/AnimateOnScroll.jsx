/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Animation } from 'react-animate-style'

export default function AnimateOnScroll({ children, animation, delay, duration, style, animateOnce }) {
    const animationDelay = delay ? delay : 0
    const ref = useRef()
    const [ isVisible, setIsVisible ] = useState(false)

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                
                setTimeout(() => {
                    ref.current.style.visibility = 'initial'
                }, animationDelay)
            } else {
                if (!animateOnce) {
                    setIsVisible(false)
                    
                    setTimeout(() => {
                        ref.current.style.visibility = 'hidden'
                    }, animationDelay)
                }
            }
        })
    })

    useEffect(() => {
        observer.observe(ref.current)
    }, [])

    return (
        <Box visibility='hidden' ref={ref}>
            <Animation className={isVisible ? `animate__animated animate__${animation}` : ''} style={{ display: 'flex', ...style }} isVisible animationInDuration={duration} animationInDelay={animationDelay}>
                {children}
            </Animation>
        </Box>
    )
}