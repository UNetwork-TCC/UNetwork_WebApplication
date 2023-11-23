import { type Dispatch, type SetStateAction, createContext, type CSSProperties } from 'react'

interface AppLayout {
    sideBar: {
        dropdownButtonClicked: boolean
        setDropdownButtonClicked: Dispatch<SetStateAction<boolean>>
        shortcutsExpanded: boolean
        setShortcutsExpanded: Dispatch<SetStateAction<boolean>>
    }

    window: {
        size: CSSProperties,
        setSize: Dispatch<SetStateAction<CSSProperties>>
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
