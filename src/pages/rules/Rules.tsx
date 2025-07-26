import { forwardRef } from 'react';
import styles from './Rules.module.scss';

export const Rules = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<div className={styles.rulesPage} ref={ref}>
			<h2 className={styles.rulesTitle}>
				{
					"Rules".split("").map((char, i) => (
						<span key={i}>{char}</span>
					))
				}
			</h2>
			<div className={styles.rulesText}>
				<ol>
					<li>Bands must submit <span>at least 15 minutes</span> of live content or three songs. The maximum time permissible will be 20 minutes.</li>
					<li>The performance <span>must be live</span>. Playing over a pre-recorded track is not allowed.</li>
					<li>Bands based in cities where the preliminary rounds are being hosted are <span>not allowed</span> to register for the online round.</li>
					<li><span>Separate communication</span> regarding the for the online round will be communicated to the bands registering for the same.</li>
				</ol>
			</div>
			<img className={styles.rulesImage} src="/images/rules/band-members.png" />
		</div>
	)
})
