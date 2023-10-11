export interface User {
  _id?: string
  name: string
  email: string
  followers: User[]
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
    avatar: string
    bio: string
    phone: string
    city: string
    state: string
    country: string
    grade: number
  }
}

export interface Group {
  _id?: string
  title: string
  description: string
  usersOnGroup: User[]
  createdAt: Date
  messages: any[]
}

export interface Class {
  _id?: string
  name: string
  title: string
  description: string
  theme: string
  usersOnClass: User[]
  messages: Message[]
  voiceChannels: any[]
  chatChannels: any[]
  createdAt: Date
  createdBy: User
  createdIn: Group
}

export interface Message {
  _id?: string
  content: string
  sendedBy: User
  sendedAt: Date
  sendedIn: Group
  type: 'text' | 'audio' | 'video' | 'sticker'
}

export interface Chat {
  _id?: string
  users: User[]
  messages: Message[]
}

export interface Post {
  _id?: string
  name: string
  description: string
  content: {
    text?: string
    picture?: Picture
  }
  postedBy: User
  postedAt: Date
  postedIn: Group | Chat | Forum
  comments: Message[]
  likes: User[]
  views: User[]
}

export interface Forum {
  _id?: string
  title: string
  description: string
  topic: string
  createdAt: Date
  createdBy: User
  createdIn: Group | Chat | Forum
  closedAt?: Date
  comments: Message[]
  likes: User[]
  usersIn: User[]
}

export interface News {
  _id?: string
  name: string
  description: string
  content: string
  postedAt: Date
  comments: Message[]
  likes: User[]
  views: User[]
}

export interface Picture {
  _id?: string
  name: string
  src: string
}
