import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-weight: 600;
  text-decoration: inherit;

  .text {
    position: relative;
    margin-left: 0.15rem;
    padding: 0.15em;
  }

  .text::after {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--primary-color);
    transform: scale3d(0, 0.1, 1);
    transform-origin: bottom;
    opacity: 0.5;
    transition: transform 100ms ease-in-out;
    content: '';
  }

  &:hover,
  &:focus {
    outline: none;
    .text::after {
      transform: scale3d(0.9, 0.1, 1);
    }
  }

  &[aria-current='page'] .text::after {
    transform: scale3d(1, 1, 1);
  }
`;

export default StyledLink;
