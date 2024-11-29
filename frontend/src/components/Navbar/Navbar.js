// import { useNavigate } from 'react-router-dom'
// import { AppBar, Button, Toolbar, Typography } from '@material-ui/core'

// import useStyle from './style'
// import { AuthUser } from '../AuthRouter'
// import Swal from "sweetalert2";


// export default function Navbar() {
//     let auth = AuthUser()
//     let user = (auth.user) ? auth.user.data.name : false
//     const navigate = useNavigate();

//     const logout = () => {
//         try {
//             Swal.fire({
//                 title: "Do you Want to logout?",
//                 showDenyButton: true,
//                 confirmButtonText: "yes",
//                 denyButtonText: "No",
//                 customClass: {
//                     actions: "my-actions",
//                     confirmButton: "order-2",
//                     denyButton: "order-3",
//                 },
//             }).then(async (result) => {
//                 if (result.isConfirmed) {
//                     auth.logOut()
//                 }
//             });
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const classes = useStyle()
//     return (
//         <AppBar className={classes.appBar} position="static" color='inherit'>
//             <div className={classes.brandContainer}>
//                 <Typography className={classes.heading} variant="h4" align='center' >Event-Pro</Typography>
//                 {/* <img className={classes.image} src={'bac1.jpg'} alt='icon' height='60' /> */}
//             </div>
//             <Toolbar className={classes.toolbar}>
//                 {user ? (
//                     <div className={classes.profile}>
//                         <Typography className={classes.userName} varient="h6"></Typography>
//                         <Button variant='contained' onClick={logout} color="secondary">Log Out</Button>
//                     </div>

//                 ) :
//                     <Button onClick={() => { navigate('/login') }} variant='contained' color='primary'>Log in</Button>
//                 }
//             </Toolbar>
//         </AppBar>
//     )
// }


import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography, Menu, MenuItem } from '@mui/material'; // Ensure correct imports
import useStyle from './style';
import { AuthUser } from '../AuthRouter';
import Swal from "sweetalert2";
import React, { useState } from 'react';

export default function Navbar() {
    let auth = AuthUser();
    let user = (auth.user) ? auth.user.data.name : false;
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const classes = useStyle();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); // Open the dropdown
    };

    const handleMenuClose = () => {
        setAnchorEl(null); // Close the dropdown
    };

    const handleNavigate = (path) => {
        navigate(path);
        handleMenuClose();
    };

    const logout = () => {
        try {
            Swal.fire({
                title: "Do you want to logout?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    auth.logOut();
                    navigate('/login', { replace: true });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography className={classes.heading} variant="h4" sx={{flexGrow: 1,position: 'absolute',top: 14,left: 4,marginLeft: 3 }} >
                    Event-Pro
                </Typography>
            </div>
            <Toolbar className={classes.toolbar} sx={{ display: 'flex', justifyContent: 'flex-end',marginRight: 0 }}>
                {user ? (
                    <div className={classes.profile} style={{ display: 'flex', alignItems: 'right' }}>
                        <Typography className={classes.userName} variant="h6" sx={{marginRight: 2}}>
                            {`Welcome, ${user}`}
                        </Typography>
                        <Button variant="contained" color="secondary" onClick={logout}>
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleMenuClick}
                            sx={{alignItems: 'right'}}
                        >
                            Log in
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => handleNavigate('/login')}>
                                User Login
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigate('/adlogin')}>
                                Admin Login
                            </MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}
