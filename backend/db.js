const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QQ8i2Gz5RctQbIfgc46s5UqyjrEdHJ5NlKSXwKDvxUNbEJ126ajYadGoRWAz1a7MakouhjULSpTqqr9e1h29Tzt00mXFP2Kr5');

const app = express();

app.use(cors()); 
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "saran",
  database: "eventpro",
});


db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err.stack);
    return;
  }
  console.log("Connected to the MySQL database.");
});

//signup route
app.post("/signup", async (req, res) => {
  console.log(req.body); 
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, Email, and Password are required" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
}
 
  const query = "SELECT * FROM signup WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error("Error executing query: ", err.stack);
      return res.status(500).json({ message: "Database query error" });
    }

    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }


    
    const insertQuery = "INSERT INTO signup (name, email, password) VALUES (?, ?, ?)";
    db.query(insertQuery, [name, email, password], (err, result) => {
      if (err) {
         console.error("Error inserting user into signup table:", err.stack);
         console.error("Error inserting user: ", err.stack);
         return res.status(500).json({ message: "Error registering user" });
      }
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});


app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  // Check if the user exists by email
  const query = "SELECT * FROM signup WHERE email = ?";
  db.query(query, [email], async (err, result) => {
    if (err) {
      console.error("Error executing query: ", err.stack);
      return res.status(500).json({ message: "Database query error" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the hashed password with the input password
    const user = result[0]; // User data from the database
    const match = password === user.password

    if (match) {
      res.status(200).json({ message: "Login successful", user: user });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  });
});

app.post("/adlogin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  // Define the admin credentials (hardcoded)
  const adminEmail = "admin@gmail.com";
  const adminPassword = "admin123"; // Ideally, use environment variables for security

  // Check if the provided credentials match the admin ones
  if (email === adminEmail && password === adminPassword) {
    res.status(200).json({ message: "Admin login successful", user: { email } });
  } else {
    return res.status(400).json({ message: "Invalid admin credentials" });
  }
});


// POST endpoint for adding an event
app.post('/api/events', (req, res) => {
  const {
    eventTitle,
    eventDescription,
    eventVenueName,
    eventVenueType,
    eventCategory,
    location,
    numOfTickets,
    ticketPrice,
    eventStartTime,
    eventEndTime,
  } = req.body;

  // SQL query to insert a new event into the database
  const query = `
    INSERT INTO event (
      title, description, venueName, venueType,
      category, location, totalTickets, price, 
      startTime, endTime
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      eventTitle,        // eventTitle from frontend
      eventDescription,  // eventDescription from frontend
      eventVenueName,    // eventVenueName from frontend
      eventVenueType,    // eventVenueType from frontend
      eventCategory,     // eventCategory from frontend
      location,          // location from frontend
      numOfTickets,      // numOfTickets from frontend
      ticketPrice,       // ticketPrice from frontend
      eventStartTime,    // eventStartTime from frontend
      eventEndTime,      // eventEndTime from frontend
    ],
    (err, result) => {
      if (err) {
        console.error('Error adding event:', err);
        return res.status(500).json({ message: 'Error adding event', error: err });
      }
      return res.status(201).json({
        message: 'Event added successfully',
        // event: {
        //   id: result.insertId, // Return the newly generated event ID
        //   eventTitle,
        //   eventDescription,
        //   eventVenueName,
        //   eventVenueType,
        //   eventCategory,
        //   location,
        //   numOfTickets,
        //   ticketPrice,
        //   eventStartTime,
        //   eventEndTime,
        // },
      });
    }
  );
});


// GET: Fetch All Events
app.get('/api/events', (req, res) => {
  const query = `SELECT id, title, venueType, venueName, location, category, totalTickets, price AS ticketPrice, startTime AS eventTime 
                 FROM event`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ message: 'Error fetching events', error: err });
    }
    return res.status(200).json(results);
  });
});

app.put('/api/events/:id', (req, res) => {
  const { id } = req.params;
  const { title, venueName, location, category, totalTickets, price, eventTime } = req.body;

  // Log received data for debugging
  console.log(`Received data:`, { title, venueName, location, category, totalTickets, price, eventTime });

  // Check if price is provided and is a valid number
  if (price === undefined || price === null || isNaN(Number(price))) {
      return res.status(400).json({ success: false, message: "Price is required and must be a valid number" });
  }

  // Validation for other fields
  if (!id || isNaN(Number(id))) {
      return res.status(400).json({ success: false, message: "Invalid event ID" });
  }

  if (!title || typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({ success: false, message: "Invalid or empty event title" });
  }

  if (!venueName || typeof venueName !== "string" || venueName.trim() === "") {
      return res.status(400).json({ success: false, message: "Invalid or empty venue name" });
  }

  if (!location || typeof location !== "string" || location.trim() === "") {
      return res.status(400).json({ success: false, message: "Invalid or empty location" });
  }

  if (!category || typeof category !== "string" || category.trim() === "") {
      return res.status(400).json({ success: false, message: "Invalid or empty category" });
  }

  if (!totalTickets || isNaN(Number(totalTickets)) || totalTickets <= 0) {
      return res.status(400).json({ success: false, message: "Invalid total tickets" });
  }

  if (!eventTime || isNaN(Date.parse(eventTime))) {
      return res.status(400).json({ success: false, message: "Invalid event time" });
  }

  const query = `
      UPDATE event
      SET 
          title = ?,
          venueName = ?,
          location = ?,
          category = ?,
          totalTickets = ?,
          price = ?,
          startTime = ?
      WHERE id = ?
  `;

  db.query(query, [title.trim(), venueName.trim(), location.trim(), category.trim(), Number(totalTickets), Number(price), new Date(eventTime), Number(id)], (err, result) => {
      if (err) {
          console.error("Error updating event:", err);
          return res.status(500).json({ success: false, message: "Error updating event" });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ success: false, message: "Event not found" });
      }

      res.status(200).json({ success: true, message: "Event updated successfully" });
  });
});


// DELETE: Delete Event by ID
app.delete('/api/events/:id', (req, res) => {
  const { id } = req.params;
  console.log('Deleting event with ID:', id);
  const query = `DELETE FROM event WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error deleting event:', err);
      return res.status(500).json({ success: false, message: 'Error deleting event', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    return res.status(200).json({ success: true, message: 'Event deleted successfully' });
  });
});

// Route to create PaymentIntent
app.post('/create-payment-intent', async (req, res) => {
  const { amount, name, email } = req.body;

  try {
    // Create a PaymentIntent with the specified amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit (e.g., cents)
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { name, email },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret, // Send the client secret to the frontend
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Endpoint to create a checkout session
app.post('/api/stripe/checkout', async (req, res) => {
  const { amount, currency, description, customer } = req.body;

  try {
    // Mock Stripe Checkout Session Creation
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit (e.g., cents)
      currency,
      payment_method_types: ['card'],
      description,
      receipt_email: customer.email,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      message: 'Payment Intent Created',
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Payment Intent Creation Failed' });
  }
});

// Save booking data
app.post('/api/bookings', (req, res) => {
  const { name, email, phone, tickets, amount, eventTitle } = req.body;
  const query = `INSERT INTO booking (name, email, phone, tickets, amount, eventTitle) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [name, email, phone, tickets, amount, eventTitle], (err) => {
    if (err) {
      console.error('Error saving booking:', err);
      res.status(500).send('Error saving booking');
      return;
    }
    res.status(201).send('Booking saved successfully');
  });
});

// Get bookings data
app.get('/api/bookings', (req, res) => {
  const query = `SELECT * FROM booking`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).send('Error fetching bookings');
      return;
    }
    res.status(200).json(results);
  });
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
