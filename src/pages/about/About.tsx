import { forwardRef } from 'react'
import styles from './About.module.scss'

export const About = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div className={styles.about} ref={ref}>
            <h2 className={styles.aboutTitle}>
                {
                    "About".split("").map((char, i) => (
                        <span key={i}>{char}</span>
                    ))
                }
            </h2>
            <div className={styles.aboutContent}>
                <p className={styles.aboutText}>Rocktaves is one of the nation’s oldest semi-professional rock band competitions. We have hosted some of India’s premier bands such as 
                    <span> Indian Ocean</span>, 
                    <span> Parikrama</span>, 
                    <span> Them Clones</span>, 
                    <span> Euphoria</span> and 
                    <span> Anand Bhaskar </span> 
                    Collective — all of whom have graced our stage as some of our early participants.
                </p>
                <img className={styles.aboutImage} src="/images/about/drums.png" alt="About Rocktaves" />
            </div>
        </div>
    )
})