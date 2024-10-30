import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import color from 'styles/color';
import font from 'styles/font';

interface Props {
  handleClose: () => void;
}

const FrameInfo = ({ handleClose }: Props) => {
  const [name, setName] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleTagAddition = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      if (!tags.includes(tagInput)) {
        setTags([...tags, tagInput]);
      }
      setTagInput('');
    }
  };

  const handleTagDeletion = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleCompleteFrame = () => {
    console.log(tags, name);
  };

  return (
    <FrameInfoOverlay>
      <StyledFrameInfo>
        <Title>[프레임 정보]</Title>
        <DeleteContainer onClick={handleClose}>x</DeleteContainer>
        <InnerFrame>
          <InputLayout>
            <InputContainer>
              <NamingText>프레임 이름</NamingText>
              <Input type="text" placeholder="프레임 (1~20)" value={name} onChange={(e) => setName(e.target.value)} />
            </InputContainer>
            <TagContainer>
              <InputContainer>
                <NamingText>태그</NamingText>
                <Input
                  type="text"
                  placeholder="태그 (영어) 입력 후 Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagAddition}
                />
              </InputContainer>
              <TagList>
                {tags.map((tag, index) => (
                  <Tag key={index}>
                    {tag}
                    <TagDeleteButton onClick={() => handleTagDeletion(tag)}>x</TagDeleteButton>
                  </Tag>
                ))}
              </TagList>
            </TagContainer>
          </InputLayout>
          <FrameInfoButton onClick={handleCompleteFrame}>완성하기</FrameInfoButton>
        </InnerFrame>
      </StyledFrameInfo>
    </FrameInfoOverlay>
  );
};

export default FrameInfo;

const FrameInfoOverlay = styled.div`
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
  z-index: 110;
`;

const StyledFrameInfo = styled.div`
  position: relative;
  width: 32%;
  height: 48%;
  display: flex;
  flex-direction: column;
  padding: 30px 40px 10px 40px;
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
  gap: 12px;
  justify-content: space-between;
  padding: 56px 80px 40px 80px;
  align-items: center;
`;

const InputLayout = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-direction: column;
  background-color: transparent;
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
  background-color: transparent;
`;

const TagContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  background-color: transparent;
  flex-direction: column;
`;

const Input = styled.input`
  ${font.p2}
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  background-color: transparent;
`;

const FrameInfoButton = styled.button`
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

const TagList = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  background-color: transparent;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 14px;
  color: ${color.black};
  border: 2px solid ${color.black};
  background-color: transparent;
`;

const TagDeleteButton = styled.button`
  margin-left: 4px;
  background: none;
  border: none;
  color: ${color.black};
  cursor: pointer;
  font-size: 12px;
  padding: 0;
`;
