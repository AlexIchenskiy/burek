import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import * as S from './ProfileStyles';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import useAuth from '../../hooks/useAuth';
import { validateFirstname } from '../../validators/validateFirstname';
import { validateLastname } from '../../validators/validateLastname';
import { validateEmail } from '../../validators/validateEmail';
import { validateFields } from '../../validators/validateFields';
import { Dialog, DialogTitle, Typography } from '@mui/material';

const Profile = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: 'Učitavam ime i prezime...',
    lastname: '',
    email: 'I email...',
  });
  const [currentUser, setCurrentUser] = useState(null);

  const [savedPosts, setSavedPosts] = useState(null);
  const [postedPosts, setPostedPosts] = useState(null);
  const [editedUser, setEditedUser] = useState({ ...user });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCurrentUserOwner, setisCurrentUserOwner] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [otherUserArticles, setOtherUserArticles] = useState(null);
  const [banLoading, setBanLoading] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const fetchUserData = () => {
    if (id) {
      axios
        .get(`${API_URL}/user/get/${id}`)
        .then((res) => {
          console.log(res);

          setUser(res.data);
          setEditedUser({ ...res.data });
          setisCurrentUserOwner(false);
          setOtherUserArticles(res.data.articles);

          axios
            .get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res1) => {
              console.log(res1);

              setisCurrentUserOwner(token && res1.data && res.data.email === res1.data.email);
              setSavedPosts(res1.data.savedArticles);
              setPostedPosts(res1.data.publishedArticles);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else if (token) {
      axios
        .get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res);

          setUser(res.data);
          setEditedUser({ ...res.data });
          setSavedPosts(res.data.savedArticles);
          setPostedPosts(res.data.publishedArticles);
          setisCurrentUserOwner(true);
        })
        .catch((err) => console.log(err));
    };
  }

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, id]);

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  }

  const validate = () => {
    const fields = [
      { value: editedUser.firstname.trim(), validator: validateFirstname, setError: setFirstnameError },
      { value: editedUser.lastname.trim(), validator: validateLastname, setError: setLastnameError },
      { value: editedUser.email.trim(), validator: validateEmail, setError: setEmailError },
    ];

    return validateFields(fields, handleSnackbarOpen);
  };

  const handleEditClick = () => {
    setEditedUser({ ...user });
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    console.log(editedUser);

    setFirstnameError('');
    setLastnameError('');
    setEmailError('');

    if (!validate()) return;

    setIsSaving(true);

    axios
      .post(`${API_URL}/user/edit`, editedUser, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        fetchUserData();
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);

        if (err.response) {
          if (err.response.status === 409) {
            handleSnackbarOpen('Navedeni email već postoji u sustavu.');
          } else {
            handleSnackbarOpen('Dogodila se greška tijekom spremanja promjena');
          }
        }
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleDeleteClick = () => {
    if (token) {
      axios
        .delete(`${API_URL}/user/delete`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          navigate("/logout");
        })
        .catch((err) => handleSnackbarOpen('Dogodila se greška tijekom brisanja profila.'));
    }
  }

  const handleBanUser = () => {
    setBanLoading(true);

    if (token) {
      axios
        .post(`${API_URL}/user/ban/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          setUser({ ...user, banned: true })
        })
        .catch((err) => {
          console.log(err);

          handleSnackbarOpen('Dogodila se greška tijekom bannanja korisnika.');
        })
        .finally(() => setBanLoading(false));;
    }
  }

  const handlePardonUser = () => {
    setBanLoading(true);

    if (token) {
      axios
        .post(`${API_URL}/user/unban/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          setUser({ ...user, banned: false })
        })
        .catch((err) => {
          console.log(err);

          handleSnackbarOpen('Dogodila se greška tijekom ne-bannanja korisnika.')
        })
        .finally(() => setBanLoading(false));
    }
  }

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
      <S.ProfileLayoutContainer>
        {isEditing ? (
          <S.ProfileContainer>
            <h2>Uređivanje profila</h2>
            <S.ProfileTextField
              type="text"
              variant='outlined'
              color='primary'
              label="Ime"
              onChange={e => setEditedUser((prevUser) => ({ ...prevUser, firstname: e.target.value }))}
              value={editedUser.firstname}
              error={firstnameError}
              fullWidth
              sx={{ mb: 4 }}
            />
            <S.ProfileTextField
              type="text"
              variant='outlined'
              color='primary'
              label="Prezime"
              onChange={e => setEditedUser((prevUser) => ({ ...prevUser, lastname: e.target.value }))}
              value={editedUser.lastname}
              error={lastnameError}
              fullWidth
              sx={{ mb: 4 }}
            />
            <S.ProfileTextField
              type="email"
              variant='outlined'
              color='primary'
              label="Email"
              onChange={e => { setEditedUser((prevUser) => ({ ...prevUser, email: e.target.value })) }}
              value={editedUser.email}
              error={emailError}
              fullWidth
              sx={{ mb: 4 }}
            />
            <S.ProfileButton variant="outlined" color="primary" type="submit" onClick={handleSaveClick} disabled={isSaving}>
              {isSaving ? "Spremam promjene..." : "Spremi promjene"}
            </S.ProfileButton>
            <S.ProfileButton variant='outlined' color='error' onClick={() => {
              setFirstnameError('');
              setLastnameError('');
              setEmailError('');
              setOpenSnackbar(false);
              setIsEditing(false);
              setEditedUser({ ...user });
            }}>
              Odustani
            </S.ProfileButton>
          </S.ProfileContainer>
        ) : (
          <S.ProfileContainer>
            <S.ProfileCard>
              <S.ProfileName>
                <span style={{ textAlign: "center", width: "100%" }}>
                  {user.firstname + " " + user.lastname}
                </span>
              </S.ProfileName>
              <S.ProfileSubtitle>
                {user.email}
              </S.ProfileSubtitle>
              <S.ProfileSubtitle>
                {(() => {
                  switch (user.role) {
                    case "ADMIN":
                      return <Typography variant='body1' color="red" fontWeight={900}>Administrator</Typography>;

                    case "MODERATOR":
                      return <Typography variant='body1' color="green" fontWeight={700}>Moderator</Typography>;

                    case "STUDENT":
                      return <Typography variant='body1' color="orange" fontWeight={500}>Student</Typography>;

                    default:
                      return <Typography variant='body1' color="orange">A i ulogu...</Typography>;
                  }
                })()}
              </S.ProfileSubtitle>
              {user.banned &&
                <S.ProfileSubtitle>
                  Korisnik je bannan
                </S.ProfileSubtitle>
              }
              {isCurrentUserOwner && (
                <>
                  <S.ProfileButton variant='outlined' color='primary' onClick={handleEditClick}>
                    Uredi profil
                  </S.ProfileButton>
                  <S.ProfileButton variant='outlined' color='error' onClick={handleModalOpen}>
                    Izbriši profil
                  </S.ProfileButton>
                  <Dialog open={modalOpen} onClose={handleModalClose}>
                    <S.ProfileDialog>
                      <DialogTitle>Jeste li sigurni da želite izbrisate profil?</DialogTitle>
                      <S.ProfileButton variant='outlined' color='primary' onClick={handleModalClose}>
                        Odustani
                      </S.ProfileButton>
                      <S.ProfileButton variant='outlined' color='error' onClick={handleDeleteClick}>
                        Izbriši profil
                      </S.ProfileButton>
                    </S.ProfileDialog>
                  </Dialog>
                </>
              )}
              {console.log(user)}
              {!isCurrentUserOwner && !user.banned && currentUser && (currentUser.role === 'MODERATOR' || currentUser.role === 'ADMIN') &&
                <S.ProfileButton variant='outlined' color='error' onClick={handleBanUser} disabled={banLoading}>
                  Ban
                </S.ProfileButton>
              }
              {!isCurrentUserOwner && user.banned && currentUser && (currentUser.role === 'MODERATOR' || currentUser.role === 'ADMIN') &&
                <S.ProfileButton variant='outlined' color='success' onClick={handlePardonUser} disabled={banLoading}>
                  Ne-Ban
                </S.ProfileButton>
              }
            </S.ProfileCard>
          </S.ProfileContainer>
        )}
        {
          otherUserArticles && !isEditing && !isCurrentUserOwner &&
          <S.ProfileContainer>
            <S.ProfileCard>
              <>
                <S.ProfilePostTitleInfo>
                  Korisnički članci:
                </S.ProfilePostTitleInfo>
                {otherUserArticles.length > 0 ?
                  otherUserArticles.map((post) => (
                    <S.ProfilePost key={"saved" + post.id} id={"saved" + post.id}>
                      <S.ProfilePostData>
                        <S.ProfilePostTitle>
                          <S.ProfilePostTitleLink to={`/post/${post.id}`}>
                            {post.title}
                          </S.ProfilePostTitleLink>
                        </S.ProfilePostTitle>
                        <S.ProfilePostSubtitle>
                          {/*<div>{new Date(post.datePublished).toLocaleString('en-UK')}</div>*/}
                          <div>{`by ${user.firstname + " " + user.lastname}`}</div>
                        </S.ProfilePostSubtitle>
                      </S.ProfilePostData>
                    </S.ProfilePost>
                  ))
                  :
                  <S.ProfileNoPosts>Ovjde još nema ništa</S.ProfileNoPosts>}
              </>
            </S.ProfileCard>
          </S.ProfileContainer>
        }
        {
          savedPosts && !isEditing && isCurrentUserOwner &&
          <S.ProfileContainerSaved>
            <S.ProfileCard>
              {token && isCurrentUserOwner && (
                <>
                  <S.ProfilePostTitleInfo>
                    Vaši spremljeni članci:
                  </S.ProfilePostTitleInfo>
                  {savedPosts.length > 0 ?
                    savedPosts.map((post) => (
                      <S.ProfilePost key={"saved" + post.id} id={"saved" + post.id}>
                        <S.ProfilePostData>
                          <S.ProfilePostTitle>
                            <S.ProfilePostTitleLink to={`/editor/${post.id}`}>
                              {post.title}
                            </S.ProfilePostTitleLink>
                          </S.ProfilePostTitle>
                          <S.ProfilePostSubtitle>
                            <div>{new Date(post.datePublished).toLocaleString('en-UK')}</div>
                            <div>{`by ${user.firstname + " " + user.lastname}`}</div>
                          </S.ProfilePostSubtitle>
                        </S.ProfilePostData>
                      </S.ProfilePost>
                    ))
                    :
                    <S.ProfileNoPosts>Ovdje još nema ništa</S.ProfileNoPosts>}
                </>
              )}
            </S.ProfileCard>
          </S.ProfileContainerSaved>
        }
        {
          postedPosts && !isEditing && isCurrentUserOwner &&
          <S.ProfileContainerPosted>
            <S.ProfileCard>
              {token && isCurrentUserOwner && (
                <>
                  <S.ProfilePostTitleInfo>
                    Vaši objavljeni članci:
                  </S.ProfilePostTitleInfo>
                  {postedPosts.length > 0 ?
                    postedPosts.map((post) => (
                      <S.ProfilePost key={"posted" + post.id} id={"posted" + post.id}>
                        <S.ProfilePostData>
                          <S.ProfilePostTitle>
                            <S.ProfilePostTitleLink to={`/post/${post.id}`}>
                              {post.title}
                            </S.ProfilePostTitleLink>
                          </S.ProfilePostTitle>
                          <S.ProfilePostSubtitle>
                            <div>{new Date(post.datePublished).toLocaleString('en-UK')}</div>
                            <div>{`by ${user.firstname + " " + user.lastname}`}</div>
                          </S.ProfilePostSubtitle>
                        </S.ProfilePostData>
                      </S.ProfilePost>
                    ))
                    :
                    <S.ProfileNoPosts>Ovdje još nema ništa</S.ProfileNoPosts>}
                </>
              )}
            </S.ProfileCard>
          </S.ProfileContainerPosted>
        }
        <S.ProfileSnackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <S.ProfileAlert onClose={handleSnackbarClose} severity="error">
            {snackbarMessage}
          </S.ProfileAlert>
        </S.ProfileSnackbar>
      </S.ProfileLayoutContainer>
    </>
  );
};

export default Profile;