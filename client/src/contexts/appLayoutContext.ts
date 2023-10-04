import { createContext } from 'react'

export const appLayout: { leftSideBar: boolean; rightSideBar: boolean } = {
    leftSideBar: true,
    rightSideBar: true
}

export const appLayoutContext = createContext(appLayout)
