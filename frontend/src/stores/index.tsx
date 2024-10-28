import { makeAutoObservable } from 'mobx'
import { useObserver } from 'mobx-react-lite'

class GlobalStore {
  app = {
    name: 'Machine Readble',
  }
  auth = {
    isAuthenticated: false,
  }

  constructor() {
    makeAutoObservable(this)
    this.setAuth = this.setAuth.bind(this)
  }

  setAuth(auth) {
    this.auth = { ...this.auth, ...auth }
  }
}

const globalStore = new GlobalStore()

const useGlobalStore = () => {
  return useObserver(() => globalStore)
}

export default useGlobalStore
