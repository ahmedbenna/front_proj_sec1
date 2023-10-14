import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Button, CircularProgress } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import useApi from '../../hocks/useApi';
import { Link, redirect, useNavigate } from 'react-router-dom';

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { data, loading, error, get, post, put, remove } = useApi();
  const { logout, user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  React.useEffect(() => {

    get("/user/curent/")

  }, [])
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout()
    navigate("/login")
    setAnchorEl(null);
  };
  // console.log(data)

  // console.log(JSON.parse(localStorage.getItem('token')))
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}

          {(user) ? (
            (!loading) ? (
              <>
                <Link to="/dashboard">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Dashboard
                  </Typography></Link>
                <Button
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Typography> {user.firstName} {user.lastName}</Typography>
                  <AccountCircle />
                </Button>
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
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <CircularProgress />
            )
          ) : (<>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              complaint
            </Typography>
            <Link to="/login">
              <Button color="inherit">Login</Button>
            </Link>
          </>
          )
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}

