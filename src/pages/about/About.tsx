import { forwardRef, useRef } from 'react'
import styles from './About.module.scss'
import { SplitText } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import gsap from "gsap";

export const About = forwardRef<HTMLDivElement>((_, ref) => {

    const contentRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        return
        SplitText.create(contentRef.current, {
            type: "lines",
            mask: "words",
            autoSplit: true,
            onSplit(self) {
                return gsap.from(self.lines, {
                    y: -10,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: contentRef.current,
                        toggleActions: "play reset play reset",
                    }
                })
            }
        })
    })

    return (
        <div className={styles.about} ref={ref}>
            <h2 className={styles.aboutTitle}>
                {
                    "About".split("").map((char, i) => (
                        <span key={i}>{char}</span>
                    ))
                }
            </h2>
            <div className={styles.aboutContent} ref={contentRef}>
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