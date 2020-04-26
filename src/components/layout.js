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
  column-gap: 1rem;
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
    margin-bottom: 4.5rem;
  }
`;

const Content = styled.main`
  grid-area: content;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Navbar />
      <Content>{children}</Content>
      <Footer>(c) {new Date().getFullYear()}, David Leger</Footer>
    </Container>
  );
};

export default Layout;
