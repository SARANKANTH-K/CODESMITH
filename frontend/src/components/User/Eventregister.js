// import React, { useState } from 'react';
// import { Container, TextField, Button, Typography, Box } from '@mui/material';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function EventRegister() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const event = location.state?.event; // Get event data from state
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     tickets: '',
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form data
//     if (!formData.name || !formData.email || !formData.phone || !formData.tickets) {
//       alert('Please fill in all fields');
//       return;
//     }

//     setLoading(true);
//     try {
//       // Mock API to initiate Stripe Payment
//       const response = await axios.post('http://localhost:8000/api/stripe/checkout', {
//         amount: formData.tickets * event?.ticketPrice.slice(1), // Assuming ticketPrice is in "$50"
//         currency: 'usd',
//         description: `Payment for ${event?.title}`,
//         customer: {
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//         },
//       });

//       // Check if the payment initialization was successful
//       if (response.status === 200) {
//         // alert('Payment processed successfully!');
//         alert(`Are you sure want to proceed payment for ${event?.title}`);

//         // Pass necessary data to the PaymentPage
//         navigate('/payment', {
//           state: {
//             formData: { ...formData },
//             event: { ...event },
//             amount: formData.tickets * event?.ticketPrice.slice(1), // Amount to be paid
//           },
//         });
//       }
//     } catch (error) {
//       console.error('Payment failed:', error);
//       alert('Payment failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ marginTop: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Register for {event?.title}
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Phone"
//           name="phone"
//           type="tel"
//           value={formData.phone}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Tickets"
//           name="tickets"
//           type="number"
//           value={formData.tickets}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Event Name"
//           value={event?.title}
//           fullWidth
//           margin="normal"
//           disabled
//         />
//         <TextField
//           label="Venue Name"
//           value={event?.venueName}
//           fullWidth
//           margin="normal"
//           disabled
//         />
//         <TextField
//           label="Event Time"
//           value={event?.eventTime}
//           fullWidth
//           margin="normal"
//           disabled
//         />
//         <Box sx={{ textAlign: 'center', marginTop: 2 }}>
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             disabled={loading}
//           >
//             {loading ? 'Processing...' : 'Proceed to Payment'}
//           </Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// }
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EventRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event; // Get event data from state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    tickets: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate form data
  if (!formData.name || !formData.email || !formData.phone || !formData.tickets) {
    alert('Please fill in all fields');
    return;
  }

  setLoading(true);
  try {
    // First, save booking data to the backend
    const bookingData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      tickets: formData.tickets,
      amount: formData.tickets * event?.ticketPrice.slice(1),
      eventTitle: event?.title,
    };

    // Make an API call to save booking data to the backend
    const bookingResponse = await axios.post('http://localhost:8000/api/bookings', bookingData);

    if (bookingResponse.status === 201) {
      console.log('Booking data saved successfully');
    } else {
      console.error('Error saving booking data');
      alert('Failed to save booking. Please try again.');
      return;
    }

    // Now, initiate Stripe payment
    const paymentResponse = await axios.post('http://localhost:8000/api/stripe/checkout', {
      amount: formData.tickets * event?.ticketPrice.slice(1), // Assuming ticketPrice is in "$50"
      currency: 'usd',
      description: `Payment for ${event?.title}`,
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
    });

    // Check if the payment initialization was successful
    if (paymentResponse.status === 200) {
      alert(`Are you sure you want to proceed with the payment for ${event?.title}?`);

      // Pass necessary data to the PaymentPage
      navigate('/payment', {
        state: {
          formData: { ...formData },
          event: { ...event },
          amount: formData.tickets * event?.ticketPrice.slice(1), // Amount to be paid
        },
      });
    }
  } catch (error) {
    console.error('Error during the payment process:', error);
    alert('Payment failed. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom sx={{paddingLeft: 9,fontFamily: 'Great Vibes', fontWeight: 'bold' , fontSize: '3rem'}}>
        Register for {event?.title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Tickets"
          name="tickets"
          type="number"
          value={formData.tickets}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Event Name"
          value={event?.title}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Venue Name"
          value={event?.venueName}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Event Time"
          value={event?.eventTime}
          fullWidth
          margin="normal"
          disabled
        />
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
