import { AppBar, Avatar, Box, TextField, Toolbar, styled } from "@mui/material";
import { HistoryEdu, Notifications, Search } from '@mui/icons-material';

import colors from '../../assets/colors';

export const HeaderAppBar = styled(AppBar)`
  box-shadow: none;
`;

export const HeaderToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  background-color: ${colors.secondary};
  box-shadow: none;
`;

export const HeaderLogo = styled(HistoryEdu)`
  width: 48px;
  height: 48px;
  color: ${colors.primary};
`;

export const HeaderSearch = styled(Search)`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  color: ${colors.primary};
`;

export const HeaderSearchBarContainer = styled(Box)`
  width: 40%;
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderSearchBar = styled(TextField)`
  width: calc(100% - 32px);
  height: auto;

  & label.Mui-focused {
    color: ${colors.primary};
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${colors.primary};
    }
  }
`;

export const HeaderUserContainer = styled(Box)`
  height: 32px;
  display: flex;
`;

export const HeaderNotifications = styled(Notifications)`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  color: ${colors.primary};
`;

export const HeaderAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  background-color: ${colors.primary};
`;