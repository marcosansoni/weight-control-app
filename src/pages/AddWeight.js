import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { useMediaQuery, useTheme } from '@material-ui/core'
import styled from 'styled-components'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import moment from 'moment'
import MomentUtils from '@date-io/moment'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Size from '../utils/size/Size'
import Field from '../components/Field'
import Input from '../components/input/Input'
import useValidation from '../utils/validation/useValidation'
import requiredValidator from '../utils/validation/commonValidators/requiredValidator'
import ValidationStatus from '../utils/validation/ValidationStatus'
import Routes from '../Routes'
import createWeightActionCreator from '../store/weights/actionCreator/createWeightActionCreator'

const Spaced = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  font-weight: bold;
  font-size: ${Size.PX_20};
`

const AddWeight = () => {
  const materialTheme = useTheme()
  const history = useHistory()
  const fullScreen = useMediaQuery(materialTheme.breakpoints.down('sm'))
  const handleClose = () => history.push(Routes.HOME)
  const dispatch = useDispatch()



  const [date, setDate] = useState(new Date())
  const {
    value: weight,
    onChange: onChangeWeight,
    hiddenError: hiddenErrorWeight,
    status: statusWeight,
    errors: errorsWeight,
  } = useValidation({
    validators: [requiredValidator],
    defaultHiddenError: true,
  })
  const [note, setNote] = useState()

  const handleAddWeight = () => {
    dispatch(createWeightActionCreator({
      date: moment.utc(date).format("DD/MM/YYYY"),
      weight,
      note,
    }))
  }

  return (
    <Dialog
      fullScreen={fullScreen}
      aria-labelledby="customized-dialog-title"
      open
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        style={{ minWidth: Size.PX_480 }}
      >
        <Spaced>
          <Title>Add Weight</Title>
          <Button style={{ minWidth: 0 }} onClick={handleClose}>X</Button>
        </Spaced>
      </DialogTitle>
      <DialogContent dividers>
        <Field
          style={{ paddingBottom: Size.PX_16 }}
          title="Weight"
          description={errorsWeight.length ? errorsWeight[0] : ''}
          status={hiddenErrorWeight ? ValidationStatus.VALID : statusWeight}
        >
          <div style={{ paddingTop: Size.PX_8 }}>
            <Input
              style={{ width: '100%' }}
              type="number"
              placeholder="Insert your weight"
              value={weight}
              onChange={(e) => onChangeWeight(e.target.value)}
            />
          </div>
        </Field>
        <Field title="Date">
          <div style={{ paddingTop: Size.PX_8 }}>
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
              <DatePicker
                autoOk
                orientation="landscape"
                variant="static"
                openTo="date"
                value={date}
                onChange={setDate}
              />
            </MuiPickersUtilsProvider>
          </div>
        </Field>
        <Field style={{ paddingBottom: Size.PX_16 }} title="Note">
          <div style={{ paddingTop: Size.PX_8 }}>
            <TextareaAutosize
              rowsMax={5}
              resizable={false}
              style={{
                width: '100%',
                padding: 16,
                resize: 'none',
                fontFamily: 'Poppins',
              }}
              placeholder="Insert a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </Field>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddWeight} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddWeight
