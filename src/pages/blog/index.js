import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"

import { TagList, Tag } from "../../components/styled/Tag"

import Bio from "../../components/bio"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Section = styled.section`
  margin: 5vh 0;
`

const List = styled.div`
  padding: 0;
  margin: 0;
  list-style: none;
  display: grid;
  grid-gap: 4rem;
`

const LinkBlock = styled(Link)`
  text-decoration: none;

  h4 {
    margin: 0;
  }

  p {
    margin: 0;
    align-self: start;
    font-size: 0.9em;
  }

  &:hover {
    transform: scale(1.025);
  }
`

const Post = styled.article`
  display: grid;
  grid-gap: 1rem;

  @media (min-width: 550px) {
    justify-items: start;
    grid-gap: 0.5rem 2rem;
    grid-template-columns: ${props => (props.featured ? "1fr" : "16rem 1fr")};
    grid-template-rows: repeat(auto-fill, auto);
  }
`

const HeroImage = styled(Image)`
  object-fit: cover;
  height: 30vw;
  grid-row: 1 / span 4;
  width: 100%;

  @media (min-width: 550px) {
    height: 9rem;
  }
`

const Title = styled.h3`
  margin: 0;
`
const StyledDate = styled.small`
  opacity: 0.75;
  font-size: 0.8em;
`
const Excerpt = styled.p`
  opacity: 0.75;
  font-size: 1em;
`

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Blog" />
      <Bio />
      <Section>
        <h2>Latest Posts</h2>
        <List>
          {posts.map(({ node }, i) => {
            const title = node.frontmatter.title || node.fields.slug

            const image = node.frontmatter.heroImage.img
            return (
              <LinkBlock to={node.fields.slug}>
                <Post key={node.fields.slug} featured={i === 0}>
                  <HeroImage {...image.childImageSharp} />
                  <StyledDate>
                    {node.frontmatter.date} &bull; {node.timeToRead} min.
                  </StyledDate>
                  <Title>{title}</Title>
                  <Excerpt
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                  {node.frontmatter.tags && (
                    <TagList>
                      {node.frontmatter.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </TagList>
                  )}
                </Post>
              </LinkBlock>
            )
          })}
        </List>
      </Section>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { draft: { eq: false } } }
      sort: { fields: [frontmatter___date], order: DESC }
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
`
