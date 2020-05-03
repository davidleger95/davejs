/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

const Container = styled.section`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: auto 1fr;
  align-items: start;

  margin: 1.5rem 0;

  > div {
    display: grid;
    gap: 0.25rem;
  }

  h3 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/davejs-profile.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `);

  const { author, social } = data.site.siteMetadata;
  return (
    <Container>
      <Image fixed={data.avatar.childImageSharp.fixed} alt={author} />
      <div itemScope itemProp="author" itemType="https://schema.org/Person">
        <h3 itemProp="name">{author}</h3>
        <p itemProp="description">
          I’m an artsy software engineer living in Halifax, Canada. Enjoy my hot
          takes{' '}
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          and half-baked ideas{' '}
          <span role="img" aria-label="lightbulb">
            💡
          </span>
          .
        </p>
        <p>
          Follow me on:{' '}
          <span role="img" aria-label="">
            🐦
          </span>
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          ,{' '}
          <span role="img" aria-label="">
            📝
          </span>
          <a
            href={`https://medium.com/@${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Medium
          </a>
          ,{' '}
          <span role="img" aria-label="">
            📸
          </span>
          <a
            href={`https://instagram.com/${social.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
          .
        </p>
      </div>
    </Container>
  );
};

export default Bio;
