import { useEffect, useState } from 'react';
import { Editor as TextEditor, EditorState, convertFromRaw, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { EmailShareButton, EmailIcon, FacebookIcon, FacebookShareButton, WhatsappShareButton, WhatsappIcon, LinkedinShareButton, LinkedinIcon } from 'react-share';

import Header from "../../components/Header/Header";

import * as S from "./PostStyles";
import "./DraftStyles.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL, PAGE_URL } from '../../assets/constants';

const Post = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.post(`${API_URL}/posts/id`, { id: id })
      .then((res) => {
        console.log(res);

        setTitle(res.data.title);
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
          <FacebookShareButton url={`${PAGE_URL}/post/${id}`}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <LinkedinShareButton url={`${PAGE_URL}/post/${id}`}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={`${PAGE_URL}/post/${id}`}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <S.CopyShareButton onClick={() => { navigator.clipboard.writeText(`${PAGE_URL}/post/${id}`) }}>
            <S.CopyShareIcon />
          </S.CopyShareButton>
          <EmailShareButton url={`${PAGE_URL}/post/${id}`}>
            <EmailIcon size={32} round />
          </EmailShareButton>
        </S.PostShareContainer>
      </S.PostContainer>
    </>
  )
}

export default Post;