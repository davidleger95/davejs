import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import styled from "styled-components"
import { TagList, Tag } from "../components/styled/Tag"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Header = styled.header`
  display: grid;
  grid-gap: 1rem;
  margin-bottom: 2rem;
`

const HeroImage = styled.div`
  display: grid;
`

const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
`

const StyledDate = styled.small`
  opacity: 0.75;
`

const Content = styled.div`
  img {
    max-width: 100%;
  }

  table {
    border-collapse: collapse;
    min-width: 100%;
  }

  th,
  td {
    padding: 0.5em;
  }

  th {
    background-color: var(--text-color);
    color: var(--background-color);
  }

  td {
    border: 1px solid #8888;
    font-family: Roboto, sans-serif;
  }
`

const BottomNav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1.5rem;
  margin-top: 2.5rem;

  & [rel="next"] {
    text-align: right;
  }
`

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={`${post.frontmatter.title} by David Leger`}
        description={post.frontmatter.description || post.excerpt}
        meta={[
          ...(post.tags
            ? [
                {
                  property: "keywords",
                  content: post.tags.join(","),
                },
              ]
            : []),
          {
            property: "og:image",
            content: `https://davejs.dev${post.frontmatter.shareImage.src.fixed.src}`,
          },
          {
            property: "og:url",
            content: `https://davejs.dev${post.fields.slug}`,
          },
          {
            property: "twitter:image",
            content: `https://davejs.dev${post.frontmatter.shareImage.src.fixed.src}`,
          },
        ]}
      />
      <article>
        <Header>
          {post.frontmatter.heroImage && (
            <HeroImage>
              <Image
                fluid={post.frontmatter.heroImage.img.src.fluid}
                alt={post.frontmatter.heroImage.alt}
              />
            </HeroImage>
          )}
          <StyledDate>
            {post.frontmatter.date} &bull; {post.timeToRead} min.
          </StyledDate>
          <Title>{post.frontmatter.title}</Title>
          {post.frontmatter.tags && (
            <TagList>
              {post.frontmatter.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>
          )}
        </Header>
        <Content dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      {(previous || next) && (
        <BottomNav>
          {previous && (
            <Link to={previous.fields.slug} rel="prev">
              &lt;= {previous.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} =&gt;
            </Link>
          )}
        </BottomNav>
      )}
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        heroImage {
          img {
            src: childImageSharp {
              fluid(maxWidth: 640) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          alt
        }
        shareImage {
          src: childImageSharp {
            fixed(width: 1200) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
