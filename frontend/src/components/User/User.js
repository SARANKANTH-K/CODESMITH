import React, { useEffect, useState } from 'react';
import { AuthUser } from '../AuthRouter';
import UserNav from './UserNav';
import Footer from '../Home/Footer';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import './User.css';
import userImage from '../../assets/images/carImg3.jpg';

export default function User() {
  const auth = AuthUser();
  const [events, setEvents] = useState([]);
  const [openRegister, setOpenRegister] = useState(false); // State to control dialog visibility
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    auth.checkUser();
    // Fetch events from the backend
    axios.get('http://localhost:8000/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, [auth]);

  const handleRegisterClick = (event) => {
    // Redirect to the EventRegister page with event data as state
    navigate('/event-register', { state: { event } });
  };

  // Format the event time
  const formatEventTime = (time) => {
    return moment(time).startOf('hour').format('MMMM D, hh:mm A');
  };


  return (
    <div>
      <UserNav />
      <div>
        <h1 className="content">
          <h1 style={{ color: 'white', fontSize: '3rem',marginTop: '40%'}}>Plan, Participate, and</h1>
          Make Every Moment Count!
        </h1>
        <img src={userImage} alt="User Image" style={{ width: '100%', height: '50%' }} />
      </div>
      <h1 style={{fontFamily: 'Great Vibes', fontWeight: 'bold' , fontSize: '3rem',fontFamily : '',marginLeft: '400px'}}>Events For registration</h1>
      <Container component="main" maxWidth="lg" sx={{ marginTop: 4 }}>
        {/* Event Cards Grid */}
        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" component="div" sx={{color:'Gray' , fontWeight: 'bold',fontSize: '22px', marginBottom: 2 ,marginLeft: 13}}>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Venue:</strong> {event.venueName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Location:</strong> {event.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {event.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Total Tickets:</strong> {event.totalTickets}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Ticket Price:</strong> ${event.ticketPrice}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Event Time:</strong> {formatEventTime(event.eventTime)}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                    <Button variant="contained" color="primary" size="small" sx={{marginLeft : 11}} 
                    onClick={() => handleRegisterClick(event)}>
                      Register
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}
