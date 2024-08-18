import { create } from "zustand";
import { User } from "../../types/mainTypes";

interface MeProps {
    me: User | null,
    setMe: (newUser: User) => void,
    token: string,
    setToken: (token: string) => void,
}

export const useMe = create<MeProps>()((set) => ({
    me: null,
    setMe: (newUser: User) => set(() => ({ me: newUser })),
    token: "",
    setToken: (newToken: string) => set(() => ({ token: newToken })),
}))
