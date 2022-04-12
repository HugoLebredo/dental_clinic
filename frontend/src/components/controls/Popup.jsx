import React from 'react'
import { Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Controls from './'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    top: theme.spacing(5),
    position: 'absolute'
  },
  dialogTitle: {
    paddingRight: '0px'
  }
}))

const Popup = (props) => {
  const { title, children, openPopup, setOpenPopup } = props

  const classes = useStyles()

  return (
        <Dialog open={ openPopup } maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className = { classes.dialogTitle}>
                <div style = {{ display: 'flex' }}>
                    <Typography variant="h6" component = "div" style = {{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <Controls.ActionButton color="secondary" onClick = {() => setOpenPopup(false)}>
                        <Close/>
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
  )
}

export default Popup
