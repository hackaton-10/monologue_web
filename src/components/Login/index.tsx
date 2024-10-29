import React from 'react';
import { styled } from 'styled-components';

const Login = () => {
  return <StyledLogin></StyledLogin>;
};

export default Login;

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
