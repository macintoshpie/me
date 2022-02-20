import styles from './dotted.module.css'

export default function Dotted({ children }) {
  return (
    <span className={`${styles.dottedContainer}`}>
      <span className={styles.dottedContent}>
        {children}
      </span>
    </span>
  )
}