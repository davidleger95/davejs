import styled from "styled-components"

export const Tag = styled.li`
  display: inline-block;
  font-family: inherit;
  background-color: #8884;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`

export const TagList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: inherit;
`
