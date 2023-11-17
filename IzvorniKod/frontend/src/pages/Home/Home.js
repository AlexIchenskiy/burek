import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import * as S from './HomeStyles';
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import { Typography } from '@mui/material';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/posts/getAll`).then((res) => {
      console.log(res);

      setPosts(res.data);
    })
  }, []);

  return (
    <>
      <Header isSearchVisible={false} />
      <S.HomeDataContainer>
        <S.HomeDataPosts>
          {posts.length === 0 ?
            <Typography variant='h3'>
              Ovdje još nema objava :(
            </Typography> :
            posts.map((post) => (
              <S.HomeDataPost key={post.id} id={post.id}>
                <S.HomeDataPostData>
                  <S.HomeDataPostTitle>
                    <S.HomeDataPostTitleLink to={`/post/${post.id}`}>
                      {post.title}
                    </S.HomeDataPostTitleLink>
                  </S.HomeDataPostTitle>
                  <S.HomeDataPostSubtitle>
                    {new Date(post.datePublished).toUTCString()}
                  </S.HomeDataPostSubtitle>
                </S.HomeDataPostData>
              </S.HomeDataPost>
            ))}
        </S.HomeDataPosts>
      </S.HomeDataContainer>
    </>
  )
}

export default Home;