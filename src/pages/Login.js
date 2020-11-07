import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import { useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import logo from '../assets/images/login.svg'
import useValidation from '../utils/validation/useValidation'
import requiredValidator from '../utils/validation/commonValidators/requiredValidator'
import Input from '../components/input/Input'
import Field from '../components/Field'
import { Color } from '../assets/theme'
import ValidationStatus from '../utils/validation/ValidationStatus'
import Size from '../utils/size/Size'
import loginRequestActionCreator from '../store/login/actionCreator/loginRequestActionCreator'
import errorSelectorFactory from '../store/common/selectors/errorsSelectorFactory'
import loginCompleteActionCreator from '../store/login/actionCreator/loginCompleteActionCreator'
import tokenSelector from '../store/session/selectors/tokenSelector'
import isFetchingSelectorFactory from '../store/common/selectors/isFetchingSelectorFactory'
import Routes from '../Routes'

const ContainerLogin = styled.div`
  background-color: #f9ede5;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const ContainerData = styled.div`
  max-width: ${Size.PX_600};
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: ${`-${Size.PX_16}`};
  flex-direction: column;
  justify-content: center;
  padding: ${`0 ${Size.PX_24}`};
`

const ContainerImage = styled.div`
  max-height: 35%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  max-height: 40vh;
  max-width: 100vw;
`

const Brand = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${`-${Size.PX_24}`};
  color: #68ad40;
  font-weight: bold;
  font-size: ${Size.PX_48};
  text-align: center;
`

const StyledButton = styled(Button)`
  background-color: ${(p) => p.theme[Color.PRIMARY_HIGHLIGHT]} !important;
  color: ${(p) => p.theme[Color.BACKGROUND]} !important;
  opacity: ${(p) => p.disabled && '0.4'};
  height: ${Size.PX_40};
`

const ContentButton = styled.div`
  color: ${(p) => p.theme[Color.BACKGROUND]};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Login = () => {
  const {
    value: email,
    onChange: onChangeEmail,
    hiddenError: hiddenErrorEmail,
    status: statusEmail,
    errors: errorsEmail,
  } = useValidation({ validators: [requiredValidator] })

  const {
    value: password,
    onChange: onChangePassword,
    hiddenError: hiddenErrorPassword,
    status: statusPassword,
    errors: errorsPassword,
  } = useValidation({
    validators: [requiredValidator],
    defaultHiddenError: true,
  })

  const history = useHistory()

  const dispatch = useDispatch()
  const errors = useSelector(errorSelectorFactory('login'))
  const token = useSelector(tokenSelector)
  const isFetching = useSelector(isFetchingSelectorFactory('login'))

  const [open, setOpen] = useState(errors.length)

  const handleCloseSnackbar = () => {
    setOpen(false)
    dispatch(loginCompleteActionCreator({ errors: [] }))
  }

  useEffect(() => {
    if (errors.length && !open) setOpen(true)
  }, [JSON.stringify(errors)])

  if (token) history.push(Routes.HOME)

  const disabledButton =
    isFetching ||
    statusEmail === ValidationStatus.ERROR ||
    statusPassword === ValidationStatus.ERROR

  return (
    <ContainerLogin>
      <ContainerData>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          onClose={handleCloseSnackbar}
          message={errors.length ? errors[0] : ''}
          key="error"
        />
        <ContainerImage>
          <Image src={logo} alt="Logo" />
        </ContainerImage>
        <Brand>Weight Control</Brand>
        <Field
          style={{ paddingBottom: 16, paddingTop: 24 }}
          description={errorsEmail.length ? errorsEmail[0] : ''}
          status={hiddenErrorEmail ? ValidationStatus.VALID : statusEmail}
        >
          <Input
            label="Email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value, true)}
            onBlur={() => onChangeEmail(email, false)}
            status={hiddenErrorEmail ? ValidationStatus.VALID : statusEmail}
            fullWidth
          />
        </Field>
        <Field
          style={{ paddingBottom: 24 }}
          description={errorsPassword.length ? errorsPassword[0] : ''}
          status={hiddenErrorPassword ? ValidationStatus.VALID : statusPassword}
        >
          <Input
            label="Password"
            value={password}
            onChange={(e) => onChangePassword(e.target.value, true)}
            onBlur={() => onChangePassword(password, false)}
            status={
              hiddenErrorPassword ? ValidationStatus.VALID : statusPassword
            }
            type="password"
            fullWidth
          />
        </Field>
        <StyledButton
          disabled={disabledButton}
          onClick={() => dispatch(loginRequestActionCreator(email, password))}
        >
          <ContentButton>
            {isFetching && (
              <CircularProgress
                size={24}
                color="inherit"
                style={{ position: 'absolute' }}
              />
            )}
            Login
          </ContentButton>
        </StyledButton>
      </ContainerData>
    </ContainerLogin>
  )
}

export default Login
