import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import * as S from './ProfileStyles';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const { token, user: authUser } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    bio: 'Web developer passionate about React.',
  });

  const [editedUser, setEditedUser] = useState({ ...user });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const isEqual = (obj1, obj2) => {
    if (obj1 === obj2) {
      return true;
    }
  
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
      return false;
    }
  
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      if (!keys2.includes(key) || !isEqual(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  };

  const isEditing = !isEqual(editedUser, user);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/posts/getAll`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchUserData = () => {
    axios
      .get(`${API_URL}/user/profile/id`, { headers: { Authorization: `Bearer ${token}` }, id : id })
      .then((res) => {
        setUser(res.data);
        setEditedUser({ ...res.data });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  const handleEditClick = () => {
    setEditedUser({ ...user });
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log(editedUser);

    axios
      .put(`${API_URL}/user/profile`, editedUser, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        fetchUserData(); // Ponovno dohvatite podatke nakon spremanja promjena
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 409) {
            setSnackbarMessage('Navedeni email već postoji u sustavu.');
            setOpenSnackbar(true);
          } else {
            setSnackbarMessage(err + '');
            setOpenSnackbar(true);
          }
        }
      });
    isEditing(false);
  };

  const isCurrentUserOwner = token && user.email === authUser.email;

  return (
    <>
      <Header isSearchVisible={false} />
      {token ? (
        <>
          {isEditing ? (
            <S.ProfileContainer>
              <h2>Uređivanje profila</h2>
                   <S.ProfileTextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Ime"
                        onChange={e => setEditedUser((prevUser) => ({ ...prevUser, firstName: e.target.value }))}
                        value={editedUser.firstName}
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <S.ProfileTextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Prezime"
                        onChange={e => setEditedUser((prevUser) => ({ ...prevUser, lastName: e.target.value }))}
                        value={editedUser.lastName}
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <S.ProfileTextField
                        type="email"
                        variant='outlined'
                        color='primary'
                        label="Email"
                        onChange={e => setEditedUser((prevUser) => ({ ...prevUser, email: e.target.value }))}
                        value={editedUser.email}
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <S.ProfileTextField
                        type="text"
                        variant='outlined'
                        color='primary'
                        label="Bio"
                        onChange={e => setEditedUser((prevUser) => ({ ...prevUser, bio: e.target.value }))}
                        value={editedUser.bio}
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <S.ProfileButton variant="outlined" color="primary" type="submit" onClick={handleSaveClick}>Spremi promjene</S.ProfileButton>
                    <S.ProfileSnackbar
                        open={openSnackbar}
                        autoHideDuration={6000}
                        onClose={handleSnackbarClose}
                    >
                        <S.ProfileAlert onClose={handleSnackbarClose} severity="error">
                        {snackbarMessage}
                        </S.ProfileAlert>
                    </S.ProfileSnackbar>
            </S.ProfileContainer>
          ) : (
            <>
              <S.ProfileName>
                {editedUser.firstName} {editedUser.lastName}
              </S.ProfileName>
              <p>
                <S.ProfileBio>{editedUser.bio}</S.ProfileBio>
              </p>
              {isCurrentUserOwner && (
                <S.ProfileButton variant='outlined' color='primary' onClick={handleEditClick}>
                  Uredi profil
                </S.ProfileButton>
              )}
            </>
          )}
        </>
      ) : (
        <S.ProfileContainer>
          <p>
            Morate biti prijavljeni da biste vidjeli svoj profil. Prijavite se{' '}
            <Link to='/login'>ovdje</Link>.
          </p>
        </S.ProfileContainer>
      )}
    </>
  );
};

export default Profile;
