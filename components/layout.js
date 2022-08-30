import Head from 'next/head'
import Image from 'next/image'
import homeStyles from '../styles/Home.module.css'
import dotStyles from '../styles/Dotted.module.css'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import BackTo from './backTo'

const name = 'ted summer'

function Strawberry() {
  return (
    <span style={{maxWidth: '1em', maxHeight: '1em', display: 'inline-block'}}>
      <Image src="/images/strawberry.svg" height={100} width={100} alt="strawberry"/>

    </span>
  )
}

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ted</title>
        <link rel="icon" href="/images/strawberry.svg" type="image/svg+xml"/>
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            name
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={name} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        { home ?
          <h1 style={{color: 'red'}}><Strawberry/> {name}</h1>
          :
          <Link href="/">
            <a>
              <h1><Strawberry/> {name}</h1>
            </a>
          </Link>
        }
      </header>
      <main>{children}</main>
      {!home && (
        <BackTo text="Back to home" url="/"/>
      )}
      <footer className={styles.footer}>
        <h5>
            <a href="mailto:ted.summer2@gmail.com">email</a>
        </h5>
        <h5>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/macintoshpie">github</a>
        </h5>
        <h5>
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/macint0shpie">twitter</a>
        </h5>
        <h5>
            <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/tedsummer">linkedin</a>
        </h5>
        <h5>
          <a target="_blank" rel="noopener noreferrer" href="https://replit.com/@replitted">follow me on replit</a>
        </h5>
      </footer>
    </div>
  )
}