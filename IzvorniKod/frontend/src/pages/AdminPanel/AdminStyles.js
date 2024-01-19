import { Button, Container, Select, InputLabel, styled, Typography, Table, TableCell, TableHead, TableRow, Grid, Autocomplete } from "@mui/material";
import colors from "../../assets/colors";

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
  flex-wrap: wrap;
  gap: 5px;
`;

export const AdminAutocomplete = styled(Autocomplete)`
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
  color: white;
  & * {
    color: white;
  }
`;

export const AdminTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${colors["secondary-light"]};
  }
`;

export const AdminTableCell = styled(TableCell)`
`;

export const AdminTypography = styled(Typography)`
  margin: auto;
  text-align: center;
`;

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

export const ModUserListContainer = styled(Container)`
  min-height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`;

export const ModUserContainer = styled(Container)`
  width: auto;
  margin: 16px;
  padding: 16px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid ${colors.primary};
  border-radius: 8px;

  & > * {
    margin: 0 8px;
  }
`;
