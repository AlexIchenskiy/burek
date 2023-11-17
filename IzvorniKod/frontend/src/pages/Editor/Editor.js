import { useState } from 'react';
import { Editor as TextEditor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

import Header from "../../components/Header/Header";

import * as S from "./EditorStyles";
import "./DraftStyles.css";
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Editor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');

  const navigate = useNavigate();
  const { token } = useAuth();

  // const handleSave = (e) => {
  //   // TODO: handle save with backend call
  // }

  const handleSubmit = (e) => {
    let data = {
      "title": title,
      "tags": '#defaultTag',
      "content": JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      "isposted": true
    };

    console.log(data);

    axios.post(`${API_URL}/posts/add`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .catch((err) => console.log(err))
      .finally(() => navigate("/home", { replace: true }));
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleInlineStyle = (e, style) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <>
      <Header isSearchVisible={false} />
      <S.EditorContainer>
        <S.EditorToolbarContainer>
          <S.EditorToolbarBold
            onMouseDown={(e) => handleInlineStyle(e, 'BOLD')}
            className={currentStyle.has('BOLD') ? 'active' : ''}
          />
          <S.EditorToolbarItalic
            onMouseDown={(e) => handleInlineStyle(e, 'ITALIC')}
            className={currentStyle.has('ITALIC') ? 'active' : ''}
          />
          {/* <S.EditorToolbarSave
            onMouseDown={(e) => handleSave(e)}
          /> */}
        </S.EditorToolbarContainer>
        <S.EditorTextContainer>
          <S.EditorTitleInput value={title} onChange={handleTitleChange} type="text" disableUnderline={true} placeholder='Upišite naslov ovdje...' />
          <TextEditor editorState={editorState} onChange={setEditorState} placeholder='Počnite pisati ovdje...' />
          <S.EditorSubmit variant="contained" onClick={(e) => handleSubmit(e)}>Objavi</S.EditorSubmit>
        </S.EditorTextContainer>
      </S.EditorContainer>
    </>
  )
}

export default Editor;