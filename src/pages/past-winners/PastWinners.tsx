import { forwardRef } from 'react'
import styles from './PastWinners.module.scss'

export const PastWinners = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <div className={styles.pastWinnersPage} ref={ref}>
            <div className={styles.pwPageBg}>
                <img className={styles.visualizer} src="./images/winners/visualizer.png" />
            </div>
            <div className={styles.pastWinnersContent}>
                <h2 className={styles.pastWinnersTitle}>
                    {
                        "Past Winners".split("").map((char, i) => (
                            <span key={i}>{char}</span>
                        ))
                    }
                </h2>
                <div className={styles.pwGalleryContainer}>
                    <div className={styles.pwGalleryBg}>
                        <img className={styles.bgGtr1} src="./images/winners/guitarist.png" />
                        <img className={styles.bgGtr2} src="./images/winners/guitarist-2.png" />
                    </div>
                    <div className={styles.pwGallery}>
                        <img className={styles.pwImage} src="./images/winners/indian-ocean.png" />
                        <img className={styles.pwImage} src="./images/winners/them-clones.png" />
                        <img className={styles.pwImage} src="./images/winners/parikrama.png" />
                        <img className={styles.pwImage} src="./images/winners/prestorika.png" />
                    </div>
                </div>
            </div>
        </div>
    )
})
