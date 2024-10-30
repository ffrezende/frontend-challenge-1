import { makeAutoObservable } from 'mobx'
import { useObserver } from 'mobx-react-lite'

class GlobalStore {
  app = {
    name: 'Machine Readble',
    isFileUploading: false,
  }
  auth = {
    isAuthenticated: false,
  }

  constructor() {
    makeAutoObservable(this)
    this.setAuth = this.setAuth.bind(this)
    this.setUploadFile = this.setUploadFile.bind(this)
  }

  setAuth(auth) {
    this.auth = { ...this.auth, ...auth }
  }

  setUploadFile(isLoading) {
    this.app = { ...this.app, isFileUploading: isLoading }
  }
}

const globalStore = new GlobalStore()

const useGlobalStore = () => {
  return useObserver(() => globalStore)
}

export default useGlobalStore
