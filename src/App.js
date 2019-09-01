import React from 'react'
//import logo from './logo.svg'
import './App.css'
import { Provider } from 'mobx-react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRouter from './AuthRouter'
import rootStore from './store/index'

// import BottomBar from './components/layout/BottomBar'

import Home from './pages/home/Home'

import Community from './pages/community/Community'
import ReleaseTopic from './pages/community/ReleaseTopic'
import TopicDetail from './pages/community/TopicDetail'

import User from './pages/user/User'
import Login from './pages/user/Login'
import Register from './pages/user/Register'
import UserEdit from './pages/user/UserEdit'
import Message from './pages/user/Message'

import More from './pages/more/More'

function App() {
  return (
    <Provider rootStore={rootStore}>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/community" exact component={Community} />
          <Route path="/user" exact component={User} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <AuthRouter path="/more" component={More} />
          <AuthRouter path="/user/edit" component={UserEdit} />
          <AuthRouter path="/topic/release" component={ReleaseTopic} />
          <AuthRouter path="/message" component={Message} />
          <Route path="/topic/detail/:id" component={TopicDetail} />
          <Route path="" component={() => '进入了知识的荒原'} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
