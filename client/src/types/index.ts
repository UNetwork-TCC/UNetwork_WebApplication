import { type CSSProperties } from 'react'

import {
    type User,
    type Group,
    type Message,
    type Chat,
    type Post,
    type Forum,
    type News,
    type Class,
    type Picture,
    type MulterFile
} from './models'

import { 
    type contact,
    type class_,
    type news,
    type folder 
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
    User,
    Group,
    Message,
    Chat,
    Post,
    Forum,
    MulterFile,
    News,
    Class,
    Picture,
    contact,
    folder,
    news,
    class_
}
