import styles from '../styles/Dotted.module.css'

export default function HeroLink({children}) {
  return (
    <div className={`${styles.dotted}`}>
      HII - {children}
    </div>
  )
}