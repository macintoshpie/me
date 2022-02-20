import styles from './tag.module.css'

export default function Tag({ children }) {
  return (
    <span className={`${styles.tag}`}>{children}</span>
  )
}