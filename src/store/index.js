import UserStore from './user-store'

class RootStore {
  constructor() {
    this.userStore = new UserStore(this)
  }
}

export default new RootStore()