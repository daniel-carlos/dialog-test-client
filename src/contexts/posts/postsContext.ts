import { create } from "zustand";
import { Like, Post } from "../../types/mainTypes";
import { createJSONStorage, persist } from "zustand/middleware";

interface PostContextProps {
    posts: Post[],
    setPosts: (posts: Post[]) => void,
    addPost: (newPost: Post) => void,
    addLike: (post: Post, like: Like) => void,
    removeLike: (post: Post, userId: number) => void,
}

export const usePostContext = create<PostContextProps>()(
    persist(
        (set, get) => ({
            posts: [],
            setPosts: (newPosts: Post[]) => set(() => {
                return ({ posts: newPosts })
            }),
            addPost: (newPost: Post) => ({ posts: get().posts.push(newPost) }),
            addLike: (post: Post, like: Like) => {
                const { setPosts, posts } = get();
                addLikeInPost(setPosts, posts, post, like);
            },
            removeLike: (post: Post, userId: number) => {
                const { setPosts, posts } = get();
                removeLikeFromPost(setPosts, posts, post, userId);
            }
        }),
        {
            name: 'me-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)


function addLikeInPost(setPosts: (posts: Post[]) => void, posts: Post[], post: Post, like: Like) {
    setPosts(posts.map((v, i) => {
        if (v === post) {
            return { ...post, likes: [like, ...post.likes!] };
        } else {
            return v;
        }
    }));
}

function removeLikeFromPost(setPosts: (posts: Post[]) => void, posts: Post[], post: Post, userId: number) {
    setPosts(posts.map((v, i) => {
        if (v === post) {
            return { ...post, likes: post.likes?.filter(l => l.user.id != userId) };
        } else {
            return v;
        }
    }));
}

