import React, { useState } from 'react';
import styled from 'styled-components';
import color from 'styles/color';
import font from 'styles/font';

interface ColorBoxProps {
  bgColor: string;
  onClick: () => void;
}

interface FrameProps {
  bgColor: string;
  imageUrl?: string;
}

const Frame = () => {
  const [color, setColor] = useState<string>('#ffffff');
  const [image, setImage] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if (window.confirm('이미지를 삭제하시겠습니까?')) {
      setImage('');
    }
  };

  return (
    <StyledFrame>
      <EditContainer>
        <FrameColorLayout>
          <Title>프레임 꾸미기</Title>
          <ColorPalette>
            <GradientColor />
            <ColorBox bgColor="#FFFFFF" onClick={() => setColor('#FFFFFF')} />
            <ColorBox bgColor="#E5E5E5" onClick={() => setColor('#E5E5E5')} />
            <ColorBox bgColor="#808080" onClick={() => setColor('#808080')} />
            <ColorBox bgColor="#4D4D4D" onClick={() => setColor('#4D4D4D')} />
            <ColorBox bgColor="#000000" onClick={() => setColor('#000000')} />
            <ColorBox bgColor="#000000" onClick={() => setColor('#000000')} />
            <ColorBox bgColor="#FF0000" onClick={() => setColor('#FF0000')} />
            <ColorBox bgColor="#0000FF" onClick={() => setColor('#0000FF')} />
          </ColorPalette>
        </FrameColorLayout>
        {image ? (
          <ResetButton onClick={handleReset}>새로운 사진 넣기</ResetButton>
        ) : (
          <FileInputWrapper>
            <PlaceholderText>
              여기에 이미지를 드롭하거나 드래그하니다
              <br />
              파일을 선택하세요
            </PlaceholderText>
            <FileInputContainer htmlFor="file">
              <FileInputText>파일 업로드하기</FileInputText>
            </FileInputContainer>
            <FileInput type="file" accept="image/*" id="file" onChange={handleFileChange} />
          </FileInputWrapper>
        )}
      </EditContainer>
      <PreviewContainer>
        <FrameContainer bgColor={color} imageUrl={image}></FrameContainer>
      </PreviewContainer>
    </StyledFrame>
  );
};

export default Frame;

const StyledFrame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-left: 60px;
  padding-right: 60px;
  border-top: 1px solid black;
`;

const EditContainer = styled.div`
  width: 24vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 1px solid ${color.black};
  padding-right: 60px;
  padding-top: 20px;
  gap: 24%;
`;

const FrameColorLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  ${font.p5}
  display:flex;
  border: 1px solid black;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  padding: 14px;
`;

const ColorPalette = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
`;

const GradientColor = styled.div`
  width: 112px;
  height: 112px;
  background: linear-gradient(to right, #037215, #0f97ff, #023dec, #ff0033);
  cursor: pointer;
  border: 1px solid ${color.black};
  border-radius: 4px;
`;

const ColorBox = styled.div<ColorBoxProps>`
  width: 112px;
  height: 112px;
  background-color: ${(props: { bgColor: string }) => props.bgColor};
  cursor: pointer;
  border: 1px solid ${color.black};
  border-radius: 4px;
`;

const FileInputWrapper = styled.div`
  width: 98%;
  height: 20%;
  display: flex;
  background-color: ${color.white};
  text-align: center;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  flex-direction: column;
  gap: 24px;
`;

const PlaceholderText = styled.p`
  background-color: transparent;
`;

const FileInputContainer = styled.label`
  width: 150px;
  height: 30px;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 4px;
  background-color: ${color.gray200};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

const FileInputText = styled.div`
  background-color: transparent;
`;

const FileInput = styled.input`
  display: none;
  background-color: transparent;
`;

const ResetButton = styled.button`
  width: 100%;
  cursor: pointer;
  border: 1px solid ${color.black};
  padding: 8px;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 232px;
  height: 696px;
  justify-content: center;
  align-items: center;
`;

const FrameContainer = styled.div<FrameProps>`
  width: 100%;
  height: 160px;
  background-color: ${(props: { bgColor: string }) => props.bgColor};
  position: relative;
  overflow: hidden;

  ${(props) =>
    props.imageUrl &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${props.imageUrl});
      background-size: cover;
      background-position: center;
    }
  `}
`;
