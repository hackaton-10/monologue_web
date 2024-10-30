import React from 'react';
import { styled } from 'styled-components';
import color from 'styles/color';
import font from 'styles/font';

interface Props {
  handleClose: () => void;
}

const Login = ({ handleClose }: Props) => {
  return (
    <LoginOverlay>
      <StyledLogin>
        <Title>[로그인]</Title>
        <DeleteContainer onClick={handleClose}>x</DeleteContainer>
        <InnerFrame></InnerFrame>
      </StyledLogin>
    </LoginOverlay>
  );
};

export default Login;

const LoginOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 40px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogin = styled.div`
  width: 32%;
  height: 40%;
  display: flex;
  flex-direction: column;
  padding: 20px 40px;
  gap: 10px;
  align-items: center;
`;

const Title = styled.div`
  ${font.p1}
`;

const DeleteContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
`;

const InnerFrame = styled.div`
  width: 108%;
  height: 100%;
  background-color: ${color.white};
  border: 1px solid black;
`;
