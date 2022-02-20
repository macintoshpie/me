import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/layout'
import TagList from '../../components/tagList'
import styles from './blogIndex.module.css'
import { getSortedPostsData } from '../../lib/posts'

function BlogCard({title, id, date, tags}) {
  return (
    <div className={styles.blogCard}>
      <h2><Link href={`/blog/${id}`}><a>{title}</a></Link></h2>
      <div>
        <TagList tags={tags}/>
      </div>
      {
        new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }).format(new Date(date))
      }
    </div>
  )
}

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
    <Layout>
      <section>
        <h1>blog</h1>
        <div>
          {allPostsData.map((p, i) => (
            <BlogCard key={i} {...p}/>
          ))}
        </div>
      </section>
    </Layout>
  )
}
