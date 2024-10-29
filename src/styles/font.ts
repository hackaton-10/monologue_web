const fontGenerator = (weight: number, size: number, lineHeight: number, letterSpacing: number) => `
    font-family: 'Pretendard-Regular';
    font-weight: ${weight};
    font-size: ${size}rem;
    line-height: ${lineHeight}%;
    letter-spacing: ${letterSpacing}px;
`;

const font = {
  title: fontGenerator(550, 10, 80, 0),

  p1: fontGenerator(600, 2.125, 140, 0.15),
};

export default font;
