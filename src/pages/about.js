// Step 1: Import React
import * as React from 'react'
import { graphql } from 'gatsby'
import { Link } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Step 2: Define your component
const IndexPage = ({data,location}) => {
const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title={siteTitle}>
    <Bio/>
    <main>
      <h1>About Me:</h1>
      <p>福岡生まれ・福岡育ちのデータアナリスト。<br></br>
      ソフトウェア開発やデータ分析を中心に、クライアントの要望に応じた柔軟なソリューションを提供しています<br></br>
      業務の効率化や自動化にも強みを持ち、幅広い技術領域に対応可能です。<br></br>
      趣味はゲームとおもちゃの収集。新しい技術を学ぶことにも常に興味を持っています。<br></br>
      </p>
      <h2>Skills:</h2>
      <p>HTML5 / JavaScript / Google Apps Script / SQL / etc.</p>
    </main>
    
    </Layout>
  )
}

// You'll learn about this in the next task, just copy it for now
export const Head = () => <Seo title="about" />

// Step 3: Export your component
export default IndexPage

export const pageQuery = graphql`
{
  site {
    siteMetadata {
      title
    }
  }
}`