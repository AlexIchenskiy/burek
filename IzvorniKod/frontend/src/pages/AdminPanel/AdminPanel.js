import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Header from '../../components/Header/Header';
import { Button, Select, Grid, InputLabel, MenuItem, Tab, Tabs, Table, TableHead, TableRow, TableCell, TableBody, Autocomplete, TextField } from '@mui/material';
import * as S from './AdminStyles'; // Uključivanje novih stilova

const AdminPanel = () => {
  const [value, setValue] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [user, setUser] = useState([]);
  const { token } = useAuth();
  const { id } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);


  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message)
    setOpenSnackbar(true);
  };

//  const fetchUserData = () => {
//    if (id) {
//      axios
//        .get(`${API_URL}/user/get/${id}`, { headers: { Authorization: `Bearer ${token}` } })
//        .then((res) => {
//          console.log(res);
//          axios
//            .get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
//            .then((res1) => {
//              console.log(res1);
//            })
//            .catch((err) => console.log(err));
//        })
//        .catch((err) => console.log(err));
//    } else if (token) {
//      axios
//        .get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
//        .then((res) => {
//          console.log(res);
//        })
//        .catch((err) => console.log(err));
//    };
//  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [newUserRole, setNewUserRole] = useState('');
 
  const handleChangeUserRole = () => {
    if (!newUserRole) {
      handleSnackbarOpen('Molimo odaberite novu ulogu.');
      return;
    }
  
    // Provjerite je li korisnik admin prije nego što mu se promijeni uloga
    if (newUserRole === 'ADMIN' && user.role !== 'ADMIN') {
      handleSnackbarOpen('Samo admin može dodijeliti ulogu admina.');
      return;
    }
  
    axios.post(
      `${API_URL}/admin/changeUserRole`,
      { userId: user.id, newRole: newUserRole },
      {
        headers: {
          'authorization': `bearer ${token}`
        }
      }
    )
      .then(() => {
        handleSnackbarOpen('Uloga korisnika uspješno promijenjena.');
      })
      .catch((err) => {
        console.error(err);
        handleSnackbarOpen('Došlo je do greške prilikom promjene uloge korisnika.');
      });
  };

   useEffect(() => {
    // Dohvati sve notifikacije
    axios.get(`${API_URL}/notification/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        console.error(err);
      });

    // Dohvati sve korisnike
    axios.get(`${API_URL}/user/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setAllUsers(res.data);
        setTotalUsers(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });

    // Dohvati sve članke
    axios.get(`${API_URL}/articles/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setTotalArticles(res.data.length);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token, id]);

  const handleGetNotifications = () => {
    axios.get(`${API_URL}/notification/getAll`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res);

        setNotifications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Header isSearchVisible={false} />
      <S.AdminContainer>
        <h1>Admin Panel</h1>
        <S.AdminDashboard container spacing={3} alignItems="center">
          {/* Prvi stupac */}
          <Grid item xs={6}>
            <S.AdminDashboardText variant="h6" >
              Ukupan broj korisnika: {totalUsers}
            </S.AdminDashboardText>
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
            value={user ? user.id : ''}
            onChange={(e) => setUser({ id: e.target.value })}
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

          <S.AdminTable>
            <S.AdminTableHead>
              <S.AdminTableRow>
                <S.AdminTableCell>ID</S.AdminTableCell>
                <S.AdminTableCell>Autor</S.AdminTableCell>
                <S.AdminTableCell>Naslov</S.AdminTableCell>
                <S.AdminTableCell>Link</S.AdminTableCell>
                <S.AdminTableCell>Moderated</S.AdminTableCell>
                {/* Dodajte druge stupce prema potrebi */}
              </S.AdminTableRow>
            </S.AdminTableHead>
            <TableBody>
              {notifications.map((notification) => (
              <S.AdminTableRow key={notification.id}>
                <S.AdminTableCell>{notification.id}</S.AdminTableCell>
                <S.AdminTableCell>{notification.from}</S.AdminTableCell>
                <S.AdminTableCell>{notification.subject}</S.AdminTableCell>
                <S.AdminTableCell>
                  <a href={`/post/${notification.articleId}`} target="_blank" rel="noopener noreferrer">
                    {notification.articleId}
                  </a>
                </S.AdminTableCell>
                <S.AdminTableCell>{notification.seen.toString()}</S.AdminTableCell>
                {/* Dodajte druge ćelije prema potrebi */}
              </S.AdminTableRow>
            ))}
            </TableBody>
          </S.AdminTable>
      </S.AdminContainer>
    </>
  );
};

export default AdminPanel;

