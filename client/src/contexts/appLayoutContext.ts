import { createContext } from 'react'

interface AppLayout {
    leftSideBar: boolean | undefined
    rightSideBar: boolean | undefined
    maximizedWindow: boolean | undefined
}

export const appLayout: AppLayout = {
    leftSideBar: true,
    rightSideBar: true,
    maximizedWindow: false
}

export const appLayoutContext = createContext(appLayout)
