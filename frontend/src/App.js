import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import WelcomePage from './pages/WelcomePage'
import PatientsPage from './pages/PatientsPage'
// import Login from './components/Login'

import { ThemeProvider } from '@material-ui/styles'
import theme from './helpers/theme'

// const App = () =>
//    <Login/>

const App = () => (
    <ThemeProvider theme = {theme}>
        <Router>
            <Switch>
                <Route exact path="/">
                    <WelcomePage />
                </Route>
                <Route exact path="/patients">
                    <PatientsPage />
                </Route>
            </Switch>
        </Router>
    </ThemeProvider>
)

export default App
