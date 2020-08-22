import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import Typography from '@material-ui/core/Typography';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import { withRouter } from 'react-router-dom';
import SvgIcon from "@material-ui/core/SvgIcon"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MenuItem from "@material-ui/core/MenuItem"
import Divider from "@material-ui/core/Divider"
import Button from "@material-ui/core/Button"

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

  buttons:{
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{ background: '#00a152' }}>
        <Toolbar>
          <SvgIcon className={classes.SvgIcon}>
            <LocalHospitalIcon />
          </SvgIcon>

          <Typography variant="h6" className={classes.title} noWrap>
            Welcome, Doctor
          </Typography>


          <div className={classes.buttons}>
            <Button 
              variant="outlined"
              style={{ color: '#FFFFFF'}}
              href="/dashboard">
                Homepage
            </Button>
              
            <Button 
              variant="outlined" 
              style={{ color: '#FFFFFF'}}
              href="/addpatient">
                Add Patient
            </Button>
          </div>
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
              <MenuItem onClick={handleProfile}>My Profile</MenuItem>
              <MenuItem onClick={handleClose}>Account Settings</MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer}/>
    </div>
  );
}

export default withRouter(Header);