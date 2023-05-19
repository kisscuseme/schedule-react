import { Dropdown as BootstrapDropdown } from 'react-bootstrap';
import { DropdownProps } from "./dropdown.props";
import { defaultStyle, sizeStyles } from './dropdown.styles';
import { css } from '@emotion/react';
import { useState } from 'react';

/**
 * 기본 드롭다운 컴포넌트
 */
export const Dropdown = ({
  size = "large",
  backgroundColor = "transparent",
  color = "#1e1e1e",
  initText,
  id,
  items,
  align,
  itemAlign = 'end',
  onClickItemHandler,
  title,
  ...props
}: DropdownProps) => {
  const [selectedText, setSelectedText] = useState(initText);
  const parentStyle = `
    ${align === "center" ? "width:100%;text-align:center;" : ("float: " + align)}
  `;

  const customStyle = `
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: ${backgroundColor === 'transparent'?'#ffffff':backgroundColor};
        background-color: ${color};
      }
    }
    ${sizeStyles[size]}
  `;

  const primaryStyle = `
    --bs-btn-color: ${color};
    --bs-btn-bg: ${backgroundColor};
    --bs-btn-border-color: ${backgroundColor};
    --bs-btn-hover-color: ${color};
    --bs-btn-hover-bg: ${backgroundColor};
    --bs-btn-hover-border-color: ${backgroundColor};
    --bs-btn-focus-shadow-rgb: 49,132,253;
    --bs-btn-active-color: ${color};
    --bs-btn-active-bg: ${backgroundColor};
    --bs-btn-active-border-color: ${backgroundColor};
    --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    --bs-btn-disabled-color: ${color};
    --bs-btn-disabled-bg: ${backgroundColor};
    --bs-btn-disabled-border-color: ${backgroundColor};  
  `;

  const dropdownMenuStyle = `
    --bs-dropdown-link-active-color: ${color};
    --bs-dropdown-link-active-bg: ${backgroundColor};
    ${sizeStyles[size]}
  `;

  return (
    <BootstrapDropdown css={css(parentStyle)} align={itemAlign} {...props}>
      <span css={css("vertical-align: middle;")}>{title}</span>
      <BootstrapDropdown.Toggle
        variant="primary"
        id={id}
        css={css([defaultStyle, customStyle, primaryStyle])}
      >
        {selectedText}
      </BootstrapDropdown.Toggle>

      <BootstrapDropdown.Menu css={css(dropdownMenuStyle)}>
        {items.map(item =>
          <BootstrapDropdown.Item
            href={item["href"]}
            key={item["key"]}
            eventKey={item["key"]}
            onClick={() => {
              setSelectedText(item["label"]);
              onClickItemHandler(item["key"]);
            }}
          >
            {item["label"]}
          </BootstrapDropdown.Item>
        )}
      </BootstrapDropdown.Menu>
    </BootstrapDropdown>
  );
};
