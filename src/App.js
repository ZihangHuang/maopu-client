import React from 'react'
//import logo from './logo.svg'
import './App.css'
import { Provider } from 'mobx-react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import AuthRouter from './AuthRouter'
import rootStore from './store/index'
import asyncComponent from './components/core/asyncComponent'

//普通加载
// import Home from './pages/home/Home'
// import Community from './pages/community/Community'
// import ReleaseTopic from './pages/topic/ReleaseTopic'
// import TopicDetail from './pages/topic/TopicDetail'
// import User from './pages/user/User'
// import Login from './pages/user/Login'
// import Register from './pages/user/Register'
// import UserEdit from './pages/user/UserEdit'
// import Message from './pages/user/Message'
// import More from './pages/more/More'

//路由懒加载
const Home = asyncComponent(() => import('./pages/home/Home'))

const Community = asyncComponent(() => import('./pages/community/Community'))
const ReleaseTopic = asyncComponent(() => import('./pages/topic/ReleaseTopic'))
const TopicDetail = asyncComponent(() => import('./pages/topic/TopicDetail'))

const User = asyncComponent(() => import('./pages/user/User'))
const Login = asyncComponent(() => import('./pages/user/Login'))
const Register = asyncComponent(() => import('./pages/user/Register'))
const UserEdit = asyncComponent(() => import('./pages/user/UserEdit'))
const Message = asyncComponent(() => import('./pages/user/Message'))

const More = asyncComponent(() => import('./pages/more/More'))

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
