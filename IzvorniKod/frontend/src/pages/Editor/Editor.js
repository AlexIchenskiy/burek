import { useState } from 'react';
import { Editor as TextEditor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

import Header from "../../components/Header/Header";

import * as S from "./EditorStyles";
import "./DraftStyles.css";

const Editor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSave = (e) => {
    // TODO: handle save with backend call
  }

  const handleSubmit = (e) => {
    // TODO: handle submit with backend call
  }

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
          <S.EditorToolbarSave
            onMouseDown={(e) => handleSave(e)}
          />
        </S.EditorToolbarContainer>
        <S.EditorTextContainer>
          <S.EditorTitleInput type="text" disableUnderline={true} placeholder='Upišite naslov ovdje...' />
          <TextEditor editorState={editorState} onChange={setEditorState} placeholder='Počnite pisati ovdje...' />
          <S.EditorSubmit variant="contained" onClick={(e) => handleSubmit(e)}>Objavi</S.EditorSubmit>
        </S.EditorTextContainer>
      </S.EditorContainer>
    </>
  )
}

export default Editor;