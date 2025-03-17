/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTwitter,
  faBluesky
} from "@fortawesome/free-brands-svg-icons"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            bluesky
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <p>
          <Link to='/about/'>
            <strong>{author.name}</strong>
          </Link><br></br>
          {author?.summary || null}
          <br></br>
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`} target='_blank' rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
          </a>
          {` `}
          <a href={`https://${social?.bluesky || ``}.bsky.social`} target='_blank' rel="noopener noreferrer">
          <FontAwesomeIcon icon={faBluesky} />
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio
