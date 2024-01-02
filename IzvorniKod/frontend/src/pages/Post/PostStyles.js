import { ContentCopy } from "@mui/icons-material";
import { Container, Input, styled } from "@mui/material";

export const PostContainer = styled(Container)`
  width: 80%;
  height: 80%;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

export const PostTextContainer = styled(Container)`
  margin-bottom: 32px;
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

export const PostShareContainer = styled(Container)`
  width: 100%;
  height: 32px;
  display: flex;
  justify-content: center;

  & > * {
    margin: 8px;
  }
`;

export const CopyShareButton = styled(Container)`
  width: 32px;
  height: 32px;
  padding: 0!important;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: #7f7f7f;
  cursor: pointer;
`;

export const CopyShareIcon = styled(ContentCopy)`
  width: 18px;
  height: 18px;
  color: white;
`;