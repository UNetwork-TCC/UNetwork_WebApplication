# Database Schemas - UNetwork

Documentação dos schemas MongoDB utilizados no projeto.

**Banco:** MongoDB Atlas
**ODM:** Mongoose 8.13.2

---

## Collections

### Users

**Collection:** `Users`
**Arquivo:** `lib/server/models/userModel.ts`

```javascript
{
  username: String (required, max 50),
  name: String (required, max 50),
  email: String (required, max 50),
  password: String (required, max 50),
  followers: [String],              // IDs dos seguidores
  groupes: [String],                // IDs dos grupos
  chats: [String],                  // IDs dos chats
  admin: Boolean (default: false),
  posts: [String],                  // IDs dos posts
  createdAt: String (ISO date),
  avatar: String (required),
  grade: Number (default: 1),
  class: String (required),
  shortcuts: [{
    title: String (required, max 50),
    category: String (required, max 50),
    color: String (required, max 50),
    link: String (required, max 50)
  }],
  otherInfo: {
    bio: String (required, max 50),
    phone: String (required, max 50)
  }
}
```

---

### Posts

**Collection:** `Posts`
**Arquivo:** `lib/server/models/postModel.ts`

```javascript
{
  content: Object (required),
  postedBy: Object (required),      // Dados do usuário que postou
  postedAt: String (ISO date, auto),
  postedIn: Object (required),
  comments: {
    amount: Number,
    comments: Array
  },
  likes: {
    amount: Number,
    likes: Array
  },
  views: {
    amount: Number,
    views: Array
  }
}
```

---

### Forums

**Collection:** `Forums`
**Arquivo:** `lib/server/models/forumModel.ts`

```javascript
{
  title: String (required, max 50),
  description: String (required, max 100),
  topic: String (required),
  image: String,
  createdAt: String (auto),
  createdBy: Object (default: { user: {} }),
  comments: Array (default: []),
  usersIn: Array (default: []),
  likes: Array (default: []),
  closedAt: String (default: "Em aberto")
}
```

---

### Chats

**Collection:** `Chats`
**Arquivo:** `lib/server/models/chatModel.ts`

```javascript
{
  users: Array (required),          // Usuários participantes do chat
  messages: Array (default: [])     // Mensagens do chat
}
```

---

### Messages

**Collection:** `Messages`
**Arquivo:** `lib/server/models/messageModel.ts`

```javascript
{
  content: String (required),
  sendedBy: Object (required),      // Dados de quem enviou
  sendedAt: String (auto),
  sendedIn: String (default: "chat"),
  type: String (default: "text"),
  createdAt: Date (auto - timestamps),
  updatedAt: Date (auto - timestamps)
}
```

---

### News

**Collection:** `News`
**Arquivo:** `lib/server/models/newsModel.ts`

```javascript
{
  name: String (required, max 50),
  description: String (required, max 100),
  content: Object (required),
  postedAt: String (auto),
  comments: Array (default: []),
  likes: Array (default: []),
  views: Array (default: [])
}
```

---

### Classes

**Collection:** `Classes`
**Arquivo:** `lib/server/models/classModel.ts`

```javascript
{
  name: String (required, max 50),
  title: String (required, max 50),
  description: String (required, max 300),
  theme: String (required),
  usersOnClass: Array (default: []),
  createdAt: String (auto),
  visibility: String (default: "public"),
  code: String (auto-generated, 6 chars uppercase),
  messages: Array (default: []),
  voiceChannels: Array (default: []),
  chatChannels: Array (default: []),
  icon: String
}
```

---

### Groupes

**Collection:** `Groupes`
**Arquivo:** `lib/server/models/groupModel.ts`

```javascript
{
  title: String (required, max 50),
  description: String (required, max 100),
  usersOnGroup: Array (default: []),
  createdAt: String (auto),
  messages: Array (default: []),
  icon: String (default: "random_icon.png")
}
```

---

### Materials

**Collection:** `Materials`
**Arquivo:** `lib/server/models/materialModel.ts`

```javascript
{
  file: String (required),
  createdAt: String (ISO date, auto),
  createdBy: String (default: "System")
}
```

---

## Relacionamentos

```
Users
  ├── followers: [User._id]
  ├── groupes: [Groupes._id]
  ├── chats: [Chats._id]
  └── posts: [Posts._id]

Posts
  └── postedBy: User (embedded object)

Forums
  ├── createdBy: User (embedded object)
  └── usersIn: [User._id]

Chats
  ├── users: [User._id]
  └── messages: [Message._id]

Messages
  └── sendedBy: User (embedded object)

Classes
  └── usersOnClass: [User._id]

Groupes
  └── usersOnGroup: [User._id]
```

---

## Notas

- Senhas são hasheadas com `bcryptjs` antes de salvar
- Autenticação via JWT com secret definido em `JWT_SECRET`
- Datas são armazenadas como strings ISO 8601
- IDs são ObjectId do MongoDB (24 caracteres hex)
