import { Tooltip, Menu, IconButton, Typography, MenuList, Badge, Button } from '@mui/material';

import * as S from './HeaderStyles';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { API_URL } from '../../assets/constants';

const DEFAULT_SETTINGS = { login: 'Prijava', register: 'Novi korisnik' };
const USER_SETTINGS = { home: 'Početna', profile: 'Profil', editor: 'Nova objava', logout: 'Odjava' };

const Header = ({ isSearchVisible = true, onSearch }) => {
  const { token } = useAuth();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [searchText, setSearchText] = useState('');
  const [notifications, setNotifications] = useState([]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleNotificationsMenu = (event) => {
    if (anchorElNotifications === null) {
      setAnchorElNotifications(event.currentTarget);
    } else {
      setAnchorElNotifications(null);
    }
  };

  const handleSeenNotification = (id) => {
    axios.get(`${API_URL}/notification/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .catch((err) => {
        console.log(err);
      });

    const tempNotifications = notifications.filter((n) => n.id !== id);
    setNotifications(tempNotifications);
  }

  const handleGetNotifications = () => {
    axios.get(`${API_URL}/notification/get`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log(res);

        setNotifications(res.data);

        // Notifications for testing purposes if no actual notifications are present
        // setNotifications([{
        //   id: 123,
        //   from: 'Name Surname',
        //   userId: 1234,
        //   userRole: 'ADMIN',
        //   subject: 'Ugodni blagdani!',
        //   content: 'Razvojni tim platforme InterFER želi vam ugodne praznike.',
        //   timestamp: '2019-01-21T05:47:08.644',
        //   seen: false
        // }, {
        //   id: 124,
        //   from: 'Name Surname',
        //   userId: 1234,
        //   userRole: 'ADMIN',
        //   subject: 'Ugodni blagdani!',
        //   content: 'Razvojni tim platforme InterFER želi vam ugodne praznike.',
        //   timestamp: '2019-01-21T05:47:08.644',
        //   seen: false
        // }]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (token) {
      setSettings(USER_SETTINGS);
      handleGetNotifications();
    } else {
      setSettings(DEFAULT_SETTINGS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <S.HeaderAppBar>
      <S.HeaderToolbar>
        <Link to="/home">
          <S.HeaderLogo />
        </Link>
        {isSearchVisible && <S.HeaderSearchBarContainer>
          <S.HeaderSearch onClick={() => onSearch(searchText)} />
          <S.HeaderSearchBar size='small' value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </S.HeaderSearchBarContainer>}
        <S.HeaderUserContainer>
          {
            token &&
            <>
              <Badge color="error" invisible={notifications.length === 0}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                badgeContent={notifications.length}
              >
                <S.HeaderNotifications onClick={handleToggleNotificationsMenu} />
              </Badge>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar-notifications"
                anchorEl={anchorElNotifications}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  style: {
                    maxHeight: 480,
                  },
                }}
                open={Boolean(anchorElNotifications)}
                onClose={handleToggleNotificationsMenu}
              >
                {notifications.length === 0 ?
                  <S.HeaderNotificationsMenuItem disabled={true}>Nema obavijesti!</S.HeaderNotificationsMenuItem>
                  :
                  <MenuList>
                    {notifications.map((n) => (
                      <S.HeaderNotificationContainer key={n.id}>
                        <Typography variant="h5">{n.subject}</Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "4px" }}>
                          <span style={{ fontWeight: 'bold', marginRight: '4px' }}>{n.from}</span>
                          {new Date(n.timestamp).toLocaleString()}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "4px" }}>
                          {n.content}
                        </Typography>
                        <Button variant='outlined' sx={{ width: "50%" }} onClick={() => handleSeenNotification(n.id)}>
                          Sakrij obavijest
                        </Button>
                      </S.HeaderNotificationContainer>
                    ))}
                  </MenuList>
                }
              </Menu>
            </>
          }
          <Tooltip title="Postavke">
            <IconButton onClick={handleOpenUserMenu}>
              <S.HeaderAvatar>{token ? "Vi" : "A"}</S.HeaderAvatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar-user"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {Object.entries(settings).map(([key, value]) => (
              <S.HeaderMenuItem key={key} onClick={handleCloseUserMenu}>
                <S.HeaderLink to={"/" + key.toLowerCase()}>
                  <Typography textAlign="center">{value}</Typography>
                </S.HeaderLink>
              </S.HeaderMenuItem>
            ))}
          </Menu>
        </S.HeaderUserContainer>
      </S.HeaderToolbar>
    </S.HeaderAppBar>
  )
}

export default Header;