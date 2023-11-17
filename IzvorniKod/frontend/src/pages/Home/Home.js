import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';

import * as S from './HomeStyles';
import axios from 'axios';
import { API_URL } from '../../assets/constants';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    axios.get(`${API_URL}/posts/getAll`)
      .then((res) => {
        console.log(res);

        setPosts(res.data);
      })
      .catch((err) => console.log(err))
  }, []);

  return (
    <>
      <Header isSearchVisible={false} />
      <S.HomeDataContainer>
        <S.HomeDataPosts>
          {posts.length === 0 ?
            <S.HomeDataNoPosts variant='h3'>
              Ovdje još nema objava :(
            </S.HomeDataNoPosts> :
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
        {token &&
          <Link to="/editor">
            <S.HomeDataButton variant='outlined'>
              Nova objava
            </S.HomeDataButton>
          </Link>
        }
      </S.HomeDataContainer>
    </>
  )
}

export default Home;