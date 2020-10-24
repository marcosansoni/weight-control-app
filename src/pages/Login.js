import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Input } from 'antd'
import logo from '../assets/images/login.svg'

const ContainerLogin = styled.div`
  background-color: #f9ede5;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ContainerData = styled.div`
  max-width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ContainerImage = styled.div`
  max-height: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  height: -webkit-fill-available;
`

const Brand = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -36px;
  color: #68ad40;
  font-weight: bold;
  font-size: 3.6rem;
`
const GlobalStyle = createGlobalStyle`
  .ant-input:hover, .ant-input:focus{
    border-color: #68ad40
  } 
`

const Login = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  return (
    <ContainerLogin>
      <GlobalStyle />
      <ContainerData>
        <ContainerImage><Image src={logo} alt="Logo" /></ContainerImage>
        <Brand>Weight Control</Brand>
        <Input
          placeholder="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ marginTop: 24, marginBottom: 24 }}
        />
        <Input
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />
      </ContainerData>
    </ContainerLogin>
  )
}

export default Login
