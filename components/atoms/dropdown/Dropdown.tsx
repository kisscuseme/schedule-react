import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import { DropdownProps } from "./dropdown.props";
import { defaultStyle, sizeStyles } from './dropdown.styles';
import { css } from '@emotion/react';

/**
 * 기본 드롭다운 컴포넌트
 */
export const Dropdown = ({
  size = "medium",
  backgroundColor,
  color,
  initText,
  id,
  items,
  ...props
}: DropdownProps) => {
  const _color = color ? color : '#1e1e1e';
  const _backgroundColor = backgroundColor ? backgroundColor : '#ffffff';

  const colorStyle = css`color: ${_color}`;
  const backgroundStyle = css`background-color: ${_backgroundColor}`;
  const sizeStyle = css`${sizeStyles[size]}`;
  const hoverStyle = css`&:hover {color: ${_backgroundColor}; background-color: ${_color}}`;

  const primaryStyle = css`
    --bs-btn-color: ${_color};
    --bs-btn-bg: ${_backgroundColor};
    --bs-btn-border-color: ${_backgroundColor};
    --bs-btn-hover-color: ${_color};
    --bs-btn-hover-bg: ${_backgroundColor};
    --bs-btn-hover-border-color: ${_backgroundColor};
    --bs-btn-focus-shadow-rgb: 49,132,253;
    --bs-btn-active-color: ${_color};
    --bs-btn-active-bg: ${_backgroundColor};
    --bs-btn-active-border-color: ${_backgroundColor};
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: ${_color};
    --bs-btn-disabled-bg: ${_backgroundColor};
    --bs-btn-disabled-border-color: ${_backgroundColor};
  `;

    const dropdownMenuStyle = css`
      --bs-dropdown-link-active-color: ${_color};
      --bs-dropdown-link-active-bg: ${_backgroundColor};
    `;

  return (
    <BootstrapDropdown {...props}>
      <BootstrapDropdown.Toggle
        variant="primary"
        id={id}
        css={css([defaultStyle, colorStyle, backgroundStyle, sizeStyle, hoverStyle, primaryStyle])}
      >
        {initText}
      </BootstrapDropdown.Toggle>

      <BootstrapDropdown.Menu css={css(sizeStyle, dropdownMenuStyle)}>
        {items.map(item => <BootstrapDropdown.Item href={item["href"]} key={item["key"]} eventKey={item["key"]}>{item["label"]}</BootstrapDropdown.Item>)}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
};
