import React from 'react';
import styled from 'styled-components';
import BrandLink from './components/BrandLink';
import NavLink from './components/NavLink';
import ThemeToggle from './components/ThemeToggle';

const pages = [
  {
    icon: '🧪',
    path: '/experiments',
    name: 'Experiments',
  },
  {
    icon: '✏️',
    path: '/blog',
    name: 'Blog',
  },
];

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 99999;
  grid-column: 1 / -1;
  padding: 0.75rem 1.25rem;
  color: white;
  background: #001c;
  box-shadow: 0 0 1rem -0.75rem #0008;
  backdrop-filter: blur(1rem);

  @media (max-width: 700px) {
    position: fixed;
    top: initial;
    bottom: 0;
    padding: 0.5rem;
    padding-bottom: max(env(safe-area-inset-bottom), 0.5rem);
  }
`;

const Nav = styled.nav`
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  gap: 1rem;
  align-items: center;
  justify-content: start;
  margin: auto;

  @media (max-width: 700px) {
    grid-auto-columns: 1fr;
    gap: 0.25rem;
    justify-content: space-evenly;
    justify-items: stretch;
  }
`;

const Navbar = () => {
  return (
    <>
      <NavbarContainer>
        <Nav>
          <BrandLink />
          {pages.map(({ name, path, icon }) => (
            <NavLink to={path} icon={icon} key={path}>
              {name}
            </NavLink>
          ))}
        </Nav>
      </NavbarContainer>
      <ThemeToggle />
    </>
  );
};

export default Navbar;
