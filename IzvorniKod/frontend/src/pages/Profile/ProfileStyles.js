import { TextField, Button, Container, Snackbar, Alert,  styled } from "@mui/material"; 
import colors from "../../assets/colors"; 
import { Link } from "react-router-dom";

 export const ProfileContainer = styled(Container)` display: flex;
  width: 30%;
  min-width: 240px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileName = styled(Container)`
    margin: auto;
    display: flex;
    text-align: center;
    font-size: 2.5em;
`;

export const ProfileBio = styled(Container)`
    margin: auto;
    display: flex;
    text-align: center;
`;

export const ProfileButton = styled(Button)`
    text-align: right;
`;

export const ProfileTextField = styled(TextField)`

`;

export const ProfileSnackbar = styled(Snackbar)`

`;

export const ProfileAlert= styled(Alert)`

`;

