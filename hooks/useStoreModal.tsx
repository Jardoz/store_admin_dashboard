import { create } from "zustand"

interface useStoreModalStore {
    count: number
    isOpen: boolean
    addStore: () => void
    setStore: (num: number) => void
    onOpen: () => void
    onClose: () => void
}

export const useStoreModal = create<useStoreModalStore>((set) => ({
    count: 0,
    isOpen: false,
    setStore: (num) => set({ count: num }),
    addStore: () => set((state) => ({ count: state.count + 1 })),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))