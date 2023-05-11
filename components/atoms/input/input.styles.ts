export const defaultStyle = `
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
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
  font-weight: 550;
  border: none;
  color: #9e9e9e;
  background-color: transparent;
  z-index: 99999;
  margin-left: -20px;
  &:hover {
    color: #6e6e6e;
  }
`;