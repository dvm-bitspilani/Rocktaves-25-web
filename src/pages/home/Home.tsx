import { forwardRef, useContext, useRef } from 'react'
import styles from './Home.module.scss'
import { Link } from 'react-router'
import { AppContext, type AppContextType } from '../../App'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'

export const Home = forwardRef<HTMLDivElement, {scrollToPage: (page: string) => void}>(({scrollToPage}, ref) => {

	const {appStates} = useContext<AppContextType>(AppContext);
	const bgOverlayImgRef = useRef<HTMLImageElement>(null);
	const headingCharsRef = useRef<HTMLSpanElement[]>([]);

	const setHeadingCharsRef = (i: number) => {
		return (char: HTMLSpanElement) => {
			if (headingCharsRef.current) headingCharsRef.current[i] = char;
		}
	}

	useGSAP(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.to(bgOverlayImgRef.current, {
			scale: 5,
			translateY: "-50%",
			scrollTrigger: {
				trigger: bgOverlayImgRef.current,
				start: "top top",
				end: "+=100%",
				scrub: true,
			},
			ease: "power1.in"
		})
		console.log(headingCharsRef.current)
		const maxDisplacement = 0
		headingCharsRef.current?.forEach((char, i) => {
			gsap.to(char, {
				x: `+=${-maxDisplacement + i*maxDisplacement/4}`,
				scrollTrigger: {
					trigger: bgOverlayImgRef.current, //since it is fixed to the home screen anyway
					start: "top top",
					end:  "bottom top",
					scrub: true,
				}
			})
		})
	})

	return (
		<div className={styles.home} ref={ref}>
			<div className={styles.homeBg}>
				<img 
					className={styles.homeBgImageOverlay} 
					src={appStates?.isMobile ? "/images/home/home-bg-overlay-mobile.png" : "/images/home/home-bg-overlay.png"}
					ref={bgOverlayImgRef}
				/>
			</div>
			<div className={styles.homeContent}>
				<h1 className={styles.title}>
					{
						"Rocktaves".split("").map((char, i) => (
							<span ref={setHeadingCharsRef(i)} key={i}>{char}</span>
						))
					}
				</h1>
				<div className={styles.navlinks}>
					<div onClick={() => scrollToPage("about")} className={styles.navlink}>About</div>
					<Link to="/register" className={styles.navlink}>Register</Link>
					<div onClick={() => scrollToPage("contact")} className={styles.navlink}>Contact</div>
				</div>
			</div>
		</div>
	)
})
