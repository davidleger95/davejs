import { Link } from "gatsby"
import styled from "styled-components"

const LinkButton = styled(Link)`
  background-color: var(--text-color);
  color: var(--background-color);
  padding: 1em 1.5em;
  text-decoration: none;
  text-align: center;
  display: block;
  margin-top: 0.75rem;
  font-style: italic;
  font-weight: 600;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  transition: transform 100ms ease-in-out;

  &:hover {
    transform: scale(1.025);
  }
`

export default LinkButton
