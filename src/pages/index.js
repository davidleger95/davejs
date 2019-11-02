import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

import accent from "../components/davejs-lead-accent.png"

const Container = styled.main`
  margin: 15vh 0;
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 1fr 100px;
  align-items: center;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

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

const Section = styled.section`
  margin: 15vh 0;
`

const HomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const { lead } = data.home

  return (
    <Layout location={location}>
      <SEO title={`${siteTitle} | Web Developer & Designer`} />
      <Container>
        <Lead>{lead}</Lead>
        <Image fixed={data.avatar.childImageSharp.fixed} alt="David Leger" />
      </Container>
      <Section>
        <h2>a bit about me</h2>
        <p>
          Hey! My name is David Leger and I'm a web developer living in Halifax,
          Nova Scotia. I go by dave.js because I love writing JavaScript! I love
          combining creativity with technical skills to design and build awesome
          experiences on the web.
        </p>
        <p>
          I currently work at{" "}
          <a
            href="https://manifold.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            Manifold
          </a>{" "}
          building marketplaces for cloud services and APIs.
        </p>
      </Section>
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
