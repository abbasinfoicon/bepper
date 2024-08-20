import { create } from 'zustand'

const useStore = create((set) => ({
    fullName: "",
    setName: (name) => set({ fullName: name })
}))

export default useStore