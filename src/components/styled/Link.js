import { Link } from "gatsby"
import styled from "styled-components"

const StyledLink = styled(Link)`
  @keyframes wiggle {
    0% {
      transform: scaleX(1);
    }
    10% {
      transform: scaleX(3);
    }
    20% {
      transform: scaleX(2);
    }
    30% {
      transform: scaleX(5);
    }
    40% {
      transform: scaleX(1);
    }
    50% {
      transform: scaleX(4);
    }
    60% {
      transform: scaleX(3);
    }
    70% {
      transform: scaleX(7);
    }
    80% {
      transform: scaleX(4);
    }
    90% {
      transform: scaleX(5);
    }
    100% {
      transform: scaleX(1);
    }
  }

  text-decoration: inherit;

  &::after {
    margin-top: 5px;
    content: "";
    display: block;
    height: 2px;
    width: 10px;
    background-color: var(--primary-color);
    transform-origin: left;
    animation: none 5s ease-in-out 0s infinite alternate;
    /* doesn't work */
    transition: transform 200ms ease-in-out;
  }

  &:hover::after,
  &:focus::after {
    animation-name: wiggle;
  }

  &[aria-current="page"]::after {
    height: 4px;
    transform: scaleX(3);
    /* starts animation at 10% (scale 3) */
    animation-delay: -0.5s;
  }
`

export default StyledLink
