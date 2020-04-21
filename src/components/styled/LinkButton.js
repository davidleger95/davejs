import { Link } from "gatsby"
import styled from "styled-components"

const LinkButton = styled(Link)`
  display: block;
  margin-top: 0.75rem;
  padding: 1em 1.5em;
  color: var(--background-color);
  font-weight: 600;
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;
  text-decoration: none;
  background-color: var(--text-color);
  border-radius: 0.25rem;
  transition: transform 100ms ease-in-out;

  &:hover {
    transform: scale(1.025);
  }
`

export default LinkButton
