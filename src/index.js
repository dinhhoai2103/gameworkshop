import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Switch, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import DefaultLayout from './layout/DefaultLayout/DefaultLayout'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Type from './pages/Type'
import Category from './pages/Category'
import UserInfo from './pages/User/UserInfo'
import ChangePassword from './pages/User/ChangePassword'
import Payment from './pages/User/Payment'
import Wishlist from './pages/User/Wishlist'
import History from './pages/User/History'

import GameInfo from './pages/GameInfo'
import Cart from './pages/Cart'
import Success from './pages/Success'
import NotFound from './pages/NotFound'
import Scroll from './pages/Scroll'
import history from './util/history'

import myReducer from './redux/reducers/index'
import mySaga from './redux/sagas'

import * as serviceWorker from './serviceWorker'

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(myReducer, applyMiddleware(...[sagaMiddleware, logger]))
sagaMiddleware.run(mySaga)



ReactDOM.render(
  <React.StrictMode>
    <Scroll  showBelow={250}/>
    <Provider store={store}>
      <Router  history={history}>
        <Switch>
        <DefaultLayout exact path="/" component= {Home} />

        <DefaultLayout exact path="/register" component= {Register} />
        <DefaultLayout exact path="/login" component= {Login} />

        <DefaultLayout exact path="/user" component= {UserInfo} />
        <DefaultLayout exact path="/password" component= {ChangePassword} />
        <DefaultLayout exact path="/payment" component= {Payment} />
        <DefaultLayout exact path="/wishlist" component= {Wishlist} />
        <DefaultLayout exact path="/history" component= {History} />
        <DefaultLayout exact path="/cart" component= {Cart} />
        <DefaultLayout exact path="/success" component= {Success} />
         
        <DefaultLayout exact path="/type" component= {Type} />
        <DefaultLayout exact path="/category" component= {Category} />

        <DefaultLayout exact path="/games/:id" component={GameInfo}/>

        <Route component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
