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
import { validateTitle } from '../../validators/validateTitle';
import { validateContent } from '../../validators/validateContent';
import { validateFields } from '../../validators/validateFields';
import { Alert, Snackbar } from '@mui/material';

const Editor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuth();

  // const handleSave = (e) => {
  //   // TODO: handle save with backend call
  // }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message)
    setOpenSnackbar(true);
  };

  const validate = () => {
    const fields = [
      { value: title.trim(), validator: validateTitle },
      { value: JSON.stringify(convertToRaw(editorState.getCurrentContent())), validator: validateContent },
    ];

    return validateFields(fields, handleSnackbarOpen);
  };

  const handleSubmit = (e) => {
    let data = {
      "title": title,
      "tags": '#defaultTag',
      "content": JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      "isposted": true
    };

    console.log(data);

    if (!validate()) return;

    setLoading(true);

    axios.post(`${API_URL}/posts/add`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => navigate("/home", { replace: true }))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
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
          <S.EditorSubmit variant="contained" onClick={(e) => handleSubmit(e)} disabled={loading}>{loading ? "Objavljivanje..." : "Objavi"}</S.EditorSubmit>
        </S.EditorTextContainer>
      </S.EditorContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Editor;