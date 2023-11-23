/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material'
import React, { type MutableRefObject, useEffect, useRef, useState, type ReactElement } from 'react'
import { Animation } from 'react-animate-style'

export default function AnimateOnScroll({
    children,
    animation,
    delay,
    duration,
    style,
    animateOnce 
} : {
    children: React.ReactNode,
    animation: string,
    delay?: number,
    duration?: number,
    style?: React.CSSProperties,
    animateOnce?: boolean
}) : ReactElement {
    const animationDelay = delay ?? 0
    const ref: MutableRefObject<React.ReactNode | any> = useRef()
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
    }, [ observer ])

    return (
        <Box visibility='hidden' ref={ref}>
            <Animation 
                className={isVisible ? `animate__animated animate__${animation}` : ''} style={{ display: 'flex', ...style }}
                isVisible 
                animationInDuration={duration} 
                animationInDelay={animationDelay}
            >
                {children}
            </Animation>
        </Box>
    )
}