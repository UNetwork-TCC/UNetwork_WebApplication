import { type shortcut } from './dataTypes'

export interface User {
  username?: string,
  _id?: string
  name: string
  email: string
  followers: string[]
  settings: {
    theme: 'dark' | 'light'
    account: 'public' | 'private'
  }
  password: string
  groupes: Group[]
  chats: Chat[]
  admin: boolean
  posts: Post[]
  otherInfo: {
    avatar?: {
      src: string,
      name: string
    }
    bio?: string
    phone?: string
    grade?: number
    shortcuts?: shortcut[]
  }
}

export interface Group {
  _id?: string
  title: string
  description: string
  usersOnGroup: string[]
  createdAt: string
  messages: any[]
}

export interface Class {
  _id?: string
  name: string
  title: string
  description: string
  theme: string
  usersOnClass: string[]
  messages: Message[]
  voiceChannels: any[]
  chatChannels: any[]
  createdAt: string
  createdBy: User
  createdIn: Group
}

export interface Message {
  _id?: string
  content: string
  sendedBy: string
  sendedAt: string
  sendedIn: 'group' | 'chat' | 'forum' | 'post'
  type: 'text' | 'audio' | 'video' | 'sticker'
}

export interface Chat {
  _id?: string
  users: string[]
  messages: Message[]
}

export interface Post {
  _id?: string
  name: string
  description: string
  content: {
    text?: string
    picture?: string
  }
  postedBy: string
  postedAt: string
  postedIn: 'group' | 'chat' | 'forum' | 'post'
  comments: Message[]
  likes: User[]
  views: User[]
}

export interface Forum {
  _id?: string
  title: string
  description: string
  topic: string
  createdAt: string
  createdBy: string
  createdIn: Group | Chat | Forum | string
  closedAt?: string
  comments: Message[]
  likes: User[]
  usersIn: User[]
  image?: string
}

export interface News {
  _id?: string
  name: string
  description: string
  content: string
  postedAt: string
  comments: Message[]
  likes: User[]
  views: User[]
}

export interface Picture {
  _id?: string
  name: string
  src: string
  userId: string
  at: {
    id: string
    type: 'post' | 'class' | 'chat'
  }
}

export interface MulterFile extends File {
  fieldname: string
  originalname: string
  enconding: string
  mimetype: string
  destination: string
  filename: string
  path: string
  size: number
}