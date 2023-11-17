import { useEffect, useState } from 'react';
import { Editor as TextEditor, EditorState, RichUtils, convertFromRaw, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import Header from "../../components/Header/Header";

import * as S from "./PostStyles";
import "./DraftStyles.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../assets/constants';

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
      </S.PostContainer>
    </>
  )
}

export default Post;