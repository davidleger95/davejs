import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { TagList, Tag } from "../../components/styled/Tag"

const Section = styled.section`
  margin: 5vh 0;
`

const ProjectList = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  grid-gap: 4rem;
`

const Project = styled.li`
  display: grid;
  grid-gap: 1rem;
  align-items: start;

  @media (min-width: 550px) {
    justify-items: start;
    grid-gap: 0.5rem 2rem;
    grid-template-columns: 16rem 1fr;
    grid-template-rows: repeat(auto-fill, auto);
  }
`

const Title = styled.h2`
  font-family: inherit;
  margin: 0;
`
const Description = styled.p`
  margin: 0;
`
const CTA = styled.a.attrs({ rel: "noopener noreferrer", target: "_blank" })`
  background-color: var(--text-color);
  color: var(--background-color);
  padding: 1em 1.5em;
  text-decoration: none;
  text-align: center;
  display: block;
  margin-top: 0.75rem;
  font-style: italic;
  font-weight: 600;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  transition: transform 100ms ease-in-out;

  &:hover {
    transform: scale(1.025);
  }
`

const ImageContainer = styled.div`
  align-self: start;
  border-radius: 0.5rem;
  grid-row: 1 / span 4;
  height: 50vw;

  @media (min-width: 550px) {
    height: 9rem;
  }
`
const Thumbnail = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`

const HomePage = ({ data, location }) => {
  const { projects } = data.page

  return (
    <Layout location={location}>
      <SEO />
      <Section>
        <h1>Projects</h1>
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
  )
}

export default HomePage

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
`
