import { Shortcut } from "./dataTypes"

export interface IUser {
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
  groupes: IGroup[]
  chats: IChat[]
  admin: boolean
  posts: IPost[]
  otherInfo: {
    avatar?: {
      src: string,
      name: string
    }
    bio?: string
    phone?: string
    grade?: number
    shortcuts?: Shortcut[]
  }
}

export interface IGroup {
  _id?: string
  title: string
  description: string
  usersOnGroup: string[]
  createdAt: string
  messages: any[]
}

export interface IClass {
  _id?: string
  name: string
  title: string
  description: string
  theme: string
  usersOnClass: string[]
  messages: IMessage[]
  voiceChannels: any[]
  chatChannels: any[]
  createdAt: string
  createdBy: IUser
  createdIn: IGroup
}

export interface IMessage {
  _id?: string
  content: string
  sendedBy: string
  sendedAt: string
  sendedIn: string
  type: 'text' | 'audio' | 'video' | 'sticker'
}

export interface IChat {
  _id?: string
  users: string[]
  messages: IMessage[]
}

export interface IPost {
  _id?: string
  content: {
    text?: string
    picture?: string
  }
  postedBy: string
  postedAt: string
  postedIn: 'group' | 'chat' | 'forum' | 'post'
  comments: IMessage[]
  likes: IUser[]
  views: IUser[]
}

export interface IForum {
  _id?: string
  title: string
  description: string
  topic: string
  createdAt: string
  createdBy: string
  createdIn: IGroup | IChat | IForum | string
  closedAt?: string
  comments: IMessage[]
  likes: IUser[]
  usersIn: IUser[]
  image?: string
}

export interface INews {
  _id?: string
  name: string
  description: string
  content: string
  postedAt: string
  comments: IMessage[]
  likes: IUser[]
  views: IUser[]
}

export interface IPicture {
  _id?: string
  name: string
  src: string
  userId: string
  at: {
    id: string
    type: 'post' | 'class' | 'chat'
  }
}

export interface IMaterial {
    _id?: string
    file: string
    createdAt: string
    createdBy: string
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