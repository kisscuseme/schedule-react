export const defaultStyle = `
  border: 0;
  outline-width: 0;
  background-color: transparent;
  width: 100%;
`;

export const sizeStyles = {
  small: `
    font-size: 12px;
  `,
  medium: `
    font-size: 14px;
  `,
  large: `
    font-size: 16px;
  `
}

export const innerBtnStyle = `
  position: absolute;
  font-weight: 700;
  border: none;
  color: #9e9e9e;
  background-color: transparent;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: #6e6e6e;
    }
  }
`;