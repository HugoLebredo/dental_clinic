import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'

import WelcomePage from './pages/WelcomePage'
import PatientsPage from './pages/PatientsPage'
import LoginPage from './pages/LoginPage'

import theme from './helpers/theme'

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
                <Route exact path="/login">
                    <LoginPage />
                </Route>
            </Switch>
        </Router>
    </ThemeProvider>
)

export default App
