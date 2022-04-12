import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import InputBase from '@material-ui/core/InputBase'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import { Badge, makeStyles } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme) => ({

  root: {
    flexGrow: 1,
    backgroundColor: '#fff'
  },
  searchInput: {
    opacity: '0.6',
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: '0.8rem',
    '&:hover': {
      backgroundColor: '#f2f2f2'
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px'
    }

  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}))

const MenuBar = () => {
  const classes = useStyles()

  return (
        <AppBar position="static" className = {classes.root}>
            <Toolbar variant="dense">
                <Grid container>
                    <Grid item>
                        <InputBase
                            placeholder = "Search topics"
                            className = {classes.searchInput}
                            startAdornment = {<SearchIcon fontSize = "small" />}
                        />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <iconButton>
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneIcon fontSize = "small" color="secondary"/>
                            </Badge>
                        </iconButton>
                        <iconButton>
                        <inpurBase
                            placeholder = "Search topics"
                            className = {classes.searchInput}
                            startAdornment = {<SearchIcon fontSize = "small" />}
                        />
                        </iconButton>
                        <iconButton>
                        <SearchIcon fontSize = "small" />
                        </iconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
  )
}

export default MenuBar
