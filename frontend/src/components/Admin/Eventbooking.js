import React from 'react';
import { useEffect,useState } from 'react';
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
    Button
} from '@mui/material';
import AdminNav from './AdminNav';

export default function Eventbooking() {
    
    const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

    return (
        <div>
            <AdminNav />
        
            <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: '20px', color: 'orange', opacity: 0.9 }} >
        User Bookings
      </Typography>
      <TableContainer component={Paper} >
        <Table>
          <TableHead sx={{ backgroundColor: 'orange' }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Tickets</strong></TableCell>
              <TableCell><strong>Amount</strong></TableCell>
              <TableCell><strong>Event Title</strong></TableCell>
              <TableCell><strong>Payment Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking, index) => (
              <TableRow key={index}>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{booking.email}</TableCell>
                <TableCell>{booking.phone}</TableCell>
                <TableCell>{booking.tickets}</TableCell>
                <TableCell>{booking.amount}</TableCell>
                <TableCell>{booking.eventTitle}</TableCell>
                <TableCell sx={{ color: 'green',fontWeight: '900',fontSize:16, }}>Paid</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
        </div>
    );
}
