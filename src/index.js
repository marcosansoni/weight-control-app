import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import configureStore from './store/config/configureStore'
import theme from './assets/theme'
import Routing from './Routing'

const store = configureStore()

const currentTheme = store.getState().theme

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme[currentTheme]}>
      <Provider store={store}>
        <Routing />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
