import { forwardRef } from 'react';
import styles from './AboutUs.module.scss';

export const AboutUs = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div className={styles.aboutUsPage} ref={ref}>
            <h2 className={styles.aboutUsTitle}>
                {
                    "About Us".split("").map((char, i) => (
                        <span key={i}>{char}</span>
                    ))
                }
            </h2>
            <p className={styles.aboutUsContent}>
                Roctaves is organised by the Association of Rock, BITS Pilani (ARBITS). ARBITS began as a club with the initial goal of curating and spreading indie music on campus, and our goal has been to foster and uplift the Indian music scene and help bands reach a wider audience. For decades, the club has organised Rocktaves, which has acted as a launching pad for budding artists, with prior winners receiving cash prizes of over one lakh, distribution deals and more.
            </p>
            <h2 className={styles.contactUsTitle}>
                {
                    "Contact Us".split("").map((char, i) => (
                        <span key={i}>{char}</span>
                    ))
                }
            </h2>
            <div className={styles.contactUsContent}>
                <div className={styles.contactItem}>
                    <div className={styles.contactName}>Kuhoo Sathe</div>
                    <div className={styles.contactNum}>+91 9224770487</div>
                </div>
                <div className={styles.contactItem}>
                    <div className={styles.contactName}>Yash Sahoo</div>
                    <div className={styles.contactNum}>+91 9999889867</div>
                </div>
            </div>
        </div>
    )
})
