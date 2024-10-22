import { useEffect, useState } from 'react';
import { Editor as TextEditor, EditorState, convertFromRaw, ContentState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { EmailIcon, FacebookIcon, WhatsappIcon, LinkedinIcon } from 'react-share';

import Header from "../../components/Header/Header";

import * as S from "./PostStyles";
import "./DraftStyles.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL, PAGE_URL } from '../../assets/constants';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, InputLabel, Menu, MenuItem, OutlinedInput, Rating, Snackbar, TextField, Tooltip, Typography } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import { HourglassBottom, Send } from '@mui/icons-material';
import { validateFields } from '../../validators/validateFields';
import { validateComment } from '../../validators/validateComment';
import { roundToTwo } from '../../util/roundToTwo';
import generateUniqueGradient from '../../util/colorUtil';

const COPY_DEFAULT_TOOLTIP = 'Kopiraj';

const Post = () => {
  const navigate = useNavigate();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');
  const [authorid, setAuthorid] = useState(-1);
  const { id } = useParams();
  const [shareText, setShareText] = useState(`Pročitajte članak na ovom linku:\n${PAGE_URL}/post/${id}`);
  const [contentLoading, setContentLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const [user, setUser] = useState(null);
  const [rating, setRating] = useState(0.0);
  const [userRating, setUserRating] = useState(null);
  const [setting, setSetting] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [sending, setSending] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSnackbarInfo, setOpenSnackbarInfo] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarInfoMessage, setSnackbarInfoMessage] = useState("");
  const [isCommentModalOpened, setIsCommentModalOpened] = useState(false);

  const [isArticleModalOpened, setIsArticleModalOpened] = useState(false);
  const [reportedCommentId, setReportedCommentId] = useState(null);
  const [reportCommentValue, setReportCommentValue] = useState('');
  const [reportArticleValue, setReportArticleValue] = useState('');
  const [reportLoading, setReportLoading] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestedCommentId, setSuggestedCommentId] = useState(null);
  const [suggestCommentValue, setSuggestCommentValue] = useState('');
  const [suggestArticleValue, setSuggestArticleValue] = useState('');
  const [isCommentSuggestModalOpened, setIsCommentSuggestModalOpened] = useState(false);
  const [isArticleSuggestModalOpened, setIsArticleSuggestModalOpened] = useState(false);

  const [copyTooltip, setCopyTooltip] = useState(COPY_DEFAULT_TOOLTIP);

  const [anchorElComment, setAnchorElComment] = useState(null);
  const [anchorElArticle, setAnchorElArticle] = useState(null);

  const { token } = useAuth();

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

  const handleOpenCommentMenu = (event) => {
    setAnchorElComment(event.currentTarget);
  };

  const handleCloseCommentMenu = () => {
    setAnchorElComment(null);
  };

  const handleCommentModalOpen = (commentId) => {
    setReportedCommentId(commentId);
    setIsCommentModalOpened(true);
  };

  const handleCommentModalClose = () => {
    setReportedCommentId(null);
    setReportCommentValue('');
    setIsCommentModalOpened(false);
  };

  const handleOpenArticleMenu = (event) => {
    setAnchorElArticle(event.currentTarget);
  };

  const handleCloseArticleMenu = () => {
    setAnchorElArticle(null);
  };

  const handleCommentSuggestModalOpen = (commentId) => {
    setSuggestedCommentId(commentId);
    setIsCommentSuggestModalOpened(true);
  };

  const handleCommentSuggestModalClose = () => {
    setSuggestedCommentId(null);
    setSuggestCommentValue('');
    setIsCommentSuggestModalOpened(false);
  };

  const handleArticleModalOpen = () => {
    setIsArticleModalOpened(true);
  };

  const handleArticleModalClose = () => {
    setReportArticleValue('');
    setIsArticleModalOpened(false);
  };

  const handleArticleSuggestModalOpen = () => {
    setIsArticleSuggestModalOpened(true);
  };

  const handleArticleSuggestModalClose = () => {
    setSuggestArticleValue('');
    setIsArticleSuggestModalOpened(false);
  };

  const handleCommentReport = () => {
    if (reportCommentValue.length < 3) {
      handleSnackbarOpen('Razlog mora sadržavati više od tri znaka!');
      return;
    }

    setReportLoading(true);

    axios.post(`${API_URL}/notification/report/comment`, { id: reportedCommentId, reason: reportCommentValue }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => handleCommentModalClose())
      .catch((err) => {
        console.log(err);
        handleSnackbarOpen('Dogodila se greška tijekom prijavljivanja komentara.');
      })
      .finally(() => setReportLoading(false));
  }

  const handleArticleReport = () => {
    if (reportArticleValue.length < 3) {
      handleSnackbarOpen('Razlog mora sadržavati više od tri znaka!');
      return;
    }

    setReportLoading(true);

    axios.post(`${API_URL}/notification/report/article`, { id: id, reason: reportArticleValue }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => handleArticleModalClose())
      .catch((err) => {
        console.log(err);
        handleSnackbarOpen('Dogodila se greška tijekom prijavljivanja članka.');
      })
      .finally(() => setReportLoading(false));
  }

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
        axios.delete(`${API_URL}/posts/rating/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
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

          if (err.response && err.response.status === 418) {
            handleSnackbarOpen('Bannani ste na platformi InterFER te ne možete ostavljati komentare.');
          } else {
            handleSnackbarOpen('Dogodila se greška tijekom spremanja komentara.');
          }
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

  const handleCommentDelete = (id) => {
    axios.delete(`${API_URL}/comment/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        const tempComments = comments.filter((comment) => comment.id !== id);
        setComments(tempComments);
        handleCloseCommentMenu();
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          handleSnackbarOpen('Nemate ovlasti za brisanje ovog komentara.');
        } else {
          handleSnackbarOpen('Dogodila se greška tijekom brisanja komentara.');
        }

        handleCloseCommentMenu();
      });
  }

  const handleArticleDelete = () => {
    axios.delete(`${API_URL}/posts/delete/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.status === 401) {
          handleSnackbarOpen('Nemate ovlasti za brisanje ovog članka.');
        } else {
          handleSnackbarOpen('Dogodila se greška tijekom brisanja članka.');
        }

        handleCloseArticleMenu();
      });
  }

  const handleArticleRequestChange = () => {
    let data = {
      content: suggestArticleValue
    };

    if (suggestArticleValue.length < 3) {
      handleSnackbarOpen('Prijedlog mora sadržavati više od tri znaka!');
      return;
    }

    setSuggestLoading(true);

    axios.post(`${API_URL}/notification/requestChange/article/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setIsArticleSuggestModalOpened(false);
        handleSnackbarInfoOpen('Promjene su zatražene te je autoru ovog članka poslana odgovarajuća obavijest. Hvala!');
      })
      .catch((err) => {
        console.log(err);

        handleSnackbarOpen('Dogodila se greška tijekom predlaganja izmjena za članak.');
      })
      .finally(() => setSuggestLoading(false));
  }

  const handleCommentRequestChange = () => {
    let data = {
      content: suggestCommentValue
    };

    if (suggestCommentValue.length < 3) {
      handleSnackbarOpen('Prijedlog mora sadržavati više od tri znaka!');
      return;
    }

    setSuggestLoading(true);

    axios.post(`${API_URL}/notification/requestChange/comment/${suggestedCommentId}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(() => {
        setIsCommentSuggestModalOpened(false);
        handleSnackbarInfoOpen('Promjene su zatražene te je autoru ovog komentara poslana odgovarajuća obavijest. Hvala!');
      })
      .catch((err) => {
        console.log(err);

        handleSnackbarOpen('Dogodila se greška tijekom predlaganja izmjena za komentar.');
      })
      .finally(() => setSuggestLoading(false));
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
        setAuthorid(res.data.authorid);

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

  useEffect(() => {
    axios
      .get(`${API_URL}/user`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res);

        setUser(res.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  return (
    <>
      <Header isSearchVisible={false} />
      <S.PostContainer>
        <S.PostTextContainer>
          <S.PostTitleContainer>
            <S.PostTitleInput value={title} type="text" disableUnderline={true} placeholder={contentLoading ? 'Učitavam naslov...' : 'Ovdje još nema naslova :('} readOnly={true} />
            <S.PostCommentMenu onClick={handleOpenArticleMenu} />
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar-user-article"
              anchorEl={anchorElArticle}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElArticle)}
              onClose={handleCloseArticleMenu}
            >
              <MenuItem onClick={() => handleArticleDelete()}>Obriši članak</MenuItem>
              <MenuItem onClick={() => handleArticleModalOpen()}>Prijavi članak</MenuItem>
              {(user && (user.role === "MODERATOR" || user.role === "ADMIN")) &&
                <MenuItem onClick={() => handleArticleSuggestModalOpen()}>Predloži izmjene</MenuItem>
              }
              {((user && (user.role === "MODERATOR" || user.role === "ADMIN")) || (user && user.id === authorid)) &&
                <MenuItem onClick={() => navigate(`/editor/${id}`)}>Uredi članak</MenuItem>
              }
            </Menu>
          </S.PostTitleContainer>
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
            <InputLabel htmlFor="comment-input-post-form">Komentar</InputLabel>
            <OutlinedInput
              id="comment-input-post-form"
              type='text'
              value={comment}
              disabled={!token || sending}
              onChange={(e) => { setComment(e.target.value || '') }}
              multiline={true}
              onKeyDown={(event) => {
                event.stopPropagation();
                if (event.key === 'Enter') handleSend()
              }}
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
                      onClick={() => navigate(`/profile/${comment.authorId}`)}
                    >
                      {comment.author.trim().includes(" ") ? comment.author.trim().split(/(\s+)/).reduce((acc, name) => acc.trim() + name[0].toUpperCase(), '') : comment.author.trim()[0]}
                    </S.PostCommentAvatar>
                  </Tooltip>
                  <S.PostCommentContent>
                    <Typography variant='h6'>{comment.author}</Typography>
                    <S.PostCommentText variant='body1'>
                      {comment.content}
                    </S.PostCommentText>
                    <S.PostCommentSubtext variant='subtitle2'>
                      {new Date(comment.timestamp).toLocaleString('en-UK')}
                    </S.PostCommentSubtext>
                  </S.PostCommentContent>
                  {user !== null &&
                    <>
                      <S.PostCommentMenu onClick={handleOpenCommentMenu} />
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar-user"
                        anchorEl={anchorElComment}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElComment)}
                        onClose={handleCloseCommentMenu}
                      >
                        <MenuItem onClick={() => handleCommentDelete(comment.id)}>Obriši komentar</MenuItem>
                        <MenuItem onClick={() => handleCommentModalOpen(comment.id)}>Prijavi komentar</MenuItem>
                        {(user && (user.role === "MODERATOR" || user.role === "ADMIN")) &&
                          <MenuItem onClick={() => handleCommentSuggestModalOpen(comment.id)}>Predloži izmjene</MenuItem>
                        }
                      </Menu>
                    </>}
                </S.PostComment>))
              :
              <S.PostNoComments variant='h4'>{commentsLoading ? "Učitavam komentare..." : "Ovdje još nema komentara. Ostavite prvi!"}</S.PostNoComments>
            }
          </S.PostComments>
        </S.PostCommentsContainer>
      </S.PostContainer>
      <Dialog open={isCommentModalOpened} onClose={handleCommentModalClose}>
        <DialogTitle>Prijavljivanje komentara</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kako bi prijavili komentar, molimo Vas da navedete valjani razlog prijavljivanja.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="comment-report-reason"
            name="comment-report-reason"
            label="Razlog"
            value={reportCommentValue}
            onChange={(event) => setReportCommentValue(event.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCommentModalClose}>Odustani</Button>
          <Button color='error' onClick={handleCommentReport} disabled={reportLoading}>Prijavi</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isArticleModalOpened} onClose={handleCommentModalClose}>
        <DialogTitle>Prijavljivanje članka</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Kako bi prijavili članak, molimo Vas da navedete valjani razlog prijavljivanja.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="article-report-reason"
            name="article-report-reason"
            label="Razlog"
            value={reportArticleValue}
            onChange={(event) => setReportArticleValue(event.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleArticleModalClose}>Odustani</Button>
          <Button color='error' onClick={handleArticleReport} disabled={reportLoading}>Prijavi</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isCommentSuggestModalOpened} onClose={handleCommentSuggestModalClose}>
        <DialogTitle>Predlaganje izmjena komentaru</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Navedite izmjene koje želite predložiti za navedeni komentar.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="comment-suggestion"
            name="comment-suggestion"
            label="Razlog"
            value={suggestCommentValue}
            onChange={(event) => setSuggestCommentValue(event.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCommentSuggestModalClose}>Odustani</Button>
          <Button color='success' onClick={handleCommentRequestChange} disabled={suggestLoading}>Pošalji</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isArticleSuggestModalOpened} onClose={handleArticleSuggestModalClose}>
        <DialogTitle>Predlaganje izmjena članku</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Navedite izmjene koje želite predložiti za navedeni članak.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="article-suggestion"
            name="article-suggestion"
            label="Razlog"
            value={suggestArticleValue}
            onChange={(event) => setSuggestArticleValue(event.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleArticleSuggestModalClose}>Odustani</Button>
          <Button color='success' onClick={handleArticleRequestChange} disabled={suggestLoading}>Pošalji</Button>
        </DialogActions>
      </Dialog>
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

export default Post;