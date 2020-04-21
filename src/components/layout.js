import React from 'react';
import { useStaticQuery, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import StyledLink from './styled/Link';

import '../global.css';

const Container = styled.div`
  display: grid;
  grid-template-areas:
    'header header header'
    'left content right'
    'footer footer footer';
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr minmax(auto, 640px) 1fr;
  min-height: 100vh;
  column-gap: 1rem;
`;

const Header = styled.header`
  grid-area: header;
  padding: 0 1rem;
`;

const Nav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  align-items: center;
  justify-content: start;
  max-width: 820px;
  margin: auto;
`;

const Footer = styled.footer`
  grid-area: footer;
  margin-top: 2rem;
  padding: 1rem;
  color: var(--gray);
  font-size: 0.8rem;
  text-align: center;
  background-color: var(--dark);
`;

const Content = styled.main`
  grid-area: content;
`;

const Layout = ({ title, children }) => {
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
  `);

  const header = (
    <h1>
      <Link to={`/`}>
        {/* HACK: swap out logo for light/dark theme */}
        <picture data-theme="light">
          <Image fixed={data.logoLight.childImageSharp.fixed} alt={title} />
        </picture>
        <picture data-theme="dark">
          <Image fixed={data.logoDark.childImageSharp.fixed} alt={title} />
        </picture>
      </Link>
    </h1>
  );
  return (
    <Container>
      <Header>
        <Nav>
          {header}
          <StyledLink to="/experiments">
            <span role="img">🧪</span>
            <span class="text">Experiments</span>
          </StyledLink>
          <StyledLink to="/blog">
            <span role="img">✏️</span>
            <span class="text">Blog</span>
          </StyledLink>
        </Nav>
      </Header>
      <Content>{children}</Content>
      <Footer>(c) {new Date().getFullYear()}, David Leger</Footer>
    </Container>
  );
};

export default Layout;
