import { TextField, Button, Container, Snackbar, Alert, styled, Typography } from "@mui/material";
import colors from "../../assets/colors";
import { Link } from "react-router-dom";

export const ProfileContainer = styled(Container)` 
  display: flex;
  width: 100%;
  min-width: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileCard = styled(Container)`
  width: fit-content;
  min-width: 240px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${colors["secondary-dark"]};
  border-radius: 8px;
`;

export const ProfileName = styled(Container)`
  margin: auto;
  display: flex;
  text-align: center;
  font-size: 2.5em;
`;

export const ProfileSubtitle = styled(Typography)`
  padding-bottom: 8px;
  color: ${colors["secondary-dark"]};
`;

export const ProfileButton = styled(Button)`
  margin: 8px 0;
  text-align: right;
`;

export const ProfileTextField = styled(TextField)`

`;

export const ProfileSnackbar = styled(Snackbar)`

`;

export const ProfileAlert = styled(Alert)`

`;

export const ProfileDialog = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
`;

export const ProfileNoPosts = styled(Typography)`
  margin: auto;
  text-align: center;
`;

export const ProfilePostsTitle = styled(Typography)`
  margin: auto;
  text-align: center;
`;

export const ProfilePost = styled(Container)`
  width: 65%;
  min-width: 240px;
  margin: 16px;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${colors["secondary-dark"]};
  border-radius: 8px;
`;

export const ProfilePostData = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const ProfilePostTitle = styled(Typography)`
  font-size: 32px;
  font-weight: 600;
`;

export const ProfilePostTitleInfo = styled(Typography)`
  text-align: center;
  font-size: 32px;
  font-weight: 600;
`;

export const ProfilePostTitleLink = styled(Link)`
  text-decoration: none;
  color: black;
  transition: 0.3s all;

  &:hover {
    color: ${colors.primary};
  }
`;

export const ProfilePostSubtitle = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  color: ${colors["secondary-dark"]};
`;