import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

// import Link from '@material-ui/core/Link'
// import { Link as LinkRouter } from 'react-router-dom/Link'
// import Toolbar from '@material-ui/core/Toolbar'

// import Typography from '@material-ui/core/Typography'
import SideMenu from '../SideMenu/SideMenu'
import { CssBaseline } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

const AppFrame = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <SideMenu />
      <div className={classes.appMain}>
        {children}
      </div>
      <CssBaseline />
    </>
  )
}

AppFrame.propTypes = {
  children: PropTypes.node
}

export default AppFrame
