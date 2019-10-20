import React from "react"
import { useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import Link from "./styled/Link"

import "../global.css"

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(auto, 640px) 1fr;
  grid-template-areas:
    "header header header"
    "left content right"
    "footer footer footer";
`

const Header = styled.header`
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
`

const Content = styled.main`
  grid-area: content;
`

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
    query NavQuery {
      logoLight: file(absolutePath: { regex: "/davejs-logo-dark.webp/" }) {
        childImageSharp {
          fixed(width: 92, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      logoDark: file(absolutePath: { regex: "/davejs-logo-white.webp/" }) {
        childImageSharp {
          fixed(width: 92, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <h1>
        {/* <Link to={`/`}> */}
        <div data-theme="light">
          <Image fixed={data.logoLight.childImageSharp.fixed} alt={title} />
        </div>
        <div data-theme="dark">
          <Image fixed={data.logoDark.childImageSharp.fixed} alt={title} />
        </div>
        {/* </Link> */}
      </h1>
    )
  } else {
    header = (
      <h3>
        <Link to={`/`}>{title}</Link>
      </h3>
    )
  }
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
      <Footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </Footer>
    </Container>
  )
}

export default Layout
