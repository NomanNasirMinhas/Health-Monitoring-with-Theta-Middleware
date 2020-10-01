import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({

    palette: {
        primary: {
            main: '#08696b'
        },
        secondary: {
            main: '#FFFFFF'
        }
    },
    typography: {
        h2: {
            fontFamily: 'Roboto Slab'
        }
    },
})
export default theme