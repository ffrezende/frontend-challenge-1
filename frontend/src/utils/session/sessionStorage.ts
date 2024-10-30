export const addSessionStorage = (key: string, data: any) => {
  sessionStorage.setItem(key, data)
}

export const getSessionStorage = (key: string) => {
  return sessionStorage.getItem(key)
}

export const removeSessionStorage = (key: string) => {
  sessionStorage.removeItem(key)
}
