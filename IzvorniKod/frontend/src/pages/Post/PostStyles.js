import { ContentCopy } from "@mui/icons-material";
import { Container, Input, styled } from "@mui/material";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";

export const PostContainer = styled(Container)`
  width: 80%;
  height: 80%;
  padding: 16px;
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 768px) {
    width: 90%;
  }

  @media only screen and (max-width: 375px) {
    width: 95%;
    padding: 8px 4px;
  }
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
  padding-left: 8px!important;
  justify-content: flex-start;

  & > * {
    margin: 8px;

    @media only screen and (max-width: 375px) {
      justify-content: center;
    }
  }

  @media only screen and (max-width: 375px) {
    justify-content: center;
  }
`;

export const FacebookShareContainer = styled(FacebookShareButton)`
  width: 32px;
  height: 32px;
  margin: 8px;
`;

export const LinkedinShareContainer = styled(LinkedinShareButton)`
  width: 32px;
  height: 32px;
  margin: 8px;
`;

export const WhatsappShareContainer = styled(WhatsappShareButton)`
  width: 32px;
  height: 32px;
  margin: 8px;
`;

export const EmailShareContainer = styled(EmailShareButton)`
  width: 32px;
  height: 32px;
  margin: 8px;
`;

export const CopyShareButton = styled(Container)`
  min-width: 32px;
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