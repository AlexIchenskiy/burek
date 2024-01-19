import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import useAuth from '../../hooks/useAuth';
import Header from '../../components/Header/Header';
import { Button, Grid, MenuItem, TableBody, TextField, Snackbar, Alert, Typography } from '@mui/material';
import * as S from './AdminStyles';
import { useNavigate } from 'react-router-dom';
import { Close } from '@mui/icons-material';

const AdminPanel = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userEmailList, setUserEmailList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState('');
  const [sending, setSending] = useState(false);
  const [postStats, setPostStats] = useState(null);

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

  const [newUserRole, setNewUserRole] = useState('');

  const handleChangeUserRole = () => {
    if (!userId) {
      handleSnackbarOpen('Molimo unesite id korisnika.');
      return;
    }

    if (newUserRole === '') {
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

  const handleAddUserEmail = () => {
    if (userEmailList.includes(userEmail)) {
      handleSnackbarOpen('Navedeni korisnik je već dodan.');
      return;
    }

    if (allUsers.some(u => u.email === userEmail)) {
      const temp = [...userEmailList];
      temp.push(userEmail);
      setUserEmailList(temp);
      setUserEmail('');
    } else {
      handleSnackbarOpen('Navedeni korisnik ne postoji u sustavu.');
      return;
    }
  }

  const handleSend = () => {
    if (!Array.isArray(userEmailList)) return;

    if (userEmailList.length < 1) {
      handleSnackbarOpen('Navedite barem jednog korisnika.');
      return;
    }

    if (notification.length < 3) {
      handleSnackbarOpen('Obavijest mora sadržavati više od tri znaka.');
      return;
    }

    let data = {
      subject: 'Obavijest od moderatora sustava.',
      content: notification,
      to: userEmailList
    };

    setSending(true);

    axios.post(
      `${API_URL}/notification/send`, data,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then(() => {
        setUserEmailList([]);
        setNotification('');
      })
      .catch((err) => {
        console.log(err);

        handleSnackbarOpen(`Došlo je do greške prilikom slanja obavijesti.`);
      })
      .finally(() => setSending(false));
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
          console.log(err);
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

      axios
        .get(`${API_URL}/posts/stats`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res);

          setPostStats(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [token]);

  return (
    <>
      <Header isSearchVisible={false} />
      <S.AdminContainer>
        <h1>{currentUser && currentUser.role === 'ADMIN' ? 'Admin Panel' : 'Moderatorski kutak'}</h1>
        {currentUser && currentUser.role === 'ADMIN' ?
          <>
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
          </>
          :
          <>
            <S.AdminControls>
              <TextField
                label="Korisnikov email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <S.AdminButton onClick={handleAddUserEmail}>Dodaj</S.AdminButton>
            </S.AdminControls>
            <S.ModUserListContainer>
              {Array.isArray(userEmailList) && userEmailList.map((email) => {
                return (
                  <S.ModUserContainer>
                    <Typography variant='h6'>{email}</Typography>
                    <Close color='primary'
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setUserEmailList((prev) => prev.filter((e) => e !== email))} />
                  </S.ModUserContainer>
                );
              })}
            </S.ModUserListContainer>
            <S.AdminControls>
              <TextField
                label="Obavijest"
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
              />
              <S.AdminButton color='success' onClick={handleSend} disabled={sending}>Pošalji</S.AdminButton>
            </S.AdminControls>
          </>
        }
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

