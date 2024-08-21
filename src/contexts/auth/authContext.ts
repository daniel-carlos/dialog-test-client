import { create } from "zustand";
import { User } from "../../types/mainTypes";
import { unstable_batchedUpdates } from "react-dom";
import { createJSONStorage, persist } from "zustand/middleware";

interface useAuthProps {
    me: User | null,
    setMe: (newUser: User | null) => void,
    token: string,
    logout: () => void,
    setToken: (token: string) => void,
}

export const useAuth = create<useAuthProps>()(
    persist(
        (set, get) => ({
            me: null,
            setMe: (newUser: User | null) => set(() => {
                return ({ me: newUser })
            }),
            token: "",
            logout: () => set((state) => {
                return { token: "", me: null }
            }),
            setToken: (newToken: string) => set(() => ({ token: newToken })),
        }),
        {
            name: 'dialog-blog-auth-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    ))


export const getToken = () => {
    return unstable_batchedUpdates(() => {
        return useAuth.getState().token
    })
}
