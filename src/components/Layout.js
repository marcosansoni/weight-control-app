import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import Size from '../utils/size/Size'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

const Header = styled.div`
  position: relative;
  width: 100vw;
  height: ${Size.PX_64};
  display: flex;
  justify-content: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
`

const Grid = styled.div`
  max-width: 1480px;
  width: 100%;
  height: 100%;
`

const Content = styled.div`
  position: relative;
  width: 100vw;
  height: ${`calc(100vh - ${Size.PX_64})`};
  display: flex;
  justify-content: center;
`

const Layout = (props) => {
  const { header, children } = props
  return (
    <Container>
      <Header>
        <Grid>{header}</Grid>
      </Header>
      <Content>
        <Grid>{children}</Grid>
      </Content>
    </Container>
  )
}

Layout.propTypes = {
  header: PropTypes.element.isRequired,
  children: PropTypes.element.isRequired,
}

export default Layout
