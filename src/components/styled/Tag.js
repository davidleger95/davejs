import styled from "styled-components"

export const Tag = styled.li`
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-family: inherit;
  background-color: #8884;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`

export const TagList = styled.ul`
  margin: 0;
  padding: 0;
  font-family: inherit;
  list-style: none;
`
