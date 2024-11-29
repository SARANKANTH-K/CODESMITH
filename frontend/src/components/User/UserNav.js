import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography, Box } from '@material-ui/core';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './UserNav.css';

export default function UserNav() {
    // let auth = AuthUser();
    // let user = auth.admin ? JSON.stringify(auth.admin) : false;
    const navigate = useNavigate();

    const logout = () => {
        try {
            Swal.fire({
                title: "Do you Want to logout?",
                showDenyButton: true,
                confirmButtonText: "yes",
                denyButtonText: "No",
                customClass: {
                    actions: "my-actions",
                    confirmButton: "order-2",
                    denyButton: "order-3",
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AppBar className="appBar" position="static" color="inherit">
            <Toolbar className="toolbar">
                {/* Move Admin text to the start */}
                <div className="brandContainer">
                    <Typography className="heading" variant="h4" marginLeft='0px'>
                        User
                    </Typography>
                </div>
                
                {/* Nav links */}
                <Box className="navLinksContainer">
                    <Link to="/mybooking" className="navLink">Event Bookings</Link>
                    {/* <Link to="/view-users" className="navLink">View Users</Link> */}
                </Box>

                {/* Logout button */}
                {/* {user ? ( */}
                    <div className="profile">
                        <Button className="logoutButton" variant="contained" color="secondary" onClick={logout}>
                            Log Out
                        </Button>
                    </div>
                {/* ) : ( */}
                    {/* <Button onClick={() => { navigate('/adlogin'); }} variant="contained" color="primary">
                        Log in
                    </Button>
                )} */}
            </Toolbar>
        </AppBar>
    );
}
