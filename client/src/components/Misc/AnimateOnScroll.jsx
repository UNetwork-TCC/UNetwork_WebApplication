/* eslint-disable react/prop-types */
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Animation } from 'react-animate-style'

export default function AnimateOnScroll({ children, animation, delay, duration, style }) {
    const ref = useRef()
    const [ isVisible, setIsVisible ] = useState(false)
    const [ count, setCount ] = useState(0)

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setIsVisible(true)
                
                setCount(count + 1)
                setTimeout(() => {
                    ref.current.style.visibility = 'initial'
                }, delay)
            } else {
                if (count === 0) {
                    setIsVisible(false)
                    
                    setTimeout(() => {
                        ref.current.style.visibility = 'hidden'
                    }, delay)
                }
            }
        })
    })

    useEffect(() => {
        observer.observe(ref.current)
    }, [])

    return (
        <Box visibility='hidden' ref={ref}>
            <Animation className={isVisible ? `animate__animated animate__${animation}` : ''} style={{ display: 'flex', ...style }} isVisible animationInDuration={duration} animationInDelay={delay}>
                {children}
            </Animation>
        </Box>
    )
}