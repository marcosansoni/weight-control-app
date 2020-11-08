import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import weightsRequestActionCreator from '../store/weights/actionCreator/weightsRequestActionCreator'
import byIdSelectorFactory from '../store/common/selectors/byIdSelectorFactory'
import Size from '../utils/size/Size'
import { Color } from '../assets/theme'
import Routes from '../Routes'
import WeightList from '../components/weight/WeightList'
import Layout from '../components/Layout'
import deleteWeightActionCreator from '../store/weights/actionCreator/deleteWeightActionCreator'
import errorSelectorFactory from '../store/common/selectors/errorsSelectorFactory'
import View from '../store/View'
import Snackbar from '../components/Snackbar'
import errorsActionCreatorFactory from '../store/common/actionCreator/errorsActionCreatorFactory'
import isFetchingSelectorFactory from '../store/common/selectors/isFetchingSelectorFactory'
import WeightChart from '../components/chart/WeightChart'
import Interval from '../utils/weight/Interval'

const EmptyPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: ${Size.PX_14};
`

const Title = styled.div`
  font-size: ${Size.PX_18};
  font-weight: bold;
  padding-bottom: ${Size.PX_24};
`

const StyledButton = styled(Button)`
  .MuiButton-root {
    font-family: inherit;
    font-size: ${Size.PX_14};
    background-color: ${(p) => p.theme[Color.NEUTRAL]};
  }
`

const AddButton = styled.div`
  border-radius: ${Size.PX_4};
  padding: ${Size.PX_8};
  cursor: pointer;

  :hover {
    background-color: ${(p) => p.theme[Color.SECONDARY]};
  }
`

const Header = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: ${Size.PX_24};
  align-items: center;
  justify-content: space-between;
  font-size: ${Size.PX_18};
`

const Logo = styled.div`
  font-weight: bold;
  font-size: ${Size.PX_32};
`

const Home = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => dispatch(weightsRequestActionCreator()), [])

  const weightsById = useSelector(byIdSelectorFactory(View.WEIGHT))
  const errors = useSelector(errorSelectorFactory(View.WEIGHT))
  const isFetching = useSelector(isFetchingSelectorFactory(View.WEIGHT))

  const [interval, setInterval] = useState(Interval.UNLIMITED)

  const renderHeader = () => {
    return (
      <Header>
        <Logo>Weight Control</Logo>
        <AddButton onClick={() => history.push(Routes.LOGOUT)}>
          Logout
        </AddButton>
      </Header>
    )
  }

  const handleDelete = (id) => {
    dispatch(deleteWeightActionCreator(id))
  }

  return (
    <>
      <Snackbar
        errors={errors}
        onClose={() => dispatch(errorsActionCreatorFactory(View.WEIGHT))}
      />
      <Layout header={renderHeader()}>
        <div style={{ display: 'flex', height: '100%' }}>
          {Object.keys(weightsById).length ? (
            <>
              <WeightList
                interval={interval}
                weights={weightsById}
                onDelete={handleDelete}
                isFetching={isFetching}
                onChangeInterval={setInterval}
              />
              <WeightChart
                isFetching={isFetching}
                weights={weightsById}
                interval={interval}
                onChangeInterval={setInterval}
              />
            </>
          ) : (
            <EmptyPlaceholder>
              <Title>No weights found</Title>
              <StyledButton
                onClick={() =>
                  history.push(`${Routes.HOME}${Routes.ADD_WEIGHT}`)}
              >
                Insert your first weight
              </StyledButton>
            </EmptyPlaceholder>
          )}
        </div>
      </Layout>
    </>
  )
}

export default Home
