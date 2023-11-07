import { Tooltip, Menu, MenuItem, IconButton, Typography } from '@mui/material';

import * as S from './HeaderStyles';
import { useState } from 'react';

const settings = ['Login', 'Register'];

const Header = () => {
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
        <S.HeaderLogo />
        <S.HeaderSearchBarContainer>
          <S.HeaderSearch />
          <S.HeaderSearchBar size='small' />
        </S.HeaderSearchBarContainer>
        <S.HeaderUserContainer>
          <S.HeaderNotifications />
          <Tooltip title="Profile settings">
            <IconButton onClick={handleOpenUserMenu}>
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
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </S.HeaderUserContainer>
      </S.HeaderToolbar>
    </S.HeaderAppBar>
  )
}

export default Header;