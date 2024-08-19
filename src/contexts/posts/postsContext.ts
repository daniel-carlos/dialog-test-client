import { create } from "zustand";
import { Post, User } from "../../types/mainTypes";
import { createJSONStorage, persist } from "zustand/middleware";

interface PostContextProps {
    posts: Post[],
    setPosts: (posts: Post[]) => void,
    addPost: (newPost: Post) => void
}

export const useMe = create<PostContextProps>()(
    persist(
        (set, get) => ({
            posts: [],
            setPosts: (newPosts: Post[]) => set(() => {
                return ({ posts: newPosts })
            }),
            addPost: (newPost: Post) => ({ posts: [get().posts, newPost] })
        }),
        {
            name: 'me-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)


