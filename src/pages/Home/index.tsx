import React from 'react';
import Main from 'components/Main';
import { styled } from 'styled-components';
import Example from 'components/Example';
import List from 'components/List';

const Home = () => {
  return (
    <StyledHome>
      <Main />
      <Example />
      <List />
    </StyledHome>
  );
};

export default Home;

const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
`;
