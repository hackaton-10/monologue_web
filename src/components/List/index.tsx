import React from 'react';
import styled from 'styled-components';
import color from 'styles/color';
import font from 'styles/font';

const items = [
  '#Flower',
  '#Butterfly',
  '#Vintage Camera',
  '#Polaroid',
  '#Starry Night',
  '#Sunset Glow',
  '#Ocean Waves',
  '#Rainbow',
  '#Sparkles',
  '#Abstract Shapes',
];

const List = () => {
  return (
    <StyledList>
      <Title>/ LIST</Title>
      <Divider />
      <MarqueeWrapper>
        <MarqueeContainer>
          {items.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
          {items.map((item, index) => (
            <ListItem key={`${index}-duplicate`}>{item}</ListItem>
          ))}
        </MarqueeContainer>
      </MarqueeWrapper>
    </StyledList>
  );
};

export default List;

const StyledList = styled.div`
  display: flex;
  padding: 24px 60px;
  flex-direction: column;
  gap: 8px;
`;

const Title = styled.div`
  ${font.p2};
`;

const Divider = styled.div`
  width: 100vw;
  border-top: 1px solid ${color.black};
`;

const MarqueeWrapper = styled.div`
  overflow: hidden;
  white-space: nowrap;
`;

const MarqueeContainer = styled.div`
  display: inline-flex;
  gap: 16px;
  animation: scroll 30s linear infinite;

  @keyframes scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const ListItem = styled.div`
  width: 100%;

  ${font.p2};
  display: inline-block;
`;
