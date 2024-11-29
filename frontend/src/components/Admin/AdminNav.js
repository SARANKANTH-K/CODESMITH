import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography, Box } from '@material-ui/core';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import './AdminNav.css'; 

export default function AdminNav() {
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
                    navigate('/')

                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AppBar className="appBar" position="static" color="inherit">
            <Toolbar className="toolbar">
                <div className="brandContainer">
                    <Typography className="heading" variant="h4" marginLeft='0px'>
                        Admin
                    </Typography>
                </div>
                
                <Box className="navLinksContainer">
                    <Link to="/add-event" className="navLink">Add Event</Link>
                    <Link to="/all-event" className="navLink">All Events</Link>
                    <Link to="/event-bookings" className="navLink">Event Bookings</Link>

                </Box>

                    <div className="profile">
                        <Button className="logoutButton" variant="contained" color="secondary" onClick={logout}>
                            Log Out
                        </Button>
                    </div>
            </Toolbar>
        </AppBar>
    );
}
