import React from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';
import styled from 'styled-components';

import { TagList, Tag } from '../../components/styled/Tag';

import Bio from '../../components/bio';
import Layout from '../../components/layout';
import SEO from '../../components/seo';

const Section = styled.section``;

export const List = styled.div`
  display: grid;
  grid-gap: 3rem;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const LinkBlock = styled(Link)`
  text-decoration: none;

  p {
    align-self: start;
    margin: 0;
    font-size: 0.9em;
  }

  &:hover {
    transform: scale(1.025);
  }
`;

const HeroImage = styled(Image)`
  grid-row: 1 / span 4;
  width: 100%;
  object-fit: cover;
`;

const Post = styled.article`
  display: grid;
  gap: 1rem;

  @media (min-width: 550px) {
    grid-template-rows: repeat(auto-fill, auto);
    grid-template-columns: ${props => (props.featured ? '1fr' : '13rem 1fr')};
    gap: 0.5rem 1rem;
    justify-items: start;
  }

  ${HeroImage} {
    height: ${props => (props.featured ? 'auto' : '7rem')};

    @media (max-width: 550px) {
      height: auto;
      min-height: 12rem;
    }
  }
`;

const Title = styled.h3`
  margin: 0;
`;
const StyledDate = styled.small`
  font-size: 0.8em;
  opacity: 0.75;
`;
const Excerpt = styled.p`
  font-size: 1em;
  opacity: 0.75;
`;

export const BlogPost = ({ node, i }) => {
  const title = node.frontmatter.title || node.fields.slug;

  const image = node.frontmatter.heroImage.img;
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
  );
};

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Blog" />
      <Bio />
      <Section>
        <h2>Latest Posts</h2>
        <List>
          {posts.map(({ node }, i) => (
            <BlogPost node={node} i={i} key={node.fields.slug} />
          ))}
        </List>
      </Section>
    </Layout>
  );
};

export default BlogIndex;

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
`;
