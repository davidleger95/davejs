import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import accent from "../components/davejs-lead-accent.png"

const Container = styled.main`
  margin: 20vh 0;
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 100px;
  align-items: center;
`

const Lead = styled.p`
  position: relative;
  margin: 0;
  font-size: 1.2em;

  &::before {
    --size: 1.2em;
    --offset: calc(-0.6 * var(--size));

    display: block;
    background-image: url(${accent});
    background-size: contain;
    background-repeat: no-repeat;
    content: "";
    height: var(--size);
    width: var(--size);
    position: absolute;
    top: var(--offset);
    left: var(--offset);
  }
`

const HomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { lead } = data.home

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Container>
        <Lead>{lead}</Lead>
        <Image fixed={data.avatar.childImageSharp.fixed} alt="David Leger" />
      </Container>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query HOME_PAGE {
    site {
      siteMetadata {
        title
      }
    }
    avatar: file(absolutePath: { regex: "/davejs-profile.png/" }) {
      childImageSharp {
        fixed(width: 100, height: 100) {
          ...GatsbyImageSharpFixed
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
  }
`
