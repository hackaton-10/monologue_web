import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import { toast } from 'react-toastify';
import color from 'styles/color';
import font from 'styles/font';
import { postImg } from 'apis/posts';
import Logo from 'assets/logo.svg';
import FrameInfo from 'components/FrameInfo';

interface ColorBoxProps {
  bgColor: string;
  onClick: () => void;
}

interface FrameProps {
  bgColor: string;
  imageUrl: string;
}

interface Sticker {
  src: string;
  width?: number;
  height?: number;
  x: number;
  y: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

const Frame = () => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [image, setImage] = useState<string>('');
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [visible, setVisible] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      toast('파일 크기는 5MB를 초과할 수 없습니다.');
      return false;
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast('JPG, PNG, GIF 형식만 지원합니다.');
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result && typeof e.target.result === 'string') {
          setImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStickerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      const reader = new FileReader();
      reader.onloadend = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (result && typeof result === 'string') {
          setStickers((prevStickers) => [...prevStickers, { src: result, x: 0, y: 0 }]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if (window.confirm('이미지를 삭제하시겠습니까?')) {
      setImage('');
      setStickers([]);
    }
  };

  const handleStickerLoad = (event: React.SyntheticEvent<HTMLImageElement>, index: number) => {
    const img = event.currentTarget;
    setStickers((prevStickers) =>
      prevStickers.map((sticker, i) =>
        i === index ? { ...sticker, width: img.naturalWidth, height: img.naturalHeight } : sticker,
      ),
    );
  };

  const handleStickerDrag = (index: number, data: { x: number; y: number }) => {
    setStickers((prevStickers) =>
      prevStickers.map((sticker, i) => (i === index ? { ...sticker, x: data.x, y: data.y } : sticker)),
    );
  };

  const handleDeleteSticker = (index: number) => {
    setStickers((prevStickers) => prevStickers.filter((_, i) => i !== index));
  };

  const handleCompleteImg = async () => {
    showLoginModal();
    if (!frameRef.current) {
      toast('프레임을 찾을 수 없습니다.');
      return;
    }

    setIsUploading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = frameRef.current.offsetWidth;
      canvas.height = frameRef.current.offsetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas context를 생성할 수 없습니다.');
      }

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (image) {
        const img = new Image();
        img.src = image;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      }

      for (const sticker of stickers) {
        const img = new Image();
        img.src = sticker.src;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        ctx.drawImage(img, sticker.x, sticker.y, 96, 96);
      }

      const imageData = canvas.toDataURL('image/png');
      const base64 = imageData.replace(/^data:image\/png;base64,/, '');
      const response = await postImg(base64);

      if (response.success) {
        toast('이미지가 성공적으로 업로드되었습니다.');
      } else {
        throw new Error(response.message || '이미지 업로드에 실패했습니다.');
      }
    } catch (error) {
      console.error('이미지 처리 중 에러:', error);
      toast('이미지 처리 중 문제가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const showLoginModal = () => {
    setVisible(true);
  };

  const closeLoginModal = () => {
    setVisible(false);
  };

  return (
    <StyledFrame>
      <EditContainer>
        <FrameColorLayout>
          <Title>프레임 꾸미기</Title>
          <ColorPalette>
            <GradientColor />
            <ColorBox bgColor="#FFFFFF" onClick={() => setBackgroundColor('#FFFFFF')} />
            <ColorBox bgColor="#E5E5E5" onClick={() => setBackgroundColor('#E5E5E5')} />
            <ColorBox bgColor="#808080" onClick={() => setBackgroundColor('#808080')} />
            <ColorBox bgColor="#4D4D4D" onClick={() => setBackgroundColor('#4D4D4D')} />
            <ColorBox bgColor="#343434" onClick={() => setBackgroundColor('#343434')} />
            <ColorBox bgColor="#000000" onClick={() => setBackgroundColor('#000000')} />
            <ColorBox bgColor="#FF0000" onClick={() => setBackgroundColor('#FF0000')} />
            <ColorBox bgColor="#0000FF" onClick={() => setBackgroundColor('#0000FF')} />
          </ColorPalette>
          <StickerContainer htmlFor="sticker">
            <FileInputText>스티커 업로드하기</FileInputText>
          </StickerContainer>
          <FileInput type="file" accept="image/*" id="sticker" onChange={handleStickerUpload} disabled={isUploading} />
        </FrameColorLayout>
        {image ? (
          <ResetButton onClick={handleReset} disabled={isUploading}>
            새로운 사진 넣기
          </ResetButton>
        ) : (
          <FileInputWrapper>
            <PlaceholderText>
              여기에 이미지를 드롭하거나
              <br />
              드래그하여 파일을 선택하세요
            </PlaceholderText>
            <FileInputContainer htmlFor="file">
              <FileInputText>파일 업로드하기</FileInputText>
            </FileInputContainer>
            <FileInput type="file" accept="image/*" id="file" onChange={handleFileChange} disabled={isUploading} />
          </FileInputWrapper>
        )}
      </EditContainer>
      <PreviewContainer>
        <FrameContainer ref={frameRef} bgColor={backgroundColor} imageUrl={image}>
          <FrameLayout>
            <FrameImg />
            <FrameImg />
          </FrameLayout>
          <FrameLayout>
            <FrameImg />
            <FrameImg />
          </FrameLayout>
          <LogoContainer src={Logo} alt="로고" />
          {stickers.map((sticker, index) => (
            <Draggable
              key={index}
              position={{ x: sticker.x, y: sticker.y }}
              onStop={(_, data) => handleStickerDrag(index, data)}
              disabled={isUploading}
            >
              <StickerWrapper>
                <StickerContiner
                  src={sticker.src}
                  alt={`sticker-${index}`}
                  onLoad={(e) => handleStickerLoad(e, index)}
                />
                <DeleteButton onClick={() => handleDeleteSticker(index)} disabled={isUploading}>
                  X
                </DeleteButton>
              </StickerWrapper>
            </Draggable>
          ))}
        </FrameContainer>
        <ResultContainer onClick={handleCompleteImg} disabled={isUploading}>
          {isUploading ? '업로드 중...' : '프레임 정보 입력'}
        </ResultContainer>
      </PreviewContainer>
      {visible && <FrameInfo handleClose={closeLoginModal} />}
    </StyledFrame>
  );
};

export default Frame;

const StyledFrame = styled.div`
  width: 100%;
  height: 924px;
  display: flex;
  padding-left: 60px;
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
  gap: 16%;
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

const StickerContainer = styled.label`
  display: flex;
  gap: 24px;
  border: 1px solid black;
  height: 48px;
  border-radius: 4px;
  color: ${color.black};
  background-color: ${color.white};
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  height: 48px;
  border-radius: 4px;
  color: ${color.black};
  background-color: ${color.white};
  border: 1px solid black;
`;

const PreviewContainer = styled.div`
  height: 108%;
  width: 140%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${color.gray300};
`;

const FrameContainer = styled.div<FrameProps>`
  display: flex;
  flex-direction: column;
  width: 370px;
  height: 500px;
  background-color: ${(props: { bgColor: string }) => props.bgColor};
  position: relative;
  padding: 10px;
  align-items: center;
  gap: 10px;

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

const FrameLayout = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  background-color: transparent;
`;

const LogoContainer = styled.img`
  z-index: 1;
  background-color: transparent;
  margin-top: 15px;
`;

const FrameImg = styled.div`
  width: 170px;
  height: 210px;
  background-color: ${color.gray300};
  z-index: 1;
`;

const StickerContiner = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  cursor: grab;
  z-index: 10;
  background-color: transparent;
`;

const StickerWrapper = styled.div`
  position: relative;
  display: flex;
  gap: 4px;
  z-index: 100;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -12px;
  right: -120px;
  background: ${color.black};
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 3px 6px;
  z-index: 15;
  opacity: 0;
  transition: opacity 0.3s;

  &:hover {
    opacity: 1;
  }
`;

const ResultContainer = styled.button`
  padding: 10px 36px;
  border: none;
  color: white;
  background-color: black;
  border-radius: 20px;
  cursor: pointer;
`;
