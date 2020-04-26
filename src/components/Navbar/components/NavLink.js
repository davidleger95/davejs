import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: grid;
  grid-auto-flow: column;
  gap: 0.75em;
  align-items: center;
  padding: 0.5em 0.75em;
  color: inherit;
  font-size: 0.8rem;
  text-decoration: none;
  background: #fff0;
  border-radius: 0.25rem;
  transition: background-color 100ms ease-in-out;

  &[aria-current='page'] {
    background-color: #fff1;
  }

  .icon {
    margin-right: -0.25em;
    font-size: 1.35em;
    line-height: 1;
  }

  @media (max-width: 700px) {
    grid-auto-flow: row;
    gap: 0.25rem;
    justify-items: center;
    padding: 0.5rem;

    .text {
      font-size: 0.5rem;
    }
  }

  &:hover,
  &:focus {
    .icon {
      animation: 1000ms ease-in-out infinite alternate wiggle;
    }
  }

  @keyframes wiggle {
    0% {
      transform: rotateZ(0deg) scale(1);
    }
    40% {
      transform: rotateZ(-5deg) scale(1.02);
    }
    60% {
      transform: rotateZ(8deg) scale(1.05);
    }
    80% {
      transform: rotateZ(-10deg) scale(1.09);
    }
    100% {
      transform: rotateZ(10deg) scale(1.15);
    }
  }
`;

const NavLink = ({ icon, children, ...rest }) => {
  return (
    <StyledLink {...rest}>
      <span role="img" aria-label="" className="icon">
        {icon}
      </span>
      <span className="text">{children}</span>
    </StyledLink>
  );
};

export default NavLink;
