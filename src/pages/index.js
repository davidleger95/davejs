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
  // const siteTitle = data.site.siteMetadata.title
  const { lead } = data.home

  return (
    <Layout location={location}>
      <SEO />
      <Container>
        <Lead>{lead}</Lead>
        <Image fixed={data.avatar.childImageSharp.fixed} alt="David Leger" />
      </Container>
      <Section>
        <h2>A Bit About Me</h2>
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
      <Section>
        <h2>Projects</h2>
        <p>
          Sorry, I'm lazy. I haven't moved my projects over from my old website
          yet.
        </p>
        <p>
          Check out{" "}
          <a
            href="https://davidleger.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            my old website
          </a>{" "}
          for links to my projects.
        </p>
      </Section>
      <Section>
        <h2>Get in Touch</h2>
        <p></p>
        <p>
          <a href="mailto:davidleger95@me.com">Send me an email</a>, or{" "}
          <a
            href="https://twitter.com/_davejs"
            target="_blank"
            rel="noopener noreferrer"
          >
            say hi on Twitter
          </a>{" "}
          if you'd like to chat!
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
