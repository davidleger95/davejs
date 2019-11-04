import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Link from "../../components/styled/Link"
import { TagList, Tag } from "../../components/styled/Tag"

import Bio from "../../components/bio"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Post = styled.article`
  margin: 1rem 0;
  padding: 1rem 0;
  border-top: 1px solid #fff2;
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
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <Post key={node.fields.slug}>
            <header>
              <StyledDate>{node.frontmatter.date}</StyledDate>
              <Title>
                <Link to={node.fields.slug}>{title}</Link>
              </Title>
            </header>
            <section>
              <Excerpt
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
            {node.frontmatter.tags && (
              <section>
                <TagList>
                  {node.frontmatter.tags.map(tag => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </TagList>
              </section>
            )}
          </Post>
        )
      })}
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
