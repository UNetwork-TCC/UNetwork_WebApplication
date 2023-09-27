import { createContext } from "react"

export const appLayout = {
    leftSideBar: true,
    rightSideBar: true
}

export const appLayoutContext = createContext(appLayout)