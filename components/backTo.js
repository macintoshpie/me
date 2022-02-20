import Link from 'next/link'

import styles from './backTo.module.css'

export default function BackTo({text, url}) {
  return (
    <div className={styles.backTo}>
      <Link href={url}>
        <a>← {text}</a>
      </Link>
    </div>
  )
}