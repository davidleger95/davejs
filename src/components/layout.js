import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

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
  padding-top: 6rem;
  column-gap: 1rem;

  @media (max-width: 700px) {
    padding-top: 4rem;
  }
`;

const Footer = styled.footer`
  grid-area: footer;
  margin-top: 2rem;
  padding: 2rem 1rem 2rem 1rem;
  color: var(--gray);
  font-size: 0.8rem;
  text-align: center;
  background-color: var(--dark);

  @media (max-width: 700px) {
    padding-bottom: 5.5rem;
  }
`;

const Content = styled.main`
  grid-area: content;
`;

const Layout = ({ children, ...props }) => {
  return (
    <Container>
      <Navbar />
      <Content {...props}>{children}</Content>
      <Footer>(c) {new Date().getFullYear()}, David Leger</Footer>
    </Container>
  );
};

export default Layout;
