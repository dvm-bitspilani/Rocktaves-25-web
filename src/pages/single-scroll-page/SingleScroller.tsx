import { useLocation, useNavigate } from 'react-router'
import { About } from '../about/About'
import { AboutUs } from '../aboutUs/AboutUs'
import { Home } from '../home/Home'
import { PastWinners } from '../past-winners/PastWinners'
import { Rules } from '../rules/Rules'
import { Timeline } from '../timeline/Timeline'
import styles from './SingleScroller.module.scss'
import { useRef, useEffect } from 'react'

const pages = [
	"home",
	"about",
	"rules",
	"timeline",
	"past-winners",
	"contact"
]

export default function SingleScroller() {
	const navigate = useNavigate();
	const location = useLocation();
	const initialScrollOver = useRef(["home", ""].includes(location.pathname));
	const pageRefs = useRef<Record<(typeof pages)[number], HTMLDivElement | null>>({});
	const setPageRef = (page: (typeof pages)[number]) => {
		return (elem: HTMLDivElement | null) => {
			if (elem) {
				pageRefs.current[page] = elem;
				elem.id = page;
			}
		}
	}

	useEffect(() => {
		let targetPage = location.pathname.replace("/", "");
		
		if (!pages.includes(targetPage)) navigate("/");
		else if (pageRefs.current[targetPage]) 
			pageRefs.current[targetPage]?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			})

	}, [location.pathname]);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const page = entry.target.id;
					if (pages && pages.includes(page) || page === '') navigate(`/${page}`);
				}
			})
		}, {threshold: 0.01})

		const bindObservers = () => {
			Object.values(pageRefs.current).forEach((page) => observer.observe(page as Element));
			console.log("observeres binded")
			initialScrollOver.current = true;
		}

		if (!initialScrollOver.current) window.addEventListener("scrollend", () => {bindObservers()}, {once: true});
		console.log(initialScrollOver.current)
		return () => {
			window.removeEventListener("scrollend", () => {bindObservers()} );
			observer.disconnect();
		}
	}, []);

	return (
		<div className={styles.singleScroller}>
			<div className={styles.ssBg}>
				<video className={styles.bgVideo} autoPlay loop muted>
					<source src="./vidoes/ROCTAVES_BG_VIDEO.mp4" type="video/mp4" />
				</video>
			</div>
			<Home ref={setPageRef(pages[0])} />
			<About ref={setPageRef(pages[1])} />
			<Rules ref={setPageRef(pages[2])} />
			<Timeline ref={setPageRef(pages[3])} />
			<PastWinners ref={setPageRef(pages[4])} />
			<AboutUs ref={setPageRef(pages[5])} />
		</div>
	)
}
