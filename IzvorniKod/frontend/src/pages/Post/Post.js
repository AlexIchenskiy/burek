import { useEffect, useState } from 'react';
import { Editor as TextEditor, EditorState, convertFromRaw, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { EmailIcon, FacebookIcon, WhatsappIcon, LinkedinIcon } from 'react-share';

import Header from "../../components/Header/Header";

import * as S from "./PostStyles";
import "./DraftStyles.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL, PAGE_URL } from '../../assets/constants';
import { Tooltip } from '@mui/material';

const COPY_DEFAULT_TOOLTIP = 'Kopiraj';

const Post = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const [shareText, setShareText] = useState(`Pročitajte članak na ovom linku:\n${PAGE_URL}/post/${id}`);

  const [copyTooltip, setCopyTooltip] = useState(COPY_DEFAULT_TOOLTIP);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${PAGE_URL}/post/${id}`)
      .then(() => {
        setCopyTooltip('Link je kopiran!');
        setTimeout(() => { setCopyTooltip(COPY_DEFAULT_TOOLTIP) }, 2000)
      })
      .catch((err) => {
        console.log(err);
        setCopyTooltip('Kopiranje nije uspjelo :(');
        setTimeout(() => { setCopyTooltip(COPY_DEFAULT_TOOLTIP) }, 2000)
      })
  }

  useEffect(() => {
    axios.post(`${API_URL}/posts/id`, { id: id })
      .then((res) => {
        console.log(res);

        setTitle(res.data.title);
        setShareText(`Pročitajte ${res.data.title} na ovom linku:\n${PAGE_URL}/post/${id}`);

        if (res.data.content) {
          try {
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.content))));
          } catch (error) {
            setEditorState(EditorState.createWithContent(ContentState.createFromText(res.data.content)));
          }
        };
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Header isSearchVisible={false} />
      <S.PostContainer>
        <S.PostTextContainer>
          <S.PostTitleInput value={title} type="text" disableUnderline={true} placeholder='Ovdje još nema naslova :(' readOnly={true} />
          <TextEditor editorState={editorState} onChange={setEditorState} placeholder='Ovjde još nema ništa :(' readOnly={true} />
        </S.PostTextContainer>
        <S.PostShareContainer>
          <Tooltip title="Podijeli na FaceBook">
            <S.FacebookShareContainer url={shareText}>
              <FacebookIcon size={32} round />
            </S.FacebookShareContainer>
          </Tooltip>
          <Tooltip title="Podijeli na LinkedIn">
            <S.LinkedinShareContainer url={shareText}>
              <LinkedinIcon size={32} round />
            </S.LinkedinShareContainer>
          </Tooltip>
          <Tooltip title="Podijeli na WhatsApp">
            <S.WhatsappShareContainer url={shareText}>
              <WhatsappIcon size={32} round />
            </S.WhatsappShareContainer>
          </Tooltip>
          <Tooltip title={`${copyTooltip}`}>
            <S.CopyShareButton onClick={handleCopy}>
              <S.CopyShareIcon />
            </S.CopyShareButton>
          </Tooltip>
          <Tooltip title="Podijeli na email">
            <S.EmailShareContainer url={shareText}>
              <EmailIcon size={32} round />
            </S.EmailShareContainer>
          </Tooltip>
        </S.PostShareContainer>
      </S.PostContainer>
    </>
  )
}

export default Post;