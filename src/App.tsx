import React, { lazy, Suspense } from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import AuthRoute from './core/AuthRoute'
import { Provide } from './store'
import './App.css'
import history from './core/history'

const Home = lazy(() => import('./pages/home/Home'))
const User = lazy(() => import('./pages/user/User'))
const Login = lazy(() => import('./pages/user/Login'))
const Register = lazy(() => import('./pages/user/Register'))
const UserEdit = lazy(() => import('./pages/user/UserEdit'))
const Message = lazy(() => import('./pages/user/Message'))
const Community = lazy(() => import('./pages/community/Community'))
const TopicDetail = lazy(() => import('./pages/topic/TopicDetail'))
const TopicRelease = lazy(() => import('./pages/topic/TopicRelease'))

const NotFound: React.FC = () => <h1>进入了知识的荒原</h1>

const App: React.FC = () => {
  return (
    <Provide>
      <Router history={history}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/community" component={Community} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/user" exact component={User} />
            <AuthRoute path="/user/edit" component={UserEdit} />
            <AuthRoute path="/message" exact component={Message} />
            <AuthRoute path="/topic/release" component={TopicRelease} />
            <AuthRoute
              path="/topic/detail/:id"
              component={TopicDetail}
              isRedict={false}
            />
            <Route path="" component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </Provide>
  )
}

export default App
