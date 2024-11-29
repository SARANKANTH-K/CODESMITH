import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    CssBaseline,
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField
} from '@mui/material';
import AdminNav from './AdminNav';
import moment from 'moment';

export default function AllEvents() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // State to store the selected event for editing
    const [updatedEvent, setUpdatedEvent] = useState({}); // State to store the updated event details

    // Fetch events from the backend
    useEffect(() => {
        axios.get('http://localhost:8000/api/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events:', error);
            });
    }, []);

    // Handle field change
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEvent((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Update handler
    const handleUpdate = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/events/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEvent),
            });
            const data = await response.json();
            if (data.success) {
                alert("Event updated successfully!");
                // Update the local state
                setEvents(prevEvents => prevEvents.map((event) =>
                    event.id === id ? { ...event, ...updatedEvent } : event
                ));
            } else {
                alert("Error updating event.");
            }
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    // Delete handler
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/events/${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            if (data.success) {
                alert("Event deleted successfully!");
                setEvents(prevEvents => prevEvents.filter((event) => event.id !== id));
            } else {
                alert(data.message || "Error deleting event.");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("An unexpected error occurred while deleting the event.");
        }
    };

    // Handle selecting an event for editing
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setUpdatedEvent({
            title: event.title,
            venueName: event.venueName,
            location: event.location,
            category: event.category,
            totalTickets: event.totalTickets,
            price: event.ticketPrice,
            eventTime: event.eventTime,
        });
    };

    return (
        <div>
            <AdminNav />
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Header */}
                    <Typography component="h1" variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', color: 'orange', opacity: 0.9 }}>
                        All Events
                    </Typography>

                    {/* Table */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead sx={{ backgroundColor: 'orange' }}>
                                <TableRow>
                                    <TableCell><strong>Event Name</strong></TableCell>
                                    <TableCell><strong>Venue Name</strong></TableCell>
                                    <TableCell><strong>Location</strong></TableCell>
                                    <TableCell><strong>Event Category</strong></TableCell>
                                    <TableCell><strong>Total Tickets</strong></TableCell>
                                    <TableCell><strong>Ticket Price</strong></TableCell>
                                    <TableCell><strong>Event Time</strong></TableCell>
                                    <TableCell><strong>Action</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {events.map((event) => (
                                    <TableRow key={event.id}>
                                        <TableCell>{event.title}</TableCell>
                                        <TableCell>{event.venueName}</TableCell>
                                        <TableCell>{event.location}</TableCell>
                                        <TableCell>{event.category}</TableCell>
                                        <TableCell>{event.totalTickets}</TableCell>
                                        <TableCell>{`$${event.ticketPrice}`}</TableCell>
                                        <TableCell>{moment(event.eventTime).format('MMMM D, hh:mm A')}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleSelectEvent(event)}
                                                sx={{ marginRight: 1 }}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(event.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* Form for updating selected event */}
                    {selectedEvent && (
                        <Box sx={{
                            marginTop: 4,
                            width: '100%',
                            maxWidth: '500px',
                            padding: '30px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            boxShadow: 3,
                        }}>
                            <Typography variant="h5" sx={{
                                marginBottom: 4,
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}>Update Event</Typography>

                            <form noValidate>
                                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        label="Event Name"
                                        name="title"
                                        value={updatedEvent.title || ''}
                                        onChange={handleFieldChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Venue Name"
                                        name="venueName"
                                        value={updatedEvent.venueName || ''}
                                        onChange={handleFieldChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Location"
                                        name="location"
                                        value={updatedEvent.location || ''}
                                        onChange={handleFieldChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Event Category"
                                        name="category"
                                        value={updatedEvent.category || ''}
                                        onChange={handleFieldChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Total Tickets"
                                        name="totalTickets"
                                        type="number"
                                        value={updatedEvent.totalTickets || ''}
                                        onChange={handleFieldChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Ticket Price"
                                        name="price"
                                        type="number"
                                        value={updatedEvent.price || ''}
                                        onChange={handleFieldChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        fullWidth
                                        label="Event Time"
                                        name="eventTime"
                                        type="datetime-local"
                                        value={updatedEvent.eventTime ? moment(updatedEvent.eventTime).format('YYYY-MM-DDTHH:mm') : ''}
                                        onChange={handleFieldChange}
                                        sx={{ marginBottom: 2 }}
                                    />
                                </Box>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleUpdate(selectedEvent.id)}
                                    sx={{ marginTop: 3, width: '100%' }}
                                >
                                    Save Changes
                                </Button>
                            </form>
                        </Box>
                    )}
                </Box>
            </Container>
        </div>
    );
}
