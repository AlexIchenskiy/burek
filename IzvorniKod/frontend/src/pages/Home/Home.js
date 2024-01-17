import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import * as S from './HomeStyles';
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Alert, Snackbar } from '@mui/material';
import { getHueRotatedColor } from '../../util/colorUtil';
import colors from '../../assets/colors';

const Home = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [total, setTotal] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);

  const { token } = useAuth();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSnackbarOpen = (message) => {
    setSnackbarMessage(message)
    setOpenSnackbar(true);
  };

  const handleSearch = (page, searchText) => {
    setPostsLoading(true);

    axios.post(`${API_URL}/posts/getAll`, {
      title: searchText,
      page: page,
      category: category
    })
      .then((res) => {
        console.log(res);

        setPosts(res.data.articlePage);
        setTotal(res.data.totalPages);
      })
      .catch((err) => {
        handleSnackbarOpen("Dogodila se greška tijekom učitavanja članaka.");
        console.log(err);
      })
      .finally(() => setPostsLoading(false));
  }

  useEffect(() => {
    handleSearch(page, searchText, category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchText, category]);

  useEffect(() => {
    axios.get(`${API_URL}/posts/categories/getAll`)
      .then((res) => {
        console.log(res);

        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.log(err);
        handleSnackbarOpen('Dogodila se greška tijekom učitavanja kategorija.');
      });
  }, [token]);

  return (
    <>
      <Header isSearchVisible={true} onSearch={(searchText) => { setPage(1); setSearchText(searchText) }} />
      <S.HomeDataContainer>
        <S.HomeDataCategories>
          {categories.map((cat, index) => {
            return (
              <S.HomeDataCategory
                variant='h6'
                color={getHueRotatedColor(colors['hue-start'], index * 30)}
                sx={category === cat.name ? { border: `1px solid ${getHueRotatedColor(colors['hue-start'], index * 30)}` } : {}}
                onClick={() => {
                  setPage(1); category === cat.name ? setCategory(null) : setCategory(cat.name)
                }}
              >
                {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
              </S.HomeDataCategory>
            )
          })}
        </S.HomeDataCategories>
        <S.HomeDataPostsContainer>
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
          <S.HomeDataPaginationContainer>
            <S.HomeDataPaginationButton disabled={page === 1} variant='outlined' onClick={() => setPage(page - 1)}>
              Prethodna stranica
            </S.HomeDataPaginationButton>
            <S.HomeDataPaginationText>{`${posts.length === 0 ? 0 : page} / ${total}`}</S.HomeDataPaginationText>
            <S.HomeDataPaginationButton disabled={page >= total} variant='outlined' onClick={() => setPage(page + 1)}>
              Iduća stranica
            </S.HomeDataPaginationButton>
          </S.HomeDataPaginationContainer>
          {token &&
            <Link to="/editor">
              <S.HomeDataButton variant='outlined'>
                Nova objava
              </S.HomeDataButton>
            </Link>
          }
        </S.HomeDataPostsContainer>
        <div></div>
      </S.HomeDataContainer>
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

export default Home;