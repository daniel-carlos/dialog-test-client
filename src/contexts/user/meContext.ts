import { create } from "zustand";
import { User } from "../../types/mainTypes";
import { unstable_batchedUpdates } from "react-dom";
import { createJSONStorage, persist } from "zustand/middleware";

interface MeProps {
    me: User | null,
    setMe: (newUser: User | null) => void,
    token: string,
    logout: () => void,
    setToken: (token: string) => void,
}

export const useMe = create<MeProps>()(
    persist(
        (set, get) => ({
            me: null,
            setMe: (newUser: User | null) => set(() => {
                console.log("SET ME");
                return ({ me: newUser })
            }),
            token: "",
            logout: () => set((state) => {
                console.log("LOGOUT");
                return { token: "", me: null }
            }),
            setToken: (newToken: string) => set(() => ({ token: newToken })),
        }),
        {
            name: 'me-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    ))


export const getToken = () => {
    return unstable_batchedUpdates(() => {
        return useMe.getState().token
    })
}
