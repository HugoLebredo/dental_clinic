import React from 'react'
import { useHistory } from 'react-router-dom'
import { Typography, ListItem, Grid, List } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/styles'
import Controls from '../controls'

const useStyles = makeStyles({
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    left: '0px',
    width: '200px',
    height: '100%',
    backgroundColor: '#253053'
  },
  text: {
    color: '#fff'
  }
})

const SideMenu = () => {
  const classes = useStyles()

  const history = useHistory()

  const onClickHandler = () => {
    history.push('/patients')
  }

  return (
    <div className={classes.sideMenu}>
      <Typography className={classes.text}
      variant = "h5"
      component = "div">MENU</Typography>
      <List>
      <ListItem button onClick= {() => onClickHandler()}>
        <Grid container>
          <Grid item>
            <Typography className={classes.text}
                        variant = "h6"
                        component = "div">Patients</Typography>
          </Grid>
          <Grid item>
            <Controls.Button
                className = {'classes.newButton'}
                text="Patiens"
                color="secondary"
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => () => onClickHandler()}>
            </Controls.Button>
          </Grid>
        </Grid>
      </ListItem>
      </List>
    </div>
  )
}

export default SideMenu
