import { forwardRef, useRef } from 'react'
import styles from './PastWinners.module.scss'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const PastWinners = forwardRef<HTMLDivElement>((_, ref) => {

    const imgRefs = useRef<HTMLImageElement[]>([]);
    const setImgRef = (index: number) => {
        return (element: HTMLImageElement) => {
            if (element && imgRefs.current) imgRefs.current[index] = element;
        }
    }
    const pwGalleryRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!ref) return
        gsap.registerPlugin(ScrollTrigger);

        imgRefs.current.forEach((img, i) => {
            gsap.from(img, {
                x: `+=${-90 + (60*i)}`,
                opacity: 0,
                scrollTrigger: {
                    trigger: pwGalleryRef.current,
                    start: "top bottom",
                    end: "top 15%",
                    scrub: true
                },
                ease: "sine.inOut"
            })
        })

    })

    return (
        <div className={styles.pastWinnersPage} ref={ref}>
            <div className={styles.pwPageBg}>
                {/* <img className={styles.visualizer} src="./images/winners/visualizer.png" /> */}
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
                    <div className={styles.pwGallery} ref={pwGalleryRef}>
                        <img className={styles.pwImage} ref={setImgRef(0)} src="./images/winners/indian-ocean.png" />
                        <img className={styles.pwImage} ref={setImgRef(1)} src="./images/winners/them-clones.png" />
                        <img className={styles.pwImage} ref={setImgRef(2)} src="./images/winners/parikrama.png" />
                        <img className={styles.pwImage} ref={setImgRef(3)} src="./images/winners/prestorika.png" />
                    </div>
                </div>
            </div>
        </div>
    )
})
