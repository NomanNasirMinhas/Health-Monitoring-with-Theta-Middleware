import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  Typography,
  ThemeProvider,
  Hidden,
  CircularProgress,
  Backdrop
} from '@material-ui/core';
import {
  Divider,
  Button,
  MenuItem,
  SvgIcon,
} from "@material-ui/core"
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import moment from "moment";
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
  const [Loading, setLoading] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const open2 = Boolean(anchorE2);

  const handleMenu1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenu2 = (event) => {
    setAnchorE2(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const handleProfile = () => {
    props.history.push('/yourprofile')
  }

  const logOut = async () => {
    setLoading(true);
    var doctorAddress = localStorage.getItem('doctorAddress');
    var seed = localStorage.getItem('seed');
    var data = {
      TimeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
      LogType: 1,
      LogDetails: "Doctor Offline",
    }
    data = JSON.stringify(data);
    var response = await fetch(
      "https://thetamiddleware.herokuapp.com/sendTx",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seed: seed,
          address: doctorAddress,
          txType: "docLog",
          Data: data
        }),
      }
    );
    response = await response.json();
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
                  disabled={Loading}
                  component={Link}
                  variant="outlined"
                  color="inherit"
                  to="/dashboard">
                  Homepage
                </Button>

                <Button
                  disabled={Loading}
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
                  disabled={Loading}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu1}
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
                  open={open1}
                  onClose={handleClose1}
                >
                  <MenuItem disabled={Loading} component={Link} to="/dashboard">Homepage</MenuItem>
                  <Divider />
                  <MenuItem disabled={Loading} component={Link} to="/addpatient">Add Patient</MenuItem>
                </Menu>
              </div>
            </Hidden>
            <div>
              <IconButton
                disabled={Loading}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu2}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorE2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open2}
                onClose={handleClose2}
              >
                <MenuItem disabled={Loading} onClick={handleProfile}>View My Profile</MenuItem>
                <Divider />
                <MenuItem disabled={Loading} onClick={logOut}>Log Out</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Backdrop open={Loading}><CircularProgress color="secondary" /></Backdrop>
        <div className={classes.appBarSpacer} />
      </ThemeProvider>
    </div>

  );
}

export default withRouter(Header);