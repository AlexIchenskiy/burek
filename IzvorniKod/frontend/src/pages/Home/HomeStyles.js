import { Container, Typography, styled } from "@mui/material";
import colors from "../../assets/colors";

export const HomeDataContainer = styled(Container)`
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HomeDataPosts = styled(Container)`
  height: 100%;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const HomeDataPost = styled(Container)`
  width: 65%;
  min-width: 240px;
  height: 96px;
  margin: 16px;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${colors["secondary-dark"]};
  border-radius: 8px;
`;

export const HomeDataPostData = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const HomeDataPostTitle = styled(Typography)`
  font-size: 32px;
  font-weight: 600;
`;

export const HomeDataPostSubtitle = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  color: ${colors["secondary-dark"]};
`;