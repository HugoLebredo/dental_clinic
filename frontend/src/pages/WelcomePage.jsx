import React from 'react'
// import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// import CssBaseline from '@material-ui/core/CssBaseline'

import UserLogin from '../components/UserLogin'

const useStyles = makeStyles(theme => ({
  grid: {
    alignItems: 'center'
  },
  formContent: {

    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  appMain: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    position: 'absolute',
    height: '100%'
  }
}))

const WelcomePage = () => {
  const classes = useStyles()
  return (
      <div className = {classes.formContent}>
        <Grid container xs={12}
        // className = {classes.formContent}
        justify="center"
        alignItems="center">
          <Grid item xs={12} justify="center" >
            <h1>Welcome Page</h1>
            <UserLogin/>
          </Grid>
        </Grid>
    </div>
  )
}

export default WelcomePage
