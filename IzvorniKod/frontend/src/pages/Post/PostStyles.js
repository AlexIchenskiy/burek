import { ContentCopy } from "@mui/icons-material";
import { Avatar, Chip, Container, FormControl, Input, Typography, styled } from "@mui/material";
import { EmailShareButton, FacebookShareButton, LinkedinShareButton, WhatsappShareButton } from "react-share";

import colors from '../../assets/colors';

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

export const PostInfoContainer = styled(Container)`
  width: 100%;
  height: 32px;
  padding: 0!important;
  margin: 0!important;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 576px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > * {
      margin: 8px;
    }
  }
`;

export const PostShareContainer = styled(Container)`
  height: 32px;
  display: flex;
  padding-left: 8px!important;
  justify-content: flex-start;

  & > * {
    margin: 0 8px!important;

    @media only screen and (max-width: 576px) {
      justify-content: center;
    }
  }

  @media only screen and (max-width: 576px) {
    justify-content: center;
  }
`;

export const FacebookShareContainer = styled(FacebookShareButton)`
  width: 32px;
  height: 32px;
`;

export const LinkedinShareContainer = styled(LinkedinShareButton)`
  width: 32px;
  height: 32px;
`;

export const WhatsappShareContainer = styled(WhatsappShareButton)`
  width: 32px;
  height: 32px;
`;

export const EmailShareContainer = styled(EmailShareButton)`
  width: 32px;
  height: 32px;
`;

export const CopyShareButton = styled(Container)`
  min-width: 32px;
  width: 32px;
  height: 32px;
  padding: 0!important;
  margin: 0 8px;
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

export const PostRatingContainer = styled(Container)`
  width: auto;
  display: flex;
  align-items: center;
`;

export const PostRatingChip = styled(Chip)`
  margin-left: 12px;
`;

export const PostCommentsContainer = styled(Container)`
  width: 100%;
  height: auto;
  margin-top: 12px;
  padding: 24px 8px!important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const PostComments = styled(Container)`
  width: 100%;
  height: auto;
  min-height: 240px;
  margin-bottom: 8px;
  padding: 8px!important;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PostComment = styled(Container)`
  width: 80%;
  height: auto;
  margin: 16px 0;
  padding: 0!important;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const PostCommentAvatar = styled(Avatar)`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  background-color: ${colors.primary};
  cursor: pointer;
`;

export const PostCommentContent = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const PostCommentText = styled(Typography)``;

export const PostCommentSubtext = styled(Typography)`
  margin-top: 8px;
  color: ${colors["secondary-dark"]};
`;

export const PostNoComments = styled(Typography)`
  margin: auto;
  text-align: center;
`;

export const PostCommentsForm = styled(FormControl)`
  min-width: 240px;
  width: 100%;
`;