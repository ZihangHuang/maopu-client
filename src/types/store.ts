import { IUserInfo } from './data'

export interface IUserStore {
  token: string | null
  readonly isLogin: boolean
  userInfo: IUserInfo
  setToken(token: string): void
  login(data: any): void
  logout(): void
  setUserInfo(userInfo: AnyObject): void
  getUserInfoByToken(): Promise<IUserInfo | undefined>
}

export interface IRootStore {
  userStore: IUserStore
}
