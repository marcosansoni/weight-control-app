import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import MaterialUiSnackbar from '@material-ui/core/Snackbar'

const Snackbar = (props) => {
  const {
    errors,
    onClose,
    anchorOrigin = { vertical: 'top', horizontal: 'center' },
  } = props

  const [open, setOpen] = useState(errors.length)

  useEffect(() => {
    if (errors.length && !open) setOpen(true)
  }, [JSON.stringify(errors)])

  const handleCloseSnackbar = () => {
    setOpen(false)
    onClose()
  }

  return (
    <MaterialUiSnackbar
      anchorOrigin={anchorOrigin}
      open={open}
      onClose={handleCloseSnackbar}
      message={errors.length ? errors[0] : ''}
      key="error"
    />
  )
}

Snackbar.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.object),
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
  }),
  onClose: PropTypes.func,
}

Snackbar.defaultProps = {
  errors: [],
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  onClose: () => undefined,
}

export default Snackbar
