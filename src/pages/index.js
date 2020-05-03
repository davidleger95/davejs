import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';

import accent from '../components/davejs-lead-accent.png';
import LinkButton from '../components/styled/LinkButton';
import { List, BlogPost } from './blog';
import ContactForm from '../components/ContactForm';

const Container = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.75rem;
  align-items: center;
  margin: 15vh 0;

  .image {
    width: 150px;
    height: auto;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;

    .image {
      width: calc(100px + 15vw);
      margin-bottom: 2rem;
    }
  }
`;

const Lead = styled.p`
  position: relative;
  margin: 0;
  font-size: 1.3em;
  font-family: inherit;
  font-style: italic;

  @media (max-width: 840px) {
    margin-left: 0.5em;
  }

  &::before {
    --size: 1.2em;
    --offset: calc(-0.6 * var(--size));
    position: absolute;
    top: var(--offset);
    left: var(--offset);
    display: block;
    width: var(--size);
    height: var(--size);
    background-image: url(${accent});
    background-repeat: no-repeat;
    background-size: contain;
    content: '';
  }
`;

const Section = styled.section`
  margin: 10vh 0;
`;

const ProjectList = styled.ul`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));

  margin: 0;
  padding: 0;
  list-style: none;

  img {
    width: 100%;
    height: auto;
    min-height: 12rem;
    object-fit: cover;
  }
`;

const Project = styled.a`
  display: grid;
  grid-gap: 0.5rem;
  text-decoration: none;
  transition: transform 100ms ease-in-out;

  h3 {
    margin: 0;
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const BigLink = styled(LinkButton)`
  width: 20em;
  max-width: 100%;
  margin: 2rem auto;
`;

const HomePage = ({ data, location }) => {
  const { lead } = data.home;
  const { projects } = data.projects;

  return (
    <Layout>
      <SEO />
      <Container>
        <Lead>{lead}</Lead>
        <Image
          className="image"
          fluid={data.avatar.childImageSharp.fluid}
          alt="David Leger"
        />
      </Container>
      <hr />
      <Section>
        <h2>
          <span role="img" aria-label="">
            ✏️
          </span>{' '}
          Recent Posts
        </h2>
        <List>
          {data.blogPosts.edges.map(({ node }, i) => (
            <BlogPost node={node} i={i} key={node.fields.slug} />
          ))}
        </List>
        <BigLink to="/blog">All Posts</BigLink>
      </Section>
      <hr />
      <Section>
        <h2>
          <span role="img" aria-label="">
            🧪
          </span>{' '}
          Recent Experiments
        </h2>
        <ProjectList>
          {projects.slice(0, 3).map(({ title, url, image }) => (
            <li key={url}>
              <Project href={url}>
                <img src={image.publicURL} alt="" loading="lazy" />
                <h3>{title}</h3>
              </Project>
            </li>
          ))}
        </ProjectList>
        <BigLink to="/experiments">All Experiments</BigLink>
      </Section>
      <hr />
      <Section>
        <h2>
          <span role="img" aria-label="">
            👨‍💻
          </span>{' '}
          A Bit About Me
        </h2>
        <p>
          Hey! My name is David Leger and I'm a web developer living in Halifax,
          Nova Scotia. I go by dave.js because I love writing JavaScript (and
          there are three other people with my name at work)! I love combining
          creativity with technical skills to design and build awesome
          experiences on the web.
        </p>
        <p>
          I currently work at{' '}
          <a
            href="https://manifold.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            Manifold
          </a>{' '}
          building marketplaces for cloud services and APIs.
        </p>
      </Section>
      <hr />
      <Section>
        <h2>
          <span role="img" aria-label="mailbox">
            📬
          </span>{' '}
          Get in Touch
        </h2>
        <p>
          Would you like to work together? Just want to say hi? Either way, I'd
          love to hear from you! Just send me a message below and I'll get back
          to you.{' '}
          <span role="img" aria-label="smile">
            😊
          </span>
        </p>

        <ContactForm />
      </Section>
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query HOME_PAGE {
    site {
      siteMetadata {
        title
      }
    }
    avatar: file(absolutePath: { regex: "/davejs-profile.png/" }) {
      childImageSharp {
        fluid(maxWidth: 200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    home: pagesYaml(title: { eq: "home" }) {
      id
      title
      lead
      image {
        alt
      }
    }
    projects: pagesYaml(title: { eq: "projects" }) {
      projects {
        title
        url
        image {
          publicURL
        }
      }
    }
    blogPosts: allMarkdownRemark(
      filter: { frontmatter: { draft: { eq: false } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            heroImage {
              img {
                childImageSharp {
                  fluid(maxWidth: 640) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              alt
            }
          }
        }
      }
    }
  }
`;
