import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import useAuth from '../../hooks/useAuth';

const RegisterForm = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, password);

        axios.post(`${API_URL}/user/register`, {
            firstname: firstName, lastname: lastName, email: email, password: password
        })
            .then((res) => {
                setToken(res.token);
                navigate("/home", { replace: true });
            })
            .catch((err) => {
                setSnackbarMessage(err + "");
                setOpenSnackbar(true)
            });
    }

    return (
        <>
            <form method="POST" action="/api/user/register" onSubmit={handleSubmit} >
                <h2>Register Form</h2>
                <TextField
                    type="text"
                    variant='outlined'
                    color='primary'
                    label="First Name"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='primary'
                    label="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="email"
                    variant='outlined'
                    color='primary'
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='primary'
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <Button variant="outlined" color="primary" type="submit">Register</Button>
                <small>Already have an account? <Link to="/login">Login Here</Link></small>
            </form>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="error">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}

export default RegisterForm;
