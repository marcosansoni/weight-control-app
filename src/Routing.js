import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import React from 'react'
import tokenSelector from './store/session/selectors/tokenSelector'
import Login from './pages/Login'
import Home from './pages/Home'
import Routes from './Routes'
import AddWeight from './pages/AddWeight'
import Logout from './pages/Logout'

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: relative;
`

const Routing = () => {
  const session = useSelector(tokenSelector)

  return (
    <Page>
      <BrowserRouter>
        {!session && (
          <Redirect to={Routes.LOGIN} />
        )}
        <Route path={Routes.HOME}>
          <Home />
        </Route>
        <Route path={`${Routes.HOME}${Routes.ADD_WEIGHT}`}>
          <AddWeight />
        </Route>
        <Route exact path={Routes.LOGIN}>
          <Login />
        </Route>
        <Route exact path={Routes.LOGOUT}>
          <Logout />
        </Route>
        <Route exact path="/">
          <Redirect to={Routes.LOGIN} />
        </Route>
        {/* <Route exact path={Route.SIGN_UP}> */}
        {/*  <SignUp /> */}
        {/* </Route> */}
      </BrowserRouter>
    </Page>
  )
}

export default Routing
