import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 999999;
  grid-column: 1 / -1;
  justify-self: end;
  padding: 1rem 1.5rem;

  @media (max-width: 700px) {
    position: absolute;
  }
`;

const StyledToggle = styled.button`
  position: relative;
  width: 2.25em;
  height: max-content;
  padding: 0.75em 0;
  font-size: 1.25rem;
  background: transparent;
  border: none;
  appearance: none;

  &:focus {
    outline: none;
    &::after {
      filter: drop-shadow(0 0 4px var(--primary-color));
    }
  }

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: inherit;
    height: 0.5em;
    background-color: #fff8;
    border-radius: 1em;
    transform: translate(0, -50%);
    transition: transform 100ms ease-in-out;
    content: '';
  }

  &::after {
    --moon: #0004;
    width: 1.25em;
    height: 1.25em;
    background-color: #fff;
    border-radius: 50%;
    box-shadow: 0 0 8px -4px var(--text-color), inset 0 0 0 4px #fff,
      inset -4px -2px 0 5px var(--moon);
  }

  &[aria-checked='true']::after {
    --moon: #cc990d;
    transform: translate(1em, -50%);
  }
`;

const ThemeToggle = () => {
  const defaultValue =
    typeof window !== 'undefined'
      ? window.document.body.getAttribute('data-color-scheme') === 'dark'
      : false;
  const [value, setValue] = useState(defaultValue);

  return (
    <ToggleWrapper>
      <StyledToggle
        type="button"
        role="toggle"
        aria-checked={value}
        aria-label="Theme Switcher"
        onClick={() => {
          setValue(oldValue => !oldValue);
          document.body.setAttribute(
            'data-color-scheme',
            !value ? 'dark' : 'light'
          );
          localStorage.setItem('color-scheme', !value ? 'dark' : 'light');
        }}
      />
    </ToggleWrapper>
  );
};

export default ThemeToggle;
