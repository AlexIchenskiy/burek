import { FormatBold, FormatItalic, Save } from "@mui/icons-material";
import { Button, Container, Input, Typography, styled } from "@mui/material";

import colors from '../../assets/colors';

export const EditorContainer = styled(Container)`
  width: 80%;
  height: 80%;
  padding: 16px;
  display: flex;

  @media only screen and (max-width: 568px) {
    width: 100%;
    margin: 0;
  }
`;

export const EditorTextContainer = styled(Container)`
  min-height: 360px;
  padding: 0!important;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EditorToolbarContainer = styled(Container)`
  width: auto;
  padding: 56px 0 0 0!important;
  display: flex;
  flex-direction: column;

  & * {
    margin: 8px;
  }
`;

export const EditorTitleInput = styled(Input)`
  width: 100%;
  height: 32px;
  padding: 16px;
  margin-bottom: 16px;
  font-size: 32px;

  @media only screen and (max-width: 568px) {
    font-size: 24px;
  }
`;

export const EditorToolbarItalic = styled(FormatItalic)`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: ${colors.primary};
  cursor: pointer;
`;

export const EditorToolbarBold = styled(FormatBold)`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  color: ${colors.primary};
  cursor: pointer;
`;

export const EditorToolbarSave = styled(Save)`
  width: 24px;
  height: 24px;
  color: ${colors.primary};
  cursor: pointer;
`;

export const EditorSubmit = styled(Button)`
  width: 50%;
  max-width: 240px;
  align-self: flex-start;
  background-color: ${colors.primary};

  &:hover {
    background-color: ${colors.primary};
  }
`;

export const EditorCategoriesContainer = styled(Container)`
  width: 100%;
  margin: 16px 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const EditorCategory = styled(Typography)`
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