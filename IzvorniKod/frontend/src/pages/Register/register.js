import React, { useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import useAuth from '../../hooks/useAuth';
import { validateEmail } from '../../validators/validateEmail';
import { validateFirstname } from '../../validators/validateFirstname';
import { validateLastname } from '../../validators/validateLastname';
import { validatePassword } from '../../validators/validatePassword';
import { validateFields } from '../../validators/validateFields';

const RegisterForm = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [firstnameError, setFirstnameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleSnackbarOpen = (message) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    }

    const validate = () => {
        const fields = [
            { value: firstName.trim(), validator: validateFirstname, setError: setFirstnameError },
            { value: lastName.trim(), validator: validateLastname, setError: setLastnameError },
            { value: email.trim(), validator: validateEmail, setError: setEmailError },
            { value: password, validator: validatePassword, setError: setPasswordError },
        ];

        return validateFields(fields, handleSnackbarOpen);
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, password);
        setFirstnameError("");
        setLastnameError("");
        setEmailError("");
        setPasswordError("");

        if (!validate()) return;

        setLoading(true);

        axios.post(`${API_URL}/user/register`, {
            firstname: firstName.trim(), lastname: lastName.trim(), email: email.trim(), password: password
        })
            .then((res) => {
                setToken(res.data.token);
                navigate("/home", { replace: true });
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 409) {
                        handleSnackbarOpen("Navedeni email već postoji u sustavu.");
                    } else {
                        console.log(err);
                        handleSnackbarOpen("U sustavu se dogodila neočekivana greška. Probajte ponovo ili kontaktirajte razvojni tim.");
                    }
                } else {
                    console.log(err);
                    handleSnackbarOpen("U sustavu se dogodila neočekivana greška. Probajte ponovo ili kontaktirajte razvojni tim.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <form method="POST" action="/api/user/register" onSubmit={handleSubmit} >
                <h2>Kreiranje računa</h2>
                <TextField
                    type="text"
                    variant='outlined'
                    color='primary'
                    label="Ime"
                    onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    error={firstnameError}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="text"
                    variant='outlined'
                    color='primary'
                    label="Prezime"
                    onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    error={lastnameError}
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
                    error={emailError}
                    fullWidth
                    required
                    sx={{ mb: 4 }}
                />
                <TextField
                    type="password"
                    variant='outlined'
                    color='primary'
                    label="Lozinka"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    error={passwordError}
                    required
                    fullWidth
                    sx={{ mb: 4 }}
                />
                <Button variant="outlined" color="primary" type="submit" disabled={loading}>{loading ? "Kreiranje računa..." : "Kreiraj račun"}</Button>
                <small>Već imate račun? <Link to="/login">Prijavite se ovdje</Link></small>
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
