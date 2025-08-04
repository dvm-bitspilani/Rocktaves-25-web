import React, { useEffect, useRef, useState } from 'react';
import styles from './Preloader.module.scss';
import assetList from './assetList';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import VerticalBar from './VerticalBar';

export default function Preloader({ setIsLoading }: { setIsLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const hasRunOnce = useRef<boolean>(false);
    const preloaderRef = useRef<HTMLDivElement>(null);
    const [percentageLoaded, setPercentageLoaded] = useState<number>(0);
    const numOfAssets = Object.values(assetList).reduce((sum, arr) => sum + arr.length, 0);

    const { contextSafe } = useGSAP();

    const cacheAssets = async () => {
        const handleEvent = (callback: VoidFunction) => {
			setPercentageLoaded((prev) => {
				const newPercentage = prev + (1/numOfAssets)*100;
				return newPercentage;
			});
            return callback();
        }

        const promises = [
            ...assetList.images.map(imgSrc => (
                new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = imgSrc;
                    img.onload = () => handleEvent(() => resolve(img));
                    img.onerror = (err) => handleEvent(() => reject(err));
                })
            )),
            ...assetList.videos.map(videoSrc => (
                new Promise<HTMLVideoElement>((resolve, reject) => {
                    const video = document.createElement('video');
                    video.src = videoSrc;
                    video.onloadeddata = () => handleEvent(() => resolve(video));
                    video.onerror = (err) => handleEvent(() => reject(err));
                })
            ))
        ];

        await Promise.all(promises)
            .then(() => console.log("loading complete"))
            .catch((error) => console.log(error));
        contextSafe(() => {
            gsap.to(preloaderRef.current, {
                opacity: 0,
                duration: 1,
                onComplete: () => {setIsLoading(false)},
            })
        })();
    }

    useEffect(() => {
        if (!hasRunOnce.current) {
            hasRunOnce.current = true;
            return;
        }

        cacheAssets();
    }, [])

    return (
        <div className={styles.preloader} ref={preloaderRef}>
            <div className={styles.equalizer}>
                {
                    Array(5).fill(null).map((_, i) => <VerticalBar key={i} setOn={percentageLoaded >= (i + 1)*10} />)
                }
            </div>
        </div>
    )
}