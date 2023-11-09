import React, {useState} from 'react';
import { TextField, Button, Container, Stack } from '@mui/material';
import { Link } from "react-router-dom"
import "./register.css"
 
const RegisterForm = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [password, setPassword] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        console.log(firstName, lastName, email, dateOfBirth, password) 
    }
 
    return (
        <React.Fragment>
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
                    sx={{mb: 4}}
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
                    sx={{mb: 4}}
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
                    sx={{mb: 4}}
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
                    sx={{mb: 4}}
                />
                <TextField
                    type="date"
                    variant='outlined'
                    color='primary'
                    label="Date of Birth"
                    onChange={e => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    fullWidth
                    required
                    sx={{mb: 4}}
                />
                <Button variant="outlined" color="primary" type="submit">Register</Button>
                <small>Already have an account? <Link to="/login">Login Here</Link></small>
            </form>
     
        </React.Fragment>
    )
}
 
export default RegisterForm;
