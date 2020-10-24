import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({

    palette: {
        primary: {
            main: '#0064bf'
        },
        secondary: {
            main: '#FFFFFF'
        }
    },
    typography: {
        fontFamily: "Commissioner",
        h2: {
            fontFamily: 'Nanum Gothic',
        }
    },
})
export default theme