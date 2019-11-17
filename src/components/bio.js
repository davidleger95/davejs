/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 1rem;
  align-items: center;

  margin: 1.5rem 0;

  p {
    margin: 0;
  }
`

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
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <Container>
      <Image fixed={data.avatar.childImageSharp.fixed} alt={author} />
      <p>
        Written by <strong>{author}</strong>. I’m an artsy software engineer
        living in Halifax. I work at Manifold where I build API marketplaces.
        {` `}
        Follow me on:{" "}
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        ,{" "}
        <a
          href={`https://medium.com/@${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </a>
        ,{" "}
        <a
          href={`https://instagram.com/${social.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        .
      </p>
    </Container>
  )
}

export default Bio
