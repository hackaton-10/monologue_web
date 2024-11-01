import React, { useState, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import font from '../../styles/font';
import MakingFrame from 'assets/MakingFrame.svg';
import { getUser } from 'apis/gets';

const Main = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        setIsLogin(data.data.name);
      } catch {}
    };
    fetchUser();
  }, [location]);

  return (
    <StyledMain>
      <TitleContainer>
        <Title>
          AI
          <br />
          FRAME
          <br />
          OPEN !
        </Title>
        <ButtonContainer
          onClick={() => {
            navigate('/Frame');
          }}
        >
          {isLogin && <MakingFrameButton src={MakingFrame} alt="프레임 만들러가기"></MakingFrameButton>}
        </ButtonContainer>
      </TitleContainer>
      <ContentContainer>
        추후 @photoism_behind 계정에서 특별한 추억을 만나보세요 !
        <br />
        <br />
        해당 프레임은 일반 포토이즘 박스, 컬러드 매장에서만 촬영이 가능하며, 호텔 및 쇼핑몰
        <br />
        등의 팝업 매장은 제외됩니다.
      </ContentContainer>
    </StyledMain>
  );
};

export default Main;

const StyledMain = styled.div`
  display: flex;
  padding: 24px 60px;
  background-color: transparent;
  flex-direction: column;
  gap: 28px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  ${font.title}
`;

const ButtonContainer = styled.div``;

const MakingFrameButton = styled.img`
  padding-top: 160px;
  padding-right: 300px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  ${font.p1}
  display: flex;
  gap: 40px;
`;
