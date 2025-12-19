import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

interface NoopStorage {
  getItem: (_key: string) => Promise<null>
  setItem: (_key: string, _value: string) => Promise<void>
  removeItem: (_key: string) => Promise<void>
}

const createNoopStorage = (): NoopStorage => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, _value: string) {
      return Promise.resolve()
    },
    removeItem(_key: string) {
      return Promise.resolve()
    }
  }
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

export default storage
