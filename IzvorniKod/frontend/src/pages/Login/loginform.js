import React, { useState } from "react";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import "./loginform.css";
import axios from "axios";
import { API_URL } from "../../assets/constants";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setEmailError(false);
        setPasswordError(false);

        if (email === '') {
            setEmailError(true);
        }
        if (password === '') {
            setPasswordError(true);
        }

        if (email && password) {
            console.log(email, password);

            axios.post(`${API_URL}/user/login`, { email: email, password: password })
                .then((res) => {
                    setToken(res.token);
                    navigate("/home", { replace: true });
                })
                .catch((err) => {
                    setSnackbarMessage(err + "");
                    setOpenSnackbar(true)
                });
        }
    }

    return (
        <>
            <div className="cover">
                <form method="POST" action="/api/user/login" autoComplete="off" onSubmit={handleSubmit}>
                    <h2>InterFER Login</h2>
                    <TextField
                        label="Email"
                        onChange={e => setEmail(e.target.value)}
                        required
                        variant="outlined"
                        type="email"
                        sx={{ mb: 3 }}
                        fullWidth
                        value={email}
                        error={emailError}
                    />
                    <TextField
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        type="password"
                        value={password}
                        error={passwordError}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <Button variant="outlined" type="submit">Login</Button>
                    <small>Need an account? <Link to="/register">Register here</Link></small>
                </form>
            </div>
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
    );
}

export default Login;
