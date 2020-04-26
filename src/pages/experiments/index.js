import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import { TagList, Tag } from '../../components/styled/Tag';

const Section = styled.section`
  margin: 5vh 0;
`;

const ProjectList = styled.ul`
  display: grid;
  grid-gap: 4rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Project = styled.li`
  display: grid;
  grid-gap: 1rem;
  align-items: start;

  @media (min-width: 550px) {
    grid-gap: 0.5rem 2rem;
    grid-template-rows: repeat(auto-fill, auto);
    grid-template-columns: 16rem 1fr;
    justify-items: start;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-family: inherit;
`;
const Description = styled.p`
  margin: 0;
`;
const CTA = styled.a.attrs({ rel: 'noopener noreferrer', target: '_blank' })`
  display: block;
  margin-top: 0.75rem;
  padding: 1em 1.5em;
  color: var(--background-color);
  font-weight: 600;
  font-size: 0.8rem;
  font-style: italic;
  text-align: center;
  text-decoration: none;
  background-color: var(--text-color);
  border-radius: 0.25rem;
  transition: transform 100ms ease-in-out;

  &:hover {
    transform: scale(1.025);
  }
`;

const ImageContainer = styled.div`
  grid-row: 1 / span 4;
  align-self: start;
  height: 50vw;
  border-radius: 0.5rem;

  @media (min-width: 550px) {
    height: 9rem;
  }
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HomePage = ({ data, location }) => {
  const { projects } = data.page;

  return (
    <Layout location={location}>
      <SEO />
      <Section>
        <h1>
          <span role="img" aria-label="">
            🧪
          </span>{' '}
          Experiments
        </h1>
        <hr />
        <ProjectList>
          {projects.map(({ title, description, url, tags, image }) => (
            <Project key={url}>
              <ImageContainer>
                <Thumbnail src={image.publicURL} loading="lazy" />
              </ImageContainer>
              <Title>{title}</Title>
              <Description>{description}</Description>
              <TagList>
                {tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </TagList>
              <CTA href={url}>Check it out!</CTA>
            </Project>
          ))}
        </ProjectList>
      </Section>
    </Layout>
  );
};

export default HomePage;

export const pageQuery = graphql`
  query PROJECTS_PAGE {
    site {
      siteMetadata {
        title
      }
    }
    page: pagesYaml(title: { eq: "projects" }) {
      id
      title
      projects {
        title
        description
        url
        tags
        image {
          publicURL
        }
      }
    }
  }
`;
