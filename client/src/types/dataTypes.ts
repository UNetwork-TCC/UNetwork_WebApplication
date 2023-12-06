export interface contact {
  name: string
  code: string
  notification: string
  date: string
}

export interface class_ {
  title: string
  visibility: 'public' | 'private'
  code: string
  setPassword: string
  getPassword: string
}

export interface folder {
  title: string
  subtitle: string
  visibility: 'public' | 'private'
}

export interface material {
  title: string
  visibility: string
  code: string
  setPassword: string
  getPassword: string
}

export interface news {
  title: string
  description: string
  visibility: 'public' | 'private'
  file: string
  image: string
  topic: Topic 
}

export interface shortcut {
  title: string
  category: string
  color: string
  link?: string
}

export type Topic = 'Escola'
| 'Trabalho/Atividade'
| 'Tutoria'
| 'Professores'
| 'Funcionários'
| 'Eventos'
| 'TCC'
| 'Cursos'
| 'Desenvolvimento de Sistemas'
| 'Administração'
| 'Nutrição'
| 'Enfermagem'
| 'Vida Pessoal'
| 'Vida'
| 'Outro'