export interface User {
    id: number;
    username: string,
    name: string,
    avatarUrl: string,
    likes?: Like[]
    posts?: Post[]
}

export interface Like {
    id: number;
    user: User,
    post: Post
}

export interface Post {
    id: number;
    content: string,
    author: User,
    likes?: Like[],
    createdAt: Date
}