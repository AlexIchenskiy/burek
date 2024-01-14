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
import { Alert, IconButton, InputAdornment, InputLabel, OutlinedInput, Rating, Snackbar, Tooltip } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { HourglassBottom, Send } from '@mui/icons-material';
import { validateFields } from '../../validators/validateFields';
import { validateComment } from '../../validators/validateComment';
import { roundToTwo } from '../../util/roundToTwo';
import generateUniqueGradient from '../../util/colorUtil';

const COPY_DEFAULT_TOOLTIP = 'Kopiraj';

const Post = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const [shareText, setShareText] = useState(`Pročitajte članak na ovom linku:\n${PAGE_URL}/post/${id}`);
  const [contentLoading, setContentLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const [rating, setRating] = useState(0.0);
  const [userRating, setUserRating] = useState(null);
  const [setting, setSetting] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [sending, setSending] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [copyTooltip, setCopyTooltip] = useState(COPY_DEFAULT_TOOLTIP);

  const { token } = useAuth();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message)
    setOpenSnackbar(true);
  };

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

  const handleSetRating = (val) => {
    if (token) {
      setSetting(true);

      if (val === null) {
        axios.delete(`${API_URL}/posts/rating`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }, data: {
            id: id
          }
        }
        )
          .then(() => setUserRating(null))
          .catch((err) => {
            console.log(err);
            handleSnackbarOpen('Dogodila se greška tijekom poništavanja ocjene.');
          });
      } else {
        axios.post(`${API_URL}/posts/rating`, { articleId: id, rating: val }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(() => setUserRating(val))
          .catch((err) => {
            console.log(err);
            handleSnackbarOpen('Dogodila se greška tijekom spremanja ocjene.');
          });
      }

      setTimeout(() => {
        axios.get(`${API_URL}/posts/allRatings/${id}`)
          .then((res) => {
            setRating(roundToTwo((res.data.rating1 + res.data.rating2 * 2 + res.data.rating3 * 3 + res.data.rating4 * 4 + res.data.rating5 * 5) /
              (res.data.rating1 + res.data.rating2 + res.data.rating3 + res.data.rating4 + res.data.rating5)));
          })
          .catch((err) => {
            console.log(err);
            handleSnackbarOpen('Dogodila se greška tijekom učitavanja novog stanja ocjena.')
          })
          .finally(() => setSetting(false));
      }, 1000);
    }
  }

  const handleSend = () => {
    if (!validateCommentInput()) return;

    if (token) {
      setSending(true);

      axios.post(`${API_URL}/comment/post`, { article_id: id, content: comment }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(() => setComment(''))
        .catch((err) => {
          console.log(err);
          handleSnackbarOpen('Dogodila se greška tijekom spremanja komentara.')
        });

      setTimeout(() => {
        axios.get(`${API_URL}/comment/getAll/${id}`,)
          .then((res) => setComments([...res.data].reverse()))
          .catch((err) => {
            console.log(err);
            handleSnackbarOpen('Dogodila se greška tijekom učitavanja komentara.')
          })
          .finally(() => setSending(false));
      }, 1000);
    }
  }

  const validateCommentInput = () => {
    return validateFields([{ value: comment.trim(), validator: validateComment }], handleSnackbarOpen);
  }

  useEffect(() => {
    setContentLoading(true);
    setCommentsLoading(true);

    axios.get(`${API_URL}/posts/${id}`)
      .then((res) => {
        console.log(res);

        setTitle(res.data.title || '');
        setShareText(`Pročitajte ${res.data.title} na ovom linku:\n${PAGE_URL}/post/${id}`);

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

    axios.get(`${API_URL}/posts/allRatings/${id}`)
      .then((res) => setRating(roundToTwo((res.data.rating1 + res.data.rating2 * 2 + res.data.rating3 * 3 + res.data.rating4 * 4 + res.data.rating5 * 5) /
        (res.data.rating1 + res.data.rating2 + res.data.rating3 + res.data.rating4 + res.data.rating5))))
      .catch((err) => {
        console.log(err);
        handleSnackbarOpen('Dogodila se greška tijekom učitavanja ocjena.')
      });

    if (token) {
      axios.get(`${API_URL}/posts/getRating/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((res) => setUserRating(res.data.rating))
        .catch((err) => {
          if (err.response.status === 404) {
            return;
          }
          console.log(err);
          handleSnackbarOpen('Dogodila se greška tijekom učitavanja ocjena.')
        });
    }

    axios.get(`${API_URL}/comment/getAll/${id}`)
      .then((res) => setComments([...res.data].reverse()))
      .catch((err) => {
        console.log(err);
        handleSnackbarOpen('Dogodila se greška tijekom učitavanja komentara.')
      })
      .finally(() => setCommentsLoading(false));
  }, [id, token]);

  return (
    <>
      <Header isSearchVisible={false} />
      <S.PostContainer>
        <S.PostTextContainer>
          <S.PostTitleInput value={title} type="text" disableUnderline={true} placeholder={contentLoading ? 'Učitavam naslov...' : 'Ovdje još nema naslova :('} readOnly={true} />
          <TextEditor editorState={editorState} onChange={setEditorState} placeholder={contentLoading ? 'Učitavam članak...' : 'Ovjde još nema ništa :('} readOnly={true} />
        </S.PostTextContainer>
        <S.PostInfoContainer>
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
          <S.PostRatingContainer>
            <Rating value={token ? userRating : rating} onChange={(e, val) => {
              handleSetRating(val);
            }} readOnly={!token || setting} />
            <S.PostRatingChip label={rating || 0} variant='outlined' size='small' />
          </S.PostRatingContainer>
        </S.PostInfoContainer>
        <S.PostCommentsContainer>
          <S.PostCommentsForm variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Komentar</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type='text'
              value={comment}
              disabled={!token || sending}
              onChange={(e) => { setComment(e.target.value || '') }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    disabled={!token || sending}
                    onClick={handleSend}
                    edge="end"
                  >
                    {sending ? <HourglassBottom /> : <Send />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </S.PostCommentsForm>
          <S.PostComments>
            {comments.length > 0 ?
              comments.map((comment) => (
                <S.PostComment key={comment.id}>
                  <Tooltip title={comment.author}>
                    <S.PostCommentAvatar
                      sx={{
                        backgroundImage: `url('https://source.boringavatars.com/marble/120/colors=${generateUniqueGradient(comment.author)}')`,
                        backgroundSize: 'cover',
                        color: '#fff',
                      }}
                    >
                      {comment.author.trim().includes(" ") ? comment.author.trim().split(' ').reduce((acc, name) => acc + name[0].toUpperCase(), '') : comment.author.trim()[0]}
                    </S.PostCommentAvatar>
                  </Tooltip>
                  <S.PostCommentContent>
                    <S.PostCommentText variant='body1'>
                      {comment.content}
                    </S.PostCommentText>
                    <S.PostCommentSubtext variant='subtitle2'>
                      {new Date(comment.timestamp).toLocaleString('en-UK')}
                    </S.PostCommentSubtext>
                  </S.PostCommentContent>
                </S.PostComment>)) :
              <S.PostNoComments variant='h4'>{commentsLoading ? "Učitavam komentare..." : "Ovdje još nema komentara. Ostavite prvi!"}</S.PostNoComments>
            }
          </S.PostComments>
        </S.PostCommentsContainer>
      </S.PostContainer>
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

export default Post;