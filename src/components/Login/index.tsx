import React, { useState } from 'react';
import { styled } from 'styled-components';
import color from 'styles/color';
import font from 'styles/font';

interface Props {
  handleClose: () => void;
}

const Login = ({ handleClose }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    handleClose();
  };

  return (
    <LoginOverlay>
      <StyledLogin>
        <Title>[로그인]</Title>
        <DeleteContainer onClick={handleClose}>x</DeleteContainer>
        <InnerFrame>
          <InputContainer>
            <NamingText>아이디</NamingText>
            <Input type="email" placeholder="아이디" value={email} onChange={(e) => setEmail(e.target.value)} />
          </InputContainer>
          <InputContainer>
            <NamingText>비밀번호</NamingText>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputContainer>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
        </InnerFrame>
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
  position: relative;
  width: 32%;
  height: 48%;
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
  ${font.p1}
  position: absolute;
  top: 12px;
  right: 24px;
  cursor: pointer;
`;

const InnerFrame = styled.div`
  display: flex;
  width: 108%;
  height: 86%;
  background-color: ${color.white};
  border: 1px solid black;
  flex-direction: column;
  gap: 16px;
  padding: 80px 80px;
  align-items: center;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  flex-direction: column;
  background-color: transparent;
`;

const NamingText = styled.div`
  ${font.p2}
  background-color:transparent;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  background-color: transparent;
`;

const LoginButton = styled.button`
  ${font.p2}
  width: 60%;
  padding: 12px 60px;
  background-color: ${color.black};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
`;
