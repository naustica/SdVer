import { h, render, Component, ComponentChild } from 'preact'
import Router from 'preact-router'
import { Provider } from 'unistore/preact'

import './app.scss'

import store from './store/store'

import Memorials from './views/memorials/memorials'
import Item from './views/item/item'


class App extends Component {

  public render = (): ComponentChild => {
    return (
      <div class="app">
        <Router>
          <Memorials path="/" />
          <Item path="/item/:id" />
        </Router>
      </div>
    )
  }
}

render (
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
)
