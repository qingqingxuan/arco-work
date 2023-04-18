import { defineStore } from 'pinia'
import { UserRole, UserState } from '../types'
import store from '../pinia'

import Avatar from '@/assets/img_avatar.gif'

const defaultAvatar = Avatar

const useUserStore = defineStore('user-info', {
  state: () => {
    return {
      id: 0,
      token: '',
      roles: null,
      username: '',
      avatar: defaultAvatar,
    } as UserState
  },
  actions: {
    saveUser(userInfo: UserState, roles: UserRole[], token: string) {
      return new Promise<UserState>((resolve, reject) => {
        if (!userInfo) {
          reject(new Error('user info is null'))
          return
        }
        this.id = userInfo.id
        this.token = token
        this.roles = roles
        this.username = userInfo.username
        this.avatar = userInfo.avatar || defaultAvatar
        resolve(userInfo)
      })
    },
    isTokenExpire() {
      return !this.token
    },
    logout() {
      return new Promise<void>((resolve) => {
        this.$reset()
        localStorage.clear()
        sessionStorage.clear()
        resolve()
      })
    },
  },
  presist: {
    enable: true,
    resetToState: true,
  },
})

export default useUserStore

export function useUserStoreContext() {
  return useUserStore(store)
}
