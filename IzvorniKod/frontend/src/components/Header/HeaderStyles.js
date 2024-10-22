import { AppBar, Avatar, Box, Container, MenuItem, TextField, Toolbar, Typography, styled } from "@mui/material";
import { HistoryEdu, Notifications, Search } from '@mui/icons-material';

import colors from '../../assets/colors';
import { Link } from "react-router-dom";

export const HeaderAppBar = styled(AppBar)`
  padding: 0!important;
  box-shadow: none;
  background-color: white;
  position: relative;
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
  transition: 0.3s transform;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const HeaderSearch = styled(Search)`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  color: ${colors.primary};
  cursor: pointer;
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
  cursor: pointer;
`;

export const HeaderAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  background-color: ${colors.primary};
`;

export const HeaderMenuItem = styled(MenuItem)`
  padding: 0;
`;

export const HeaderNotificationsMenuItem = styled(MenuItem)`
  padding: 0 8px;
`;

export const HeaderNotificationContainer = styled(Container)`
  margin: 16px 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const HeaderNotificationTitle = styled(Typography)`
  transition: 0.2s transform;
  cursor: ${(props) => props.seen ? "default" : "pointer"};;

  &:hover {
    transform: ${(props) => props.seen ? "" : "scale(1.02)"};
  }

  &:active {
    transform: ${(props) => props.seen ? "" : "scale(0.98)"};;
  }
`;

export const HeaderLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 8px;
  color: black;
  text-decoration: none;
  transition: 0.3s all;

  &:hover {
    color: ${colors.primary};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;