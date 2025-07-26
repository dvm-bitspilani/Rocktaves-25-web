import { forwardRef } from 'react'
import styles from './Timeline.module.scss'

export const Timeline = forwardRef<HTMLDivElement>((_, ref) => {
    return (
		<div className={styles.timelinePage} ref={ref}>
			<h2 className={styles.timelineTitle}>
				{
					"Timeline".split("").map((char, i) => (
						<span key={i}>{char}</span>
					))
				}
			</h2>
			<div className={styles.timelineText}>
                <div className={styles.stepContainer}>
                    <div className={styles.stepTitle}>
                        <span>Step 1</span> - Registration
                    </div>
                    <div className={styles.stepText}>
                        Bands that register on the website will be provided with the details of the venue and time slot for the preliminary round in their respective cities. For online participants, communication about the submission will be done separately.
                    </div>
                </div>
                <div className={styles.stepContainer}>
                    <div className={styles.stepTitle}>
                        <span>Step 2</span> - Preliminary Rounds
                    </div>
                    <div className={styles.stepText}>
                        Each band is expected to perform for <span>15-20 minutes</span> at their <span>chosen venue</span>. One winner from each city and one from each online round will qualify for the final round held at <span>BITS Pilani</span>.
                    </div>
                </div>
                <div className={styles.stepContainer}>
                    <div className={styles.stepTitle}>
                        <span>Step 3</span> - Finals at Oasis '25
                    </div>
                    <div className={styles.stepText}>
                        The finalists will be invited to play at Oasis, the annual cultural fest of BITS Pilani. The winning band will walk away with the title of the Rocktaves Winner for the 53rd edition of Oasis and other prizes.
                    </div>
                </div>
			</div>
		</div>
    )
})
