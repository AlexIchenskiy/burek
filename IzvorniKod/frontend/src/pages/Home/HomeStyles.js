import { Button, Container, Typography, styled } from "@mui/material";
import colors from "../../assets/colors";
import { Link } from "react-router-dom";

export const HomeDataContainer = styled(Container)`
  height: 85%;
  display: flex;
  flex-direction: column;
`;

export const HomeDataButton = styled(Button)`
  width: 160px;
  margin: 16px;
`;

export const HomeDataPostsContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const HomeDataPosts = styled(Container)`
  height: 100%;
  min-height: 320px;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-x: hidden;
`;

export const HomeDataNoPosts = styled(Typography)`
  margin: auto;
  text-align: center;
`;

export const HomeDataPost = styled(Container)`
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

export const HomeDataPostTitleLink = styled(Link)`
  text-decoration: none;
  color: black;
  transition: 0.3s all;

  &:hover {
    color: ${colors.primary};
  }
`;

export const HomeDataPostSubtitle = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  color: ${colors["secondary-dark"]};
`;

export const HomeDataPaginationContainer = styled(Container)`
  padding: 0!important;
  margin: 0!important;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const HomeDataPaginationButton = styled(Button)`
  width: 30%;
  min-width: 90px;
`;

export const HomeDataPaginationText = styled(Typography)`
  text-align: center;
  min-width: 30px;
`;

export const HomeDataCategories = styled(Container)`
  width: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 8px 0!important;
  margin: 0!important;
`;

export const HomeDataCategory = styled(Typography)`
  padding: 4px 16px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.2s transform;

  &:hover {
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }
`;