import { forwardRef } from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router'

export const Home = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<div className={styles.home} ref={ref}>
			<div className={styles.homeBg}>
				<img className={styles.homeBgImageOverlay} src="/images/home/home-bg-overlay.png" />
			</div>
			<div className={styles.homeContent}>
				<h1 className={styles.title}>
					{
						"Rocktaves".split("").map((char, i) => (
							<span key={i}>{char}</span>
						))
					}
				</h1>
				<div className={styles.navlinks}>
					<Link to="/about" className={styles.navlink}>About</Link>
					<Link to="/register" className={styles.navlink}>Register</Link>
					<Link to="/contact" className={styles.navlink}>Contact</Link>
				</div>
			</div>
		</div>
	)
})
