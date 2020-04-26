import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

const useLogo = () => {
  const data = useStaticQuery(graphql`
    query LogoQuery {
      logo: file(absolutePath: { regex: "/davejs-logo.png/" }) {
        childImageSharp {
          fluid(maxHeight: 36) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return data.logo.childImageSharp.fluid;
};

const LogoWrapper = styled.h1`
  margin: 0;
  line-height: 1;

  a {
    display: block;
    padding: 0.25rem;

    > div {
      width: 4rem;
      height: auto;
      margin: auto;
    }
  }

  @media (max-width: 700px) {
    a {
      padding: 0.5rem;
      background: #fff0;
      border-radius: 0.25rem;
      > div {
        width: 3.5rem;
      }

      &[aria-current='page'] {
        background-color: #fff1;
      }
    }
  }
`;

const BrandLink = () => {
  const logo = useLogo();

  return (
    <LogoWrapper>
      <Link to="/">
        <Image className="img" fluid={logo} alt="dave.js" />
      </Link>
    </LogoWrapper>
  );
};

export default BrandLink;
