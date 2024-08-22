export const getAvatarURL = (userId: number) => {
    return `${import.meta.env.VITE_STATIC_URL}/avatar-${userId}.png`
}