import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './Paymentform';
import { useLocation } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
const stripePromise = loadStripe('pk_test_51QQ8i2Gz5RctQbIfPFJB5NXqyZPWB6ZuVYnAWYALyvk8pbPiizb3KI81BJv3NOvLz8c4QLzGgIYfl8xWMxtjOuun009MgUT16f');

export default function PaymentPage() {
  const location = useLocation();
  const { formData, event, amount } = location.state || {};

  if (!formData || !event || !amount) {
    return (
      <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6" color="error">
          Invalid payment details. Please try again.
        </Typography>
      </Container>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: 3,
        //   borderRadius: 2,
        //   boxShadow: 3,
        //   border: '1px solid #ddd',
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Payment for {event?.title}
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1">Customer: {formData?.name}</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Amount: ${amount}
          </Typography>
        </Box>
        <PaymentForm formData={formData} event={event} amount={amount} />
      </Container>
    </Elements>
  );
}
