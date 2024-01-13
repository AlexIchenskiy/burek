import { Tooltip, Menu, IconButton, Typography } from '@mui/material';

import * as S from './HeaderStyles';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const DEFAULT_SETTINGS = { login: 'Prijava', register: 'Novi korisnik' };
const USER_SETTINGS = { home: 'Početna', editor: 'Nova objava', logout: 'Odjava' };

const Header = ({ isSearchVisible = true, onSearch }) => {
  const { token } = useAuth();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [searchText, setSearchText] = useState('');

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

  useEffect(() => {
    if (token) {
      setSettings(USER_SETTINGS);
    } else {
      setSettings(DEFAULT_SETTINGS);
    }
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
          <S.HeaderNotifications onClick={handleToggleNotificationsMenu} />
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
            open={Boolean(anchorElNotifications)}
            onClose={handleToggleNotificationsMenu}
          >
            <S.HeaderNotificationsMenuItem>Nema obavijesti!</S.HeaderNotificationsMenuItem>
          </Menu>
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