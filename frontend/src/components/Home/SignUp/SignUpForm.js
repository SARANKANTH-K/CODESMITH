import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    CssBaseline,
    TextField,
    Link,
    Grid,
    Box,
    Typography,
    Container,
    createTheme,
    ThemeProvider
} from '@mui/material';

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate(); 
    const initialUser = { name: "", email: "", password: "" }; 
    const [user, setUser] = useState(initialUser);
    const [isSubmit, setIsSubmit] = useState(false);
    const [formError, setFormError] = useState({});
    const [serverError, setServerError] = useState("");
    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log(user);
        }
    }, [formError, isSubmit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setIsSubmit(true);
        setFormError(validate(user)); 
    
        if (Object.keys(formError).length === 0) {
            console.log("Sending data to backend:", user); 
    
            try {
                const response = await axios.post("http://localhost:8000/signup", user);
                if (response.status === 201) {
                    alert(response.data.message);
                    navigate("/login");
                }
            } catch (error) {
                if (error.response) {
                    setServerError(error.response.data.message);
                } else {
                    console.error("Error:", error.message);
                }
            }
        }
    };
    

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value }); 
        setServerError("");
    };


    const validate = (value) => {
        const error = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!value.name) {
            error.name = "Username is required";
        }
        if (!value.email) {
            error.email = "Email is required";
        } else if (!regex.test(value.email)) {
            error.email = "Invalid email format";
        }
        if (!value.password) {
            error.password = "Password is required";
        }
    

        return error; 
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4" style={{ marginTop: '30px' }}>
                        User Sign Up
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            error={!!formError.name}
                            helperText={formError.name}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Enter name"
                            name="name"
                            autoComplete="name"
                            onChange={handleChange}
                            autoFocus
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            error={!!formError.email}
                            helperText={formError.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <TextField
                            error={!!formError.password}
                            helperText={formError.password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                            autoComplete="current-password"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ marginTop: "20px" }}
                        >
                            Sign Up
                        </Button>

                        <Grid container style={{ marginTop: '10px' }}>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {"Already have an account? Log In"}
                                </Link>
                            </Grid>
                        </Grid>

                        {serverError && ( 
                            <Typography
                                variant="body2"
                                color="error"
                                style={{
                                    marginTop: '20px',
                                    textAlign: 'center',
                                }}
                            >
                                {serverError}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
