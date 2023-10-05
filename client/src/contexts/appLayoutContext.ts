import { createContext } from 'react'

interface AppLayout {
    leftSideBar: boolean | undefined,
    rightSideBar: boolean | undefined,
}

export const appLayout: AppLayout = {
    leftSideBar: true,
    rightSideBar: true
}

export const appLayoutContext = createContext(appLayout)
