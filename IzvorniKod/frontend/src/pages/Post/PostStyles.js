import { FormatBold, FormatItalic, Save } from "@mui/icons-material";
import { Button, Container, Input, styled } from "@mui/material";

import colors from '../../assets/colors';

export const PostContainer = styled(Container)`
  width: 80%;
  height: 80%;
  padding: 16px;
  display: flex;
`;

export const PostTextContainer = styled(Container)`
  padding: 0!important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const PostTitleInput = styled(Input)`
  width: 100%;
  height: 32px;
  padding: 16px;
  margin-bottom: 16px;
  font-size: 32px;
  cursor: default;
`;

export const PostSubmit = styled(Button)`
  width: 50%;
  max-width: 240px;
  align-self: flex-start;
  background-color: ${colors.primary};

  &:hover {
    background-color: ${colors.primary};
  }
`;