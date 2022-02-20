import Image from 'next/image'

import styles from '../styles/projects.module.css'
import Layout from '../components/layout'
import Tag from '../components/tag'

const projects = [
  {
    title: 'liztz',
    inProgress: true,
    url: 'https://liztz.netlify.app/',
    tags: ['Vue', 'Netlify', 'AWS Lambda'],
    image: {
      url: '/images/liztz.png',
      width: 1074,
      height: 948
    },
    description: 'A lightweight note taking application centered around lists.'
  },
  {
    title: 'tasks',
    inProgress: true,
    url: 'https://liztz.netlify.app/',
    tags: ['Vue', 'Netlify', 'Data Visualization'],
    image: {
      url: '/images/tasks.png',
      width: 2870,
      height: 1576
    },
    description: 'A timeline estimator for multiple tasks. Uses Monte Carlo simulations to estimate when a collection of tasks will be complete. Mostly an exercise in creating fluid UI/UX.'
  },
  {
    title: 'GitHub Actions by Example',
    inProgress: true,
    url: 'https://www.actionsbyexample.com',
    tags: ['GitHub Actions', 'Golang'],
    image: {
      url: '/images/actionsbyexample.png',
      width: 1786,
      height: 1532
    },
    description: 'GitHub Actions by Example is an introduction to GitHub’s Actions and Workflows through annotated example YAML files. I wrote a custom HTML generator in Golang to generate the documentation from YAML files.'
  },
  {
    title: 'mxtp.xyz',
    inProgress: true,
    url: 'https://www.mxtp.xyz',
    tags: ['Netlify', 'JavaScript', 'Golang', 'AWS Lambda'],
    image: {
      url: '/images/mxtp.png',
      width: 1346,
      height: 1244
    },
    description: 'A game where players build themed music playlists with friends. Had some fun writing a custom router in Golang.'
  },
  {
    title: 'convoh',
    inProgress: false,
    url: 'https://convoh.netlify.app/',
    tags: ['JavaScript'],
    image: {
      url: '/images/convoh.png',
      width: 1552,
      height: 896
    },
    description: 'A tool to have conversations with yourself.'
  },
  {
    title: 'freedb.me',
    inProgress: false,
    url: 'https://www.freedb.me/',
    tags: ['Golang', 'sqlite'],
    image: {
      url: '/images/freedb.png',
      width: 1686,
      height: 1306
    },
    description: 'Creating and maintaining databases for toy projects is a pain. freedb.me is a (fugly) free service for creating sqlite databases and querying them through HTTP requests.'
  },
  {
    title: 'jot',
    inProgress: false,
    url: 'https://j0t.netlify.app/',
    tags: ['Vue'],
    image: {
      url: '/images/jot.png',
      width: 1138,
      height: 878
    },
    description: 'Post-it note taking and reminders app.'
  },
  {
    title: 'pixel synth',
    inProgress: true,
    url: 'http://pix-synth.herokuapp.com/',
    tags: ['JavaScript', 'C++'],
    image: {
      url: '/images/pixsynth.png',
      width: 1534,
      height: 1532
    },
    description: 'A simple video synth. Horrible UI, but it works! Written both for the browser as well as native app using OpenFrameworks.'
  },
  {
    title: '@minimazesolver',
    inProgress: false,
    url: 'https://twitter.com/minimazesolver/with_replies?lang=en',
    tags: ['python'],
    image: {
      url: '/images/minimazesolver.png',
      width: 1188,
      height: 1194
    },
    description: 'Twitter bot which solves another Twitter bot’s ASCII mazes.'
  },
  {
    title: 'pentaku js',
    inProgress: false,
    url: 'https://pentaku.herokuapp.com/',
    tags: ['JavaScript', 'HTML Canvas'],
    image: {
      url: '/images/pentaku.png',
      width: 1290,
      height: 1462
    },
    description: 'Play against a friend or naive bots in pentago, gomoku, and other grid based games.'
  },
]

function Project({title, inProgress, url, tags, image, description}) {
  return (
    <div className={styles.projectContainer}>
      <h2>
        {inProgress ? '🏗 ' : ''}
        <a href={url}>{title}</a>
      </h2>
      <p>{tags.map((t, i) => [i > 0 && ", ", <Tag key={i}>{t}</Tag>])}</p>
      <p>{description}</p>
      <Image
        src={image.url}
        width={image.width}
        height={image.height}
        alt={title}
      />
    </div>
  )
}

export default function Projects() {

  return (
    <Layout>
      <section>
        <h1>personal projects</h1>
        {projects.map((p, i) => <Project key={i} {...p}/>)}
      </section>
    </Layout>
  )
}