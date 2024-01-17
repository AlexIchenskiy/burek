import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import * as S from './HomeStyles';
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Alert, Snackbar } from '@mui/material';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { token } = useAuth();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message)
    setOpenSnackbar(true);
  };

  const handleSearch = (searchText) => {
    setPostsLoading(true);

    axios.post(`${API_URL}/posts/getAll`, {
      title: searchText
    })
      .then((res) => {
        console.log(res);

        setPosts(res.data.articlePage);
      })
      .catch((err) => {
        handleSnackbarOpen("Dogodila se greška tijekom učitavanja članaka.");
        console.log(err);
      })
      .finally(() => setPostsLoading(false));
  }

  useEffect(() => {
    setPostsLoading(true);

    axios.post(`${API_URL}/posts/getAll`, {})
      .then((res) => {
        console.log(res);

        setPosts(res.data.articlePage);
      })
      .catch((err) => {
        handleSnackbarOpen("Dogodila se greška tijekom učitavanja članaka.");
        console.log(err);
      })
      .finally(() => setPostsLoading(false));
  }, []);

  return (
    <>
      <Header isSearchVisible={true} onSearch={handleSearch} />
      <S.HomeDataContainer>
        <S.HomeDataPosts>
          {posts.length === 0 ?
            <S.HomeDataNoPosts variant='h3'>
              {postsLoading ? "Učitavam članke..." : "Ovdje još nema članaka :("}
            </S.HomeDataNoPosts>
            :
            posts.map((post) => (
              <S.HomeDataPost key={post.id} id={post.id}>
                <S.HomeDataPostData>
                  <S.HomeDataPostTitle>
                    <S.HomeDataPostTitleLink to={`/post/${post.id}`}>
                      {post.title}
                    </S.HomeDataPostTitleLink>
                  </S.HomeDataPostTitle>
                  <S.HomeDataPostSubtitle>
                    <div>{new Date(post.datePublished).toLocaleString('en-UK')}</div>
                    <div>{`by `}<Link to={`/profile/${post.authorid}`}>{post.author}</Link></div>
                  </S.HomeDataPostSubtitle>
                </S.HomeDataPostData>
              </S.HomeDataPost>
            ))}
        </S.HomeDataPosts>
        {token &&
          <Link to="/editor">
            <S.HomeDataButton variant='outlined'>
              Nova objava
            </S.HomeDataButton>
          </Link>
        }
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="error">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </S.HomeDataContainer>
    </>
  )
}

export default Home;