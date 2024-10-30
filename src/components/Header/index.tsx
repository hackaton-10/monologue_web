import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Logo from 'assets/logo.svg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledHeader isScrolled={isScrolled}>
      <LogoContainer
        onClick={() => {
          navigate('/');
        }}
        src={Logo}
        alt="로고"
      />
      <LoginButton>로그인</LoginButton>
    </StyledHeader>
  );
};

export default Header;

interface StyledHeaderProps {
  isScrolled: boolean;
}

const StyledHeader = styled.div<StyledHeaderProps>`
  position: sticky;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
  display: flex;
  padding: 24px 60px;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  background: ${({ isScrolled }) => (isScrolled ? 'rgba(0, 0, 0, 0.1)' : 'transparent')};
  backdrop-filter: ${({ isScrolled }) => (isScrolled ? 'blur(4px)' : 'none')};
  transition: background-color 0.3s ease;
`;

const LogoContainer = styled.img`
  height: 40px;
  z-index: 1;
  background-color: transparent;
  cursor: pointer;
`;

const LoginButton = styled.button`
  padding: 10px 36px;
  border: none;
  color: white;
  background-color: black;
  border-radius: 20px;
  cursor: pointer;
`;
