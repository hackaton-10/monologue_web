import React from 'react';
import { styled } from 'styled-components';
import color from 'styles/color';
import font from 'styles/font';

const contents = [
  {
    name: '해리포터',
    title: 'Harry Potter',
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
  {
    name: '곰돌이 푸',
    title: 'Winnie the Pooh',
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
  },
];

const Example = () => {
  return (
    <StyledExample>
      <Title>/ EXAMPLE</Title>
      <Divider />
      <ExampleContainer>
        {contents.map((content, index) => (
          <ContentBlock key={index}>
            <FrameContainer>
              <FrameName>[{content.name}]</FrameName>
              <InnerFrame />
            </FrameContainer>
            <FrameInfo>
              <FrameTitle>{content.title}</FrameTitle>
              <TextContent>{content.text}</TextContent>
            </FrameInfo>
          </ContentBlock>
        ))}
      </ExampleContainer>
    </StyledExample>
  );
};

export default Example;

const StyledExample = styled.div`
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

const ExampleContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;

  & > div:not(:last-child)::after {
    content: '';
    width: 1px;
    background-color: ${color.black};
    margin-left: 16px;
  }
`;

const ContentBlock = styled.div`
  width: 100%;
  height: 320px;
  padding-top: 16px;
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: flex-start;
`;

const FrameContainer = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  border: 2px solid black;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${color.gray300};
  gap: 6px;
`;

const FrameName = styled.div`
  ${font.p2}
  display: flex;
  color: ${color.black};
  background-color: transparent;
`;

const InnerFrame = styled.div`
  width: 96%;
  height: 84%;
  border: 1px solid black;
  display: flex;
`;

const FrameInfo = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 24px;
`;

const FrameTitle = styled.div`
  ${font.p3}
`;

const TextContent = styled.div`
  ${font.p4}
`;
