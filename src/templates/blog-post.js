import React from 'react';
import { Link, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';
import { TagList, Tag } from '../components/styled/Tag';
import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import IconLaunch from '@material-ui/icons/Launch';

const Header = styled.header`
  display: grid;
  grid-gap: 1rem;
  margin-bottom: 2rem;
`;

const HeroImage = styled.div`
  display: grid;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
`;

const StyledDate = styled.small`
  opacity: 0.75;
`;

const Content = styled.div`
  p,
  ul,
  li {
    font-size: 1.1em;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    line-height: 1.75;
  }

  blockquote p {
    color: var(--primary-color);
    font-size: 1.4em;
    font-family: inherit;
    font-style: italic;
  }

  img {
    max-width: 100%;
  }

  table {
    min-width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.5em;
  }

  th {
    color: var(--background-color);
    background-color: var(--text-color);
  }

  td {
    font-family: Roboto, sans-serif;
    border: 1px solid #8888;
  }
`;

const BottomNav = styled.nav`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  margin-top: 2.5rem;
`;

const NavLink = styled(Link)`
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 8rem auto;
  align-content: start;
  text-decoration: none;
  transition: transform 100ms ease-in-out;

  h4 {
    margin: 0;
  }

  p {
    align-self: start;
    margin: 0;
    font-size: 0.9em;
  }

  &:hover {
    transform: scale(1.025);
  }
`;

const Toast = styled.div`
  position: relative;
  margin: 2rem 0;
  padding: 1.25em;
  font-size: 0.8em;
  border-left: 0.25rem solid var(--text-color);

  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--text-color);
    opacity: 0.1;
    content: '';
    pointer-events: none;
  }

  p {
    margin: 0;
    font-family: inherit;
    font-style: italic;
  }
  a {
    text-decoration: none;

    &:hover {
      color: var(--primary-color);
    }

    & > *:first-child {
      text-decoration: underline;
    }
  }
`;

const CrossPost = ({ originName, canonicalUrl }) => (
  <Toast>
    <p itemProp="backstory">
      Cross-posted from {originName}.{' '}
      <a
        href={canonicalUrl}
        itemProp="url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>See the original post here.</span> <IconLaunch />
      </a>
    </p>
  </Toast>
);

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;

  const { crossPost } = post.frontmatter;

  return (
    <Layout>
      <SEO
        title={`${post.frontmatter.title} by David Leger`}
        description={post.frontmatter.description || post.excerpt}
        type="article"
        canonicalUrl={crossPost && crossPost.canonicalUrl}
        meta={[
          ...(post.tags
            ? [
                {
                  property: 'keywords',
                  content: post.tags.join(','),
                },
              ]
            : []),
          {
            property: 'og:image',
            content: `https://davejs.dev${post.frontmatter.shareImage.src.fixed.src}`,
          },
          {
            property: 'og:url',
            content: `https://davejs.dev${post.fields.slug}`,
          },
          {
            property: 'twitter:image',
            content: `https://davejs.dev${post.frontmatter.shareImage.src.fixed.src}`,
          },
        ]}
      />
      <article
        itemScope
        itemType="https://schema.org/BlogPosting"
        itemProp="blogPost"
      >
        <Header>
          {post.frontmatter.heroImage && (
            <HeroImage itemProp="image">
              <Image
                fluid={post.frontmatter.heroImage.img.src.fluid}
                alt={post.frontmatter.heroImage.alt}
              />
            </HeroImage>
          )}
          <StyledDate>
            <span itemProp="datePublished">{post.frontmatter.date}</span> &bull;{' '}
            {post.timeToRead} min.
          </StyledDate>
          <Title itemProp="headline">{post.frontmatter.title}</Title>
          {post.frontmatter.tags && (
            <TagList itemProp="keywords">
              {post.frontmatter.tags.map(tag => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagList>
          )}
        </Header>
        {crossPost && <CrossPost {...crossPost} />}
        <Content
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <h3>More Posts</h3>
      {(previous || next) && (
        <BottomNav>
          {next && (
            <NavLink to={next.fields.slug} rel="next">
              <Image fluid={next.frontmatter.heroImage.img.src.fluid} />
              <h4>{next.frontmatter.title}</h4>
              <p>{next.frontmatter.description}</p>
            </NavLink>
          )}
          {previous && (
            <NavLink to={previous.fields.slug} rel="prev">
              <Image fluid={previous.frontmatter.heroImage.img.src.fluid} />
              <h4>{previous.frontmatter.title}</h4>
              <p>{previous.frontmatter.description}</p>
            </NavLink>
          )}
        </BottomNav>
      )}
    </Layout>
  );
};

export default BlogPostTemplate;

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
        crossPost {
          originName
          canonicalUrl
        }
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
`;
