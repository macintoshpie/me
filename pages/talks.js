import Image from 'next/image'

import styles from '../styles/projects.module.css'
import Layout from '../components/layout'
import Tag from '../components/tag'

const talks = [
  {
    title: 'server-sent events',
    slidesUrl: 'https://docs.google.com/presentation/d/1i2vT6nMrRUsmFusH8HL-0fHZUEifyniL_8q0f0pBCBg/edit?usp=sharing',
    image: {
      url: '/images/sse.png',
      width: 1594,
      height: 1194
    },
    where: 'Devetry Lunch and Learn',
    when: 'September 2020',
    description: 'A brief introduction to server-sent events, when to use them and when not to use them.',
  },
  {
    title: 'schematron',
    slidesUrl: 'https://docs.google.com/presentation/d/16wpjtIqwqj0yagdQcObRzdDI6l_gYxCX/edit?usp=sharing&ouid=111583935946353067252&rtpof=true&sd=true',
    image: {
      url: '/images/schematron.png',
      width: 2868,
      height: 1448
    },
    where: 'IBPSA: Guidelines and Projects for Building Data Exchange Integrity',
    when: 'August 2021',
    description: 'Introduction to Schematron, a language for validating XML documents.',
  }
]

function Talk({title, slidesUrl, image, where, when, description}) {
  return (
    <div className={styles.projectContainer}>
      <h2>
        {title}
      </h2>
      <div style={{margin: 'auto'}}>
        <Image
          src={image.url}
          width={image.width}
          height={image.height}
          alt={title}
        />
      </div>
      <ul>
        <li><b>description</b>: {description}</li>
        <li><b>when</b>: {when}</li>
        <li><b>where</b>: {where}</li>
        <li><a rel="noreferrer noopener" target="_blank" href={slidesUrl}>view slides</a></li>
      </ul>
    </div>
  )
}

export default function Talks() {

  return (
    <Layout>
      <section>
        <h1>talks</h1>
        {talks.map((t, i) => <Talk key={i} {...t}/>)}
      </section>
    </Layout>
  )
}