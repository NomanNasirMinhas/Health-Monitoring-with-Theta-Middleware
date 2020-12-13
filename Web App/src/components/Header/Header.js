import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Typography,
  ThemeProvider,
  Hidden
} from '@material-ui/core';
import {
  Divider,
  Button,
  MenuItem,
  SvgIcon,
} from "@material-ui/core"
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import AccountCircle from "@material-ui/icons/AccountCircle"
import { withRouter, Link } from 'react-router-dom';
import theme from "../../assets/theme/theme"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

  appBarSpacer: theme.mixins.toolbar,
  root: {
    display: 'flex',
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  drawerContainer: {
    overflow: 'auto',
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  SvgIcon: {
    marginBottom: 2,
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
  },

  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  }

}));

const Header = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    props.history.push('/yourprofile')
  }

  const logOut = () => {
    localStorage.clear()
    props.history.push('/')
  }

  const date = () => {
    const date = new Date()
    const hours = date.getHours()
    let timeOfDay

    if (hours < 12) {
      timeOfDay = "Good Morning"
    } else if (hours >= 12 && hours < 17) {
      timeOfDay = "Good Afternoon"
    } else {
      timeOfDay = "Good Evening"
    }
    return timeOfDay
  }

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <SvgIcon className={classes.SvgIcon}>
              <LocalHospitalIcon />
            </SvgIcon>

            <Typography variant="h6" className={classes.title} noWrap>
              {date()}, Doctor
          </Typography>

            <Hidden smDown>
              <div className={classes.buttons}>
                <Button
                  component={Link}
                  variant="outlined"
                  color="inherit"
                  to="/dashboard">
                  Homepage
                </Button>

                <Button
                  component={Link}
                  variant="outlined"
                  color="inherit"
                  to="/addpatient">
                  Add Patient
                </Button>
              </div>
            </Hidden>

            <Hidden mdUp>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuOpenIcon />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem component={Link} to="/dashboard">Homepage</MenuItem>
                  <Divider />
                  <MenuItem component={Link} to="/addpatient">Add Patient</MenuItem>
                </Menu>
              </div>
            </Hidden>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>View My Profile</MenuItem>
                <Divider />
                <MenuItem onClick={logOut}>Log Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.appBarSpacer} />
      </ThemeProvider>
    </div>

  );
}

export default withRouter(Header);