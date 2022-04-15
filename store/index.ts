import { createStore } from './createStore'
import { useLocalObservable } from 'mobx-react-lite'

const platform = process.env.platform
export function useModel() {
  return useLocalObservable(() => ({
    platform,
    setPlatform(platform) {
      this.platform = platform
    }
  }))
}

const store = createStore(useModel)
export const Provider = store.Provider
export const Context = store.Context
export const useStore = store.useStore
