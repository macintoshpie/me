import Layout from '../components/layout'
import Dotted from '../components/dotted'
import styles from '../styles/about.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  return (
    <Layout>
      <section className={styles.aboutContainer}>
        <h1>about</h1>
        <div className={styles.aboutHeader}>
          <Dotted>ted <Image
            src="/images/me-circle.png"
            width={100}
            height={100}
            alt="circle me"/> ted</Dotted>
        </div>
        <div>
          <ul>
            <li><h2>video art</h2></li>
            <li><h2>climbing</h2></li>
            <li><h2>biking</h2></li>
            <li><h2>music</h2></li>
            <li><h2>i like the <Link href="/cool-sites">internet</Link></h2></li>
          </ul>
          <iframe style={{'max-width': '100%'}} width="560" height="315" src="https://www.youtube.com/embed/LuvEgPW8Ujw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </section>
    </Layout>
  )
}