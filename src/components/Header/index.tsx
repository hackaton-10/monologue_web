import React from 'react';
import { styled } from 'styled-components';
import Logo from 'assets/logo.svg';

const Header = () => {
  return (
    <StyledHeader>
      <LogoContainer src={Logo} alt="로고" />
      <LoginButton>로그인</LoginButton>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  display: flex;
  padding: 24px 60px;
  background-color: transparent;
  justify-content: space-between;
`;

const LogoContainer = styled.img``;

const LoginButton = styled.button`
  padding: 10px 36px;
  border: none;
  color: white;
  background-color: black;
  border-radius: 20px;
  cursor: pointer;
`;
