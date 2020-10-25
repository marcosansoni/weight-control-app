import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import logo from '../assets/images/login.svg'
import useValidation from '../utils/validation/useValidation'
import requiredValidator from '../utils/validation/commonValidators/requiredValidator'
import Input from '../components/input/Input'
import Field from '../components/Field'
import { Color } from '../assets/theme'
import ValidationStatus from '../utils/validation/ValidationStatus'
import Size from '../utils/size/Size'

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

const Login = () => {
  const {
    value: username,
    onChange: onChangeUsername,
    hiddenError: hiddenErrorUsername,
    status: statusUsername,
    errors: errorsUsername,
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

  return (
    <ContainerLogin>
      <ContainerData>
        <ContainerImage>
          <Image src={logo} alt="Logo" />
        </ContainerImage>
        <Brand>Weight Control</Brand>
        <Field
          style={{ paddingBottom: 16, paddingTop: 24 }}
          description={errorsUsername.length ? errorsUsername[0] : ''}
          status={hiddenErrorUsername ? ValidationStatus.VALID : statusUsername}
        >
          <Input
            label="Username"
            value={username}
            onChange={(e) => onChangeUsername(e.target.value, true)}
            onBlur={() => onChangeUsername(username, false)}
            status={
              hiddenErrorUsername ? ValidationStatus.VALID : statusUsername
            }
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
          disabled={
            statusUsername === ValidationStatus.ERROR ||
            statusPassword === ValidationStatus.ERROR
          }
          onClick={() => console.log('Loginaa')}
        >
          Login
        </StyledButton>
      </ContainerData>
    </ContainerLogin>
  )
}

export default Login
