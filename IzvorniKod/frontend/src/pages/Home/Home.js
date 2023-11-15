import Header from '../../components/Header/Header';

import * as S from './HomeStyles';

const Home = () => {
  return (
    <>
      <Header isSearchVisible={false} />
      <S.HomeDataContainer>
        <S.HomeDataPosts>
          {/* TODO: add fetched post blocks */}
        </S.HomeDataPosts>
      </S.HomeDataContainer>
    </>
  )
}

export default Home;