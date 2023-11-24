import { createContext, type CSSProperties } from 'react'

interface AppLayout {
    sideBar: {
        dropdownButtonClicked: boolean
        setDropdownButtonClicked: () => void
        shortcutsExpanded: boolean
        setShortcutsExpanded: () => void
    }

    window: {
        size: CSSProperties,
        setSize: (css: CSSProperties) => void
    }
}

export const appLayout: AppLayout = {
    sideBar: {
        dropdownButtonClicked: false,
        setDropdownButtonClicked: () => {},
        shortcutsExpanded: true,
        setShortcutsExpanded: () => {}
    },

    window: {
        size: {
            height: '95vh',
            width: '95vw',
            borderRadius: '1rem'
        },
        setSize: () => {}
    }
}

export const appLayoutContext = createContext<AppLayout>(appLayout)
