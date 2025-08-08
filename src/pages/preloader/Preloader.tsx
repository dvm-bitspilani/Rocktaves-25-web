import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './Preloader.module.scss';
import assetList from './assetList';
// import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import VerticalBar from './VerticalBar';
import { AppContext } from '../../App';

export default function Preloader({ setIsLoading }: { setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const hasRunOnce = useRef<boolean>(false);
    const preloaderRef = useRef<HTMLDivElement>(null);
    const { appStates } = useContext(AppContext);
    const [percentageLoaded, setPercentageLoaded] = useState<number>(0);
    const numOfAssets = Object.values(assetList).reduce((sum, arr) => sum + arr.length, 0);

    const { contextSafe } = useGSAP();

    const cacheAssets = async () => {
        const timeLimit = 10;
        const handleEvent = (callback: VoidFunction) => {
            setPercentageLoaded(prev => {
                return (prev + 100/numOfAssets)})
            return callback(); 
        }

        const timeOut = setTimeout(() => {
            if (appStates?.addNotif) appStates.addNotif("Loading time limit exceeded, some assets may not be loaded properly. This could be due to slow network speeds.")
            setIsLoading(false)
        }, timeLimit*1000)

        const promises = [
            ...assetList.images.map(imgSrc => 
                new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = imgSrc;
                    img.onload = () => handleEvent(() => resolve(img));
                    img.onerror = (err) => handleEvent(() => reject(err));
                })
            ),
            ...assetList.videos.map(videoSrc => 
                new Promise<HTMLVideoElement>((resolve, reject) => {
                    const video = document.createElement('video');
                    video.src = videoSrc;
                    video.preload = "auto";
                    video.onloadeddata = () => handleEvent(() => resolve(video));
                    video.onerror = (err) => handleEvent(() => reject(err));
                })
            )
        ];

        await Promise.all(promises) 
            .catch((error) => console.log(error));
        contextSafe(() => {
            clearTimeout(timeOut)
            setIsLoading(false)
            // gsap.to(preloaderRef.current, {
            //     opacity: 0,
            //     duration: 1,
            //     delay: 1,
            //     onComplete: () => {setIsLoading(false)},
            // })
        })();
    }

    useEffect(() => {
		if (hasRunOnce.current) return;
		hasRunOnce.current = true;

        cacheAssets();
    }, [])

    return (
        <div className={styles.preloader} ref={preloaderRef}>
            <div className={styles.equalizer}>
                {
                    Array(5).fill(null).map((_, i) => <VerticalBar key={i} setOn={percentageLoaded >= (i + 1)*20} />)
                }
            </div>
            <div className={styles.fontLoader}>
                <span>This</span>
                <span>Is</span>
                <span>Hidden</span>
                <span>Don't discover it</span>
            </div>
        </div>
    )
}