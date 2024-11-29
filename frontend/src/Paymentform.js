import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Typography, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export default function PaymentForm({ formData, event, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'usd',
          description: `Payment for ${event?.title}`,
          customer: {
            name: formData?.name,
            email: formData?.email,
          },
        }),
      });

      const { clientSecret, error: backendError } = await response.json();
      if (backendError) {
        setError(backendError);
        setLoading(false);
        return;
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData?.name,
            email: formData?.email,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent.status === 'succeeded') {
        Swal.fire('Payment Successful!', 'Your registration is confirmed.', 'success');
        navigate('/mybooking')
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred during the payment process.');
    }

    setLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '80%',
        textAlign: 'center',
        padding: 2,
        backgroundColor: '#fafafa',
        borderRadius: 2,
        border: '1px solid #ddd',
        boxShadow: 2,
      }}
    >
      {/* Single Box for Card Input */}
      <CardElement options={CARD_ELEMENT_OPTIONS} />
      <Box sx={{ marginTop: 2 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '30%', padding: '10px' }}
          disabled={!stripe || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Pay Now'}
        </Button>
      </Box>
      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
