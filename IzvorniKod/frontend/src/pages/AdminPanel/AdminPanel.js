import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import useAuth from '../../hooks/useAuth';
import Header from '../../components/Header/Header';
import { Button, Grid, MenuItem, TableBody, TextField, Snackbar, Alert, Typography } from '@mui/material';
import * as S from './AdminStyles';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [userId, setUserId] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  const { token } = useAuth();
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);


  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message)
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const [newUserRole, setNewUserRole] = useState(null);

  const handleChangeUserRole = () => {
    if (!userId) {
      handleSnackbarOpen('Molimo unesite id korisnika.');
      return;
    }

    if (newUserRole === null) {
      handleSnackbarOpen('Molimo odaberite novu ulogu.');
      return;
    }

    if (newUserRole === 'ADMIN' && currentUser && currentUser.role !== 'ADMIN') {
      handleSnackbarOpen('Samo admin može dodijeliti ulogu admina.');
      return;
    }

    let data = {
      id: parseInt(userId),
      role: newUserRole.toUpperCase()
    }

    axios.post(
      `${API_URL}/user/promote`, data,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(() => {
        const tempUsers = [...allUsers];
        tempUsers.find((u) => u.id === userId).role = newUserRole.toUpperCase();
        setAllUsers(tempUsers);
      })
      .catch((err) => {
        console.log(err);

        handleSnackbarOpen('Došlo je do greške prilikom promjene uloge korisnika.');
      });
  };

  const handleRetire = () => {
    let data = {
      id: parseInt(currentUser.id),
      role: 'STUDENT'
    }

    axios.post(
      `${API_URL}/user/promote`, data,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(() => {
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);

        handleSnackbarOpen('Došlo je do greške prilikom odstupanja s uloge administratora.');
      });
  }

  useEffect(() => {
    if (token) {
      axios.get(`${API_URL}/user/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log(res);

          setAllUsers(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res);

          setCurrentUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    <>
      <Header isSearchVisible={false} />
      <S.AdminContainer>
        <h1>{currentUser && currentUser.role === 'ADMIN' ? 'Admin Panel' : 'Moderatorski kutak'}</h1>
        <S.AdminDashboard container spacing={3} alignItems="center">
          <Grid item xs={6}>
            {currentUser && currentUser.role === "ADMIN" &&
              <S.AdminDashboardText variant="h6" >
                Ukupan broj korisnika: {allUsers.length}
              </S.AdminDashboardText>
            }
            {/* 
            <S.AdminDashboardText variant="h6" >
              Ukupan broj članaka: {totalArticles}
            </S.AdminDashboardText>
            */}
          </Grid>
        </S.AdminDashboard>
        <S.AdminControls>
          <TextField
            label="Unesite userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <S.AdminSelect
            id="newUserRole"
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            fullWidth
          >
            <MenuItem value="STUDENT">Student</MenuItem>
            <MenuItem value="MODERATOR">Moderator</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </S.AdminSelect>
          <S.AdminButton onClick={handleChangeUserRole}>Promijeni ulogu</S.AdminButton>
        </S.AdminControls>
        <Typography color='lightgray' variant='body2' sx={{ marginBottom: '16px' }}>Ili promjenite id klikom na redak tablice</Typography>

        <S.AdminTable>
          <S.AdminTableHead>
            <S.AdminTableRow>
              <S.AdminTableCell>ID</S.AdminTableCell>
              <S.AdminTableCell>Ime</S.AdminTableCell>
              <S.AdminTableCell>Prezime</S.AdminTableCell>
              <S.AdminTableCell>Email</S.AdminTableCell>
              <S.AdminTableCell>Uloga</S.AdminTableCell>
            </S.AdminTableRow>
          </S.AdminTableHead>
          <TableBody>
            {allUsers.map((u) => (
              <S.AdminTableRow key={u.id} onClick={() => setUserId(u.id)} sx={{ cursor: 'pointer' }}>
                <S.AdminTableCell>{u.id}</S.AdminTableCell>
                <S.AdminTableCell>{u.firstname}</S.AdminTableCell>
                <S.AdminTableCell>{u.lastname}</S.AdminTableCell>
                <S.AdminTableCell>{u.email}</S.AdminTableCell>
                <S.AdminTableCell sx={{ color: `${u.role === 'ADMIN' ? 'red' : u.role === 'MODERATOR' ? 'green' : 'orange'}` }}>{u.role}</S.AdminTableCell>
              </S.AdminTableRow>
            ))}
          </TableBody>
        </S.AdminTable>
        {currentUser && currentUser.role === 'ADMIN' &&
          <Button color='error' variant='outlined' onClick={handleRetire}>Odstupi s uloge administratora</Button>
        }
      </S.AdminContainer>
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
};

export default AdminPanel;

