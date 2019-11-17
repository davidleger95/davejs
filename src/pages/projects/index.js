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
`

const Project = styled.li`
  display: grid;
  grid-template-columns: 15rem 1fr;
  grid-template-rows: repeat(auto-fill, auto);
  grid-gap: 0.5rem 1rem;
`

const Title = styled.h2`
  font-family: inherit;
  margin: 0;
`
const Description = styled.p`
  margin: 0;
`
const CTA = styled.a.attrs({ rel: "noopener noreferrer", target: "_blank" })``
const Thumbnail = styled.img`
  width: 100%;
  grid-row: 1 / span 4;
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
              <Thumbnail src={image.publicURL} />
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
