import { create } from "zustand";
import { User } from "../../types/mainTypes";
import { unstable_batchedUpdates } from "react-dom";

interface MeProps {
    me: User | null,
    setMe: (newUser: User | null) => void,
    token: string,
    logout: () => void,
    setToken: (token: string) => void,
}

export const useMe = create<MeProps>()((set) => ({
    me: null,
    setMe: (newUser: User | null) => set(() => {
        return ({ me: newUser })
    }),
    token: "",
    logout: () => set(() => ({ token: "", me: null })),
    setToken: (newToken: string) => set(() => ({ token: newToken })),
}))


export const getToken = () => {
    return unstable_batchedUpdates(() => {
        return useMe.getState().token
    })
}
