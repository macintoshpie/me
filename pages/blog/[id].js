import Layout from '../../components/layout'
import TagList from '../../components/tagList'
import BackTo from '../../components/backTo'

import styles from './blogPost.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <BackTo text="Back to blog" url="/blog"/>
      <section className={styles.blogPost}>
        <h1>{postData.title}</h1>
        <div><TagList tags={postData.tags}/></div>
        {
          new Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          }).format(new Date(postData.date))
        }
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </section>
      <BackTo text="Back to blog" url="/blog"/>
    </Layout>
  )
}
