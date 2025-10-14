import { type CSSProperties } from 'react'

import {
    type IUser,
    type IGroup,
    type IMessage,
    type IChat,
    type IPost,
    type IForum,
    type INews,
    type IClass,
    type IPicture,
    type IMaterial,
    type MulterFile
} from './models'

import { 
    type Topic,
    type Shortcut
} from './dataTypes'

export interface AppLayout {
    sideBar: {
        dropdownButtonClicked: boolean
        shortcutsExpanded: boolean
    }

    window: {
        size: CSSProperties,
    }
}

export type {
    IUser,
    IGroup,
    IMessage,
    IChat,
    IPost,
    IForum,
    MulterFile,
    INews,
    Topic,
    IClass,
    IPicture,
    IMaterial,
    Shortcut
}
