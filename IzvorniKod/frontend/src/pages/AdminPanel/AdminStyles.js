import { Button, Container, Select, InputLabel, styled, Typography, Table, TableCell, TableHead, TableRow, Grid, Autocomplete } from "@mui/material";
import colors from "../../assets/colors";
import { Link } from "react-router-dom";

export const AdminContainer = styled(Container)`
  max-width: 70%;
  margin: auto;
  padding: 16px;
`;

export const AdminDashboard = styled(Grid)`
  margin-bottom: 16px;
`;

export const AdminDashboardText = styled(Typography)`
  font-size: 14px;
  text-align: left;
  margin-bottom: 8px;
`;

export const AdminControls = styled('div')`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const AdminAutocomplete= styled(Autocomplete)`
  width: 60%;
`;
export const AdminInputLabel = styled(InputLabel)`
  flex-shrink: 0;
`;

export const AdminButton = styled(Button)`
  margin: 16px;
  width: 30%
`;

export const AdminSelect = styled(Select)`
  flex-grow: 1;
  width: 30%;
`;

export const AdminTable = styled(Table)`
  margin-bottom: 16px;
`;

export const AdminTableHead = styled(TableHead)`
  background-color: ${colors.primary};
`;

export const AdminTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${colors["secondary-light"]};
  }
`;

export const AdminTableCell = styled(TableCell)`
  color: white;
`;

export const AdminTypography = styled(Typography)`
  margin: auto;
  text-align: center;
`;

// Dodane nove stilove za AdminDashboard
export const AdminDashboardContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AdminDashboardColumn = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
`;

