import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  padding: 0.15em;
  font-weight: 600;
  text-decoration: inherit;

  .text {
    position: relative;
    margin-left: 0.25rem;
  }

  .text::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    display: block;

    height: 2px;
    background-color: var(--primary-color);
    transform: scale3d(0, 1, 1);
    transform-origin: bottom;
    opacity: 0.6;
    transition: transform 100ms ease-in-out;
    content: '';
  }

  &:hover,
  &:focus {
    outline: none;
    .text::after {
      transform: scale3d(1, 1, 1);
    }
  }

  &[aria-current='page'] .text::after {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }
`;

export default StyledLink;
