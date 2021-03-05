import React from 'react'
import PropTypes from 'prop-types'
import { createMuiTheme, Theme, ThemeProvider as TP } from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import './App.css'

const theme: Theme = createMuiTheme({
  typography: {
    fontFamily: ['Gotham', 'Ariel'].join(','),
    h1: {
      fontWeight: 'normal',
      fontSize: '34px'
    },
    h3: {
      fontWeight: 'bold',
      fontSize: '21px',
      color: '#4a4a4a'
    },
    body1: {
      fontWeight: 'normal',
      fontSize: '16px',
      color: '#4a4a4a'
    }
  },
  palette: {
    primary: { main: '#00497c', light: '#359edf', contrastText: '#fff' },
    secondary: { main: '#359edf', contrastText: '#fff' },
    error: { main: '#f16c2f', contrastText: '#fff' },
    success: { main: '#43b146' }
  },
  overrides: {
    MuiButton: {
      contained: {
        fontWeight: 'bold'
      },
      containedPrimary: {
        backgroundColor: '#00497c'
      },
      containedSecondary: {
        backgroundColor: '#43b146',
        '&:hover': {
          backgroundColor: '#328534'
        }
      }
    }
  }
})

interface Props {
  children: React.ReactNode
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  return (
    <TP theme={theme}>
      <CssBaseline />
      {children}
    </TP>
  )
}

ThemeProvider.propTypes = {
  children: PropTypes.array.isRequired || PropTypes.element.isRequired
}

export default ThemeProvider
