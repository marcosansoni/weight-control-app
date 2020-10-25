import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import React from 'react'
import tokenSelector from './store/session/selectors/tokenSelector'
import Login from './pages/Login'

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: relative;
`

const Routes = {
  LOGIN: '/login',
  SIGN_UP: '/signUp',
}


const Routing = () => {
  const session = useSelector(tokenSelector)

  return (
    <Page>
      <BrowserRouter>
        {!session && (
          <Redirect to={Routes.LOGIN} />
        )}
        <Route exact path={Routes.LOGIN}>
          <Login />
        </Route>
        {/* <Route exact path={Route.SIGN_UP}> */}
        {/*  <SignUp /> */}
        {/* </Route> */}
      </BrowserRouter>
    </Page>
  )
}

export default Routing
