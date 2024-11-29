import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider
} from '@mui/material';
import AdminNav from './AdminNav';

const theme = createTheme();

export default function AddEvent() {
    const navigate = useNavigate();

    const initialEvent = {
        eventTitle: "",
        eventDescription: "",
        eventVenueName: "",
        eventVenueType: "",
        eventCategory: "",
        location: "",
        numOfTickets: "",
        ticketPrice: "",
        eventStartTime: "",
        eventEndTime: "",
        eventImage: ""
    };

    const [event, setEvent] = useState(initialEvent);
    const [formError, setFormError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/events', event);
            console.log('Event added:', response.data);
            alert("Event added successfully");
            navigate('/all-event'); 
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    return (
        <div>
          <AdminNav />
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%', 
                        padding: '16px', 
                    }}
                >
                    <Typography component="h1" variant="h5" style={{ textAlign: 'center',color : 'orange' ,fontWeight : '900',fontSize : '30px',fontFamily:'san-serif'}}>
                        Add Event
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>

                        <Grid container spacing={2}>
                            {/* First Column */}
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.eventTitle ? true : false}
                                    helperText={formError.eventTitle ? formError.eventTitle : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                    id="eventTitle"
                                    label="Event Title"
                                    name="eventTitle"
                                    autoComplete="eventTitle"
                                    onChange={handleChange}
                                    autoFocus
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>

                            <Grid item xs={12} sm={2}></Grid>

                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.eventDescription ? true : false}
                                    helperText={formError.eventDescription ? formError.eventDescription : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="eventDescription"
                                    label="Event Description"
                                    name="eventDescription"
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                    rows={1}
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.eventVenueName ? true : false}
                                    helperText={formError.eventVenueName ? formError.eventVenueName : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="eventVenueName"
                                    label="Event Venue Name"
                                    name="eventVenueName"
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                    onChange={handleChange}
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>

                            <Grid item xs={12} sm={2}>
                            </Grid> 

                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.eventVenueType ? true : false}
                                    helperText={formError.eventVenueType ? formError.eventVenueType : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="eventVenueType"
                                    label="Event Venue Type"
                                    name="eventVenueType"
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.eventCategory ? true : false}
                                    helperText={formError.eventCategory ? formError.eventCategory : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="eventCategory"
                                    label="Event Category"
                                    name="eventCategory"
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
            
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.location ? true : false}
                                    helperText={formError.location ? formError.location : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="location"
                                    label="Location"
                                    name="location"
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>

                            

                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.numOfTickets ? true : false}
                                    helperText={formError.numOfTickets ? formError.numOfTickets : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="numOfTickets"
                                    label="Number of Tickets"
                                    name="numOfTickets"
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                    type="number"
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                    
                            </Grid>


                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.ticketPrice ? true : false}
                                    helperText={formError.ticketPrice ? formError.ticketPrice : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="ticketPrice"
                                    label="Ticket Price"
                                    name="ticketPrice"
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true, 
                                    }}
                                    type="number"
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.eventStartTime ? true : false}
                                    helperText={formError.eventStartTime ? formError.eventStartTime : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="eventStartTime"
                                    label="Event Start Time"
                                    name="eventStartTime"
                                    onChange={handleChange}
                                    type="datetime-local"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>

                            <Grid item xs={12} sm={2}>
                           
                            </Grid>

                            <Grid item xs={12} sm={5}>
                                <TextField
                                    error={formError.eventEndTime ? true : false}
                                    helperText={formError.eventEndTime ? formError.eventEndTime : ''}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="eventEndTime"
                                    label="Event End Time"
                                    name="eventEndTime"
                                    onChange={handleChange}
                                    type="datetime-local"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{ maxWidth: '100%', minWidth: '200px' }} 
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Add Event
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </div>
    );
}
