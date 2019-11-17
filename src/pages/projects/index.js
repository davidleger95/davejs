import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Section = styled.section`
  margin: 15vh 0;
`

const HomePage = ({ data, location }) => {
  const { title } = data.page

  return (
    <Layout location={location}>
      <SEO />
      <Section>
        <h2>{title}</h2>
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
    }
  }
`
