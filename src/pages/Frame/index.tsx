import React from 'react';
import { styled } from 'styled-components';

const Frame = () => {
  return <StyledFrame></StyledFrame>;
};

export default Frame;

const StyledFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
