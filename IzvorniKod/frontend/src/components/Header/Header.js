import { Tooltip, Menu, IconButton, Typography } from '@mui/material';

import * as S from './HeaderStyles';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const settings = ['Login', 'Register'];

const Header = ({ isSearchVisible = true }) => {
  // TODO: change menu for authenticated users
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <S.HeaderAppBar>
      <S.HeaderToolbar>
        <Link to="/home">
          <S.HeaderLogo />
        </Link>
        {isSearchVisible && <S.HeaderSearchBarContainer>
          <S.HeaderSearch />
          <S.HeaderSearchBar size='small' />
        </S.HeaderSearchBarContainer>}
        <S.HeaderUserContainer>
          <S.HeaderNotifications />
          <Tooltip title="Profile settings">
            <IconButton onClick={handleOpenUserMenu}>
              {/* TODO: Change first letter for authenticated users */}
              <S.HeaderAvatar>A</S.HeaderAvatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
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
            {settings.map((setting) => (
              <S.HeaderMenuItem key={setting} onClick={handleCloseUserMenu}>
                <S.HeaderLink to={"/" + setting.toLowerCase()}>
                  <Typography textAlign="center">{setting}</Typography>
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