import { create } from 'zustand'

export const useLauncher = create((set) => ({
  launcher : [],
  addLauncher: (obj) => set((state) => ({ launcher : [...state.launcher, obj] })),
  removeLauncher: () => set(() => ({launcher: []}))
}))

