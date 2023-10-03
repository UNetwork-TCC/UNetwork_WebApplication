export type contact = {
    name: string,
    code: string,
    notification: string,
    date: string
}

export type class_ = {
    title: string,
    visibility: 'public' | 'private'
    code: string,
    setPassword: string,
    getPassword: string
}

export type folder = {
    title: string,
    subtitle: string,
    visibility: 'public' | 'private'
}

export type material = {
    title: string,
    visibility: string,
    code: string,
    setPassword: string,
    getPassword: string
}

export type news = {
    title: string,
    description: string,
    visibility: 'public' | 'private',
    code: string,
    setPassword: string,
    getPassword: string
}