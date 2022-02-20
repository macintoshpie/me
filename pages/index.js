import Link from 'next/link'

import styles from '../styles/Home.module.css'
import styles2 from '../styles/Dotted.module.css'
import { getSortedPostsData } from '../lib/posts'
import Dotted from '../components/dotted'
import Layout from '../components/layout'
import HeroLink from '../components/HeroLink'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    } 
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home={true}>
        <section className={styles.container}>
          <h3 className={styles.bigLink}>~ building the future at <Dotted><a href="https://replit.com" target="_blank" rel="noopener noreferrer">replit</a></Dotted></h3>
          <h3 className={styles.bigLink}>
            ~ sometimes I <Dotted><Link href="/personal-projects"><a>make things</a></Link></Dotted>
          </h3>
          <h3 className={styles.bigLink}>
            ~ sometimes I <Dotted><Link href="/blog"><a>write</a></Link></Dotted> and give <Dotted><Link href="/talks"><a>talks</a></Link></Dotted>
          </h3>
          <h3 className={styles.bigLink}>
            ~ my <Dotted><Link href="/resume"><a>resume</a></Link></Dotted>
          </h3>
          <h3 className={styles.bigLink}>
            ~ other things <Dotted><Link href="/about"><a>about me</a></Link></Dotted>
          </h3>
        </section>
    </Layout>
  )
}
