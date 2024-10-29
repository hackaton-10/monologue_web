import React from 'react';
import Main from 'components/Main';
import { styled } from 'styled-components';

const Home = () => {
  return (
    <StyledHome>
      <Main />
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled.div`
  display: flex;
`;
