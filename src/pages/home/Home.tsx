import { forwardRef, useContext } from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router'
import { AppContext, type AppContextType } from '../../App'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

export const Home = forwardRef<HTMLDivElement>((_, ref) => {

	const {appStates} = useContext<AppContextType>(AppContext);

	useGSAP(() => {
		return
		gsap.registerPlugin(ScrollTrigger);
		gsap.to(`.${styles.homeBgImageOverlay}`, {
			scale: 5,
			scrollTrigger: {
				trigger: `.${styles.homeBgImageOverlay}`,
				start: "top top",
				end: "bottom top",

			}
		})
	})

	return (
		<div className={styles.home} ref={ref}>
			<div className={styles.homeBg}>
				<img className={styles.homeBgImageOverlay} src={appStates?.isMobile ? "/images/home/home-bg-overlay-mobile.png" : "/images/home/home-bg-overlay.png"} />
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
