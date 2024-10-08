import Image from 'next/image'

import styles from '../styles/projects.module.css'
import Layout from '../components/layout'
import Tag from '../components/tag'

const coolLinks = [
  {
    name: 'Hundred Rabbits',
    url: 'https://100r.co/'
  },
  {
    name: 'Stephen Malinowski',
    url: 'http://www.musanim.com/all/'
  },
  {
    name: 'Molly Soda',
    url: 'https://mollysoda.exposed/'
  },
  {
    name: 'BeerXML',
    url: 'http://www.beerxml.com/',
  },
]

function CoolLink({name, url}) {
  return (
      <li>
        <a href={url}>{name}</a>
      </li>
  )
}

export default function Projects() {

  return (
    <Layout>
      <section>
        <h1>cool sites</h1>
        <ul>
        {coolLinks.map((p, i) => <CoolLink key={i} {...p}/>)}
        </ul>
      </section>
    </Layout>
  )
}