import { useEffect, useState } from 'react';
import { Editor as TextEditor, EditorState, RichUtils, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import Header from "../../components/Header/Header";

import * as S from "./EditorStyles";
import "./DraftStyles.css";
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { validateTitle } from '../../validators/validateTitle';
import { validateContent } from '../../validators/validateContent';
import { validateFields } from '../../validators/validateFields';
import { Alert, Snackbar } from '@mui/material';
import { getHueRotatedColor } from '../../util/colorUtil';
import colors from '../../assets/colors';

const Editor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarInfo, setOpenSnackbarInfo] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarInfoMessage, setSnackbarInfoMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [contentLoading, setContentLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message)
    setOpenSnackbar(true);
  };

  const handleSnackbarInfoClose = () => {
    setOpenSnackbarInfo(false);
  };

  const handleSnackbarInfoOpen = (message) => {
    setSnackbarInfoMessage(message)
    setOpenSnackbarInfo(true);
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
      title: title,
      tags: '#defaultTag',
      content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
      posted: true,
      category: category
    };

    console.log(data);

    if (!validate()) return;

    if (category === null) {
      handleSnackbarOpen("Morate odabrati najmanje jednu kategoriju!");
      return;
    }

    setLoading(true);

    if (!id) {
      axios.post(`${API_URL}/posts/add`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => navigate("/home", { replace: true }))
        .catch((err) => {
          console.log(err);
          handleSnackbarOpen('Dogodila se pogreška prilikom objavljivanja članka.');
          setLoading(false)
        });
    } else {
      data.id = id;

      axios.post(`${API_URL}/posts/update`, data, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => {
          navigate('/home');
        })
        .catch((err) => {
          console.log(err);
          handleSnackbarOpen('Dogodila se pogreška prilikom objavljivanja članka.');
        });
    }
  }

  const handleSave = (e) => {
    let data;
    if (article !== null) {
      data = { ...article, title: title, content: JSON.stringify(convertToRaw(editorState.getCurrentContent())) }
    } else {
      data = {
        id: id,
        title: title,
        tags: '#defaultTag',
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        posted: false,
        category: category
      };
    }

    console.log(article);

    let url = `${API_URL}` + (id ? '/posts/update' : '/posts/add');

    if (!validate()) return;

    setIsSaving(true);

    axios.post(url, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        if (id) {
          handleSnackbarInfoOpen('Vaš članak je uspješno spremljen! Sada ga možete vidjeti u svojem profilu.')
        } else {
          navigate(`/editor/${res.data.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
        handleSnackbarOpen('Dogodila se pogreška prilikom spremanja članka.');
      })
      .finally(() => setIsSaving(false));
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleInlineStyle = (e, style) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const currentStyle = editorState.getCurrentInlineStyle();

  useEffect(() => {
    if (id) {
      setContentLoading(true);

      axios.get(`${API_URL}/posts/${id}`)
        .then((res) => {
          console.log(res);

          setArticle(res.data);
          setCategory(res.data.category.name);
          setTitle(res.data.title || '');

          if (res.data.content) {
            try {
              setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.content))));
            } catch (error) {
              setEditorState(EditorState.createWithContent(ContentState.createFromText(res.data.content)));
            }
          };
        })
        .catch((err) => {
          console.log(err);
          handleSnackbarOpen('Dogodila se greška tijekom učitavanja članka.');
        })
        .finally(() => setContentLoading(false));
    }
  }, [id, token]);

  useEffect(() => {
    axios.get(`${API_URL}/posts/categories/getAll`)
      .then((res) => {
        console.log(res);

        setCategories(res.data.categories);
        // setCategories(["Popularno", "Aktualno", "Znanost"])
        setCategory(res.data.categories[0].name)
      })
      .catch((err) => {
        console.log(err);
        handleSnackbarOpen('Dogodila se greška tijekom učitavanja kategorija.');
      });
  }, [token]);

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
            sx={contentLoading || isSaving ? { cursor: 'initial', color: 'gray' } : { cursor: 'pointer' }}
            onMouseDown={(e) => { if (!isSaving && !contentLoading) handleSave(e) }}
          />
        </S.EditorToolbarContainer>
        <S.EditorTextContainer>
          <S.EditorTitleInput value={title} onChange={handleTitleChange} type="text" disableUnderline={true} placeholder={contentLoading ? 'Učitavam naslov...' : 'Upišite naslov ovdje...'} disabled={contentLoading} />
          <TextEditor editorState={editorState} onChange={setEditorState} placeholder={contentLoading ? 'I članak...' : 'Počnite pisati ovdje...'} disabled={contentLoading} />
          <S.EditorCategoriesContainer>
            {categories.map((cat, index) => {
              return (
                <S.EditorCategory
                  variant='h6'
                  color={getHueRotatedColor(colors['hue-start'], index * 30)}
                  sx={category === cat.name ? { border: `1px solid ${getHueRotatedColor(colors['hue-start'], index * 30)}` } : {}}
                  onClick={() => setCategory(cat.name)}
                >
                  {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
                </S.EditorCategory>
              )
            })}
          </S.EditorCategoriesContainer>
          <S.EditorSubmit variant="contained" onClick={(e) => handleSubmit(e)} disabled={loading || contentLoading || isSaving}>{loading ? "Objavljivanje..." : "Objavi"}</S.EditorSubmit>
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
      <Snackbar
        open={openSnackbarInfo}
        autoHideDuration={6000}
        onClose={handleSnackbarInfoClose}
      >
        <Alert onClose={handleSnackbarInfoClose} severity="success">
          {snackbarInfoMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Editor;