import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import UserNav from './UserNav';

export default function MyBooking() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch booking data from the backend
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
          <UserNav />
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      
      <Typography variant="h4" gutterBottom sx={{ paddingLeft:55,fontFamily: 'Great Vibes', fontWeight: 'bold' , fontSize: '3rem' }} >
        My Bookings
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
