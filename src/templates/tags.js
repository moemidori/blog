import React from "react"
import { Link, graphql } from "gatsby"
import moment from "moment"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Tags = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { totalCount } = data.allMarkdownRemark
  const posts = data.allMarkdownRemark.nodes
  const { tag } = pageContext

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title={`タグ: "${tag}" (0記事)`} />
        <p>該当するタグの投稿記事がありません。</p>
      </Layout>
    )
  }

  const tagHeader = `タグ: "${tag}" (${totalCount}記事)`
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={tagHeader} />
      <h1>{tagHeader}</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          const tags = post.frontmatter.tags

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>
                    {moment(post.frontmatter.date).format(
                      `YYYY年MM月DD日 HH:mm`
                    )}
                    &nbsp;&nbsp;
                    {tags &&
                      tags.length > 0 &&
                      tags.map(tag => {
                        return (
                        <React.Fragment key={tag}>
                              &nbsp;&nbsp;
                          <Link to={`/tags/${kebabCase(tag)}/`} itemProp="url">
                            {tag}
                          </Link>
                       </React.Fragment>
                        )
                      })}
                  </small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date
          title
          description
          tags
        }
      }
    }
  }
`