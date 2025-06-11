import { create } from 'zustand'

interface SettingStore {
  domainImage: string
  setDataSetting: (payload: { domainImage: string }) => void
}

const useSettingStore = create<SettingStore>((set) => ({
  domainImage: '',
  setDataSetting: (payload) => set({ domainImage: payload.domainImage }),
}))

export default useSettingStore
