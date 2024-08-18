export interface User {
    username: string,
    name: string,
    avatarUrl: string,
    likes?: Like[]
    posts?: Post[]
}

export interface Like {
    user: User,
    post: Post
}

export interface Post {
    content: string,
    author: User,
    likes?: Like[],
    createdAt: Date
}