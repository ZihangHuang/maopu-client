import React, { createContext } from 'react'
import { useLocalStore, observer } from 'mobx-react-lite'
import { IRootStore, IUserStore } from '../types'
import createUserStore from './user'

export const Context = createContext<IRootStore | null>(null)

export let rootStore: IRootStore

export const Provide = observer(props => {
  const userStore = useLocalStore<IUserStore>(createUserStore)

  rootStore = {
    userStore
  }

  return <Context.Provider value={rootStore}>{props.children}</Context.Provider>
})
