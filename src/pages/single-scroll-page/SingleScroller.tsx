import { useLocation, useNavigate } from 'react-router'
import { About } from '../about/About'
import { AboutUs } from '../aboutUs/AboutUs'
import { Home } from '../home/Home'
import { PastWinners } from '../past-winners/PastWinners'
import { Rules } from '../rules/Rules'
import { Timeline } from '../timeline/Timeline'
import styles from './SingleScroller.module.scss'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pages = [
	"home",
	"about",
	"rules",
	"timeline",
	"past-winners",
	"contact"
]

// history.scrollRestoration = "manual";

export default function SingleScroller() {
	const navigate = useNavigate();
	const location = useLocation();
	const initialScrollOver = useRef(["/home", "/"].includes(location.pathname));
	// const locationRef = useRef<Location>(null);
	const pageRefs = useRef<Record<(typeof pages)[number], HTMLDivElement | null>>({});
	const pageContRef = useRef<HTMLDivElement>(null);
	const setPageRef = (page: (typeof pages)[number]) => {
		return (elem: HTMLDivElement | null) => {
			if (elem) {
				pageRefs.current[page] = elem;
				elem.id = page;
			}
		}
	}

	const scrollToPage = (page: string) => {
		pageRefs.current[page]?.scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	}

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const page = entry.target.id;
					if (pages && pages.includes(page) || page === '') navigate(`/${page}`);
				}
			})
		}, {threshold: 0.5})

		const bindObservers = () => {
			Object.values(pageRefs.current).forEach((page) => observer.observe(page as Element));
			("observeres binded")
			initialScrollOver.current = true;
		}

		if (!initialScrollOver.current) {
			// window.addEventListener("scrollend", () => {bindObservers()}, {once: true});
			const target = location.pathname.replace("/", "");
			if (pages.includes(target)) scrollToPage(target)
			else navigate("/")
		}
		// else bindObservers()
		bindObservers()

		const handleResize = () => {ScrollTrigger.refresh()}

		window.addEventListener("resize", handleResize);

		return () => {
			// window.removeEventListener("scrollend", () => {bindObservers()} );
			observer.disconnect();
			window.removeEventListener("resize", handleResize);
		}
	}, []);

	useGSAP(() => {
		return
		gsap.registerPlugin(ScrollTrigger)
		gsap.timeline({
			// onUpdate: () => console.log("heyyy"),
			scrollTrigger: {
				trigger: pageContRef.current,
				start: "top top",
				scrub: 1, 
				end: "bottom bottom",
				snap: {
					snapTo: Object.values(pageRefs.current).map((page) => {
						if (!page || !document.scrollingElement) return -1;
						const totalScrollHeight = ScrollTrigger.maxScroll(document.scrollingElement as HTMLElement);
						const currentScrollPos = document.scrollingElement.scrollTop;
						const vpRelPageTop = page.getBoundingClientRect().top;
						const posRatio = (vpRelPageTop + currentScrollPos)/totalScrollHeight;
						// const posRatioBottom = ()
						return posRatio >= 0 ? posRatio : 0;
					}).filter(posRatio => posRatio !== -1),
					ease: "sine.inOut",
					duration: 1,
					directional: false,
				},
			}
		})
	}, {dependencies: [location.pathname]})

	return (
		<>
			{/* {isLoading ? <Preloader setIsLoading={setIsLoading} /> : null} */}
			<div className={styles.singleScroller}>
				<div className={styles.ssBg}>
					<video className={styles.bgVideo} autoPlay loop muted>
						<source src="/videos/ROCTAVES_BG_VIDEO.mp4" type="video/mp4" />
					</video>
				</div>
				<div className={styles.pageContainer} ref={pageContRef}>
					<Home scrollToPage={scrollToPage} ref={setPageRef(pages[0])} />
					<About ref={setPageRef(pages[1])} />
					<Rules ref={setPageRef(pages[2])} />
					<Timeline ref={setPageRef(pages[3])} />
					<PastWinners ref={setPageRef(pages[4])} />
					<AboutUs ref={setPageRef(pages[5])} />
				</div>
			</div>
		</>
	)
}
