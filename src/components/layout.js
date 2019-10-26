import React from "react"
import { useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import Link from "./styled/Link"

import "../global.css"

const Container = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr minmax(auto, 640px) 1fr;
  grid-template-rows: auto 1fr auto;
  column-gap: 1rem;
  grid-template-areas:
    "header header header"
    "left content right"
    "footer footer footer";
`

const Header = styled.header`
  padding: 0 1rem;
  grid-area: header;
`

const Nav = styled.nav`
  display: grid;
  justify-content: start;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 2rem;
  max-width: 820px;
  margin: auto;
`

const Footer = styled.footer`
  grid-area: footer;
  padding: 1rem;
  font-size: 0.8rem;
  text-align: center;
  color: var(--gray);
  background-color: rgba(255, 255, 255, 0.05);
`

const Content = styled.main`
  grid-area: content;
`

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
    query NavQuery {
      logoLight: file(absolutePath: { regex: "/davejs-logo-dark.png/" }) {
        childImageSharp {
          fixed(width: 92, height: 50) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      logoDark: file(absolutePath: { regex: "/davejs-logo-white.png/" }) {
        childImageSharp {
          fixed(width: 92, height: 50) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  const header = (
    <h1>
      {/* <Link to={`/`}> */}
      {/* HACK: swap out logo for light/dark theme */}
      <picture data-theme="light">
        <Image fixed={data.logoLight.childImageSharp.fixed} alt={title} />
      </picture>
      <picture data-theme="dark">
        <Image fixed={data.logoDark.childImageSharp.fixed} alt={title} />
      </picture>
      {/* </Link> */}
    </h1>
  )
  return (
    <Container>
      <Header>
        <Nav>
          {header}
          <Link to="/">about me</Link>
          <Link to="/projects">projects</Link>
          <Link to="/blog">blog</Link>
        </Nav>
      </Header>
      <Content>{children}</Content>
      <Footer>(c) {new Date().getFullYear()}, David Leger</Footer>
    </Container>
  )
}

export default Layout
