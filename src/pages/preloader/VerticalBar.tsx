import React, { useEffect, useRef } from 'react'
import styles from './Preloader.module.scss'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { randInt } from '../../global';

export default function VerticalBar({setOn}: {setOn: boolean}) {
    const activeBarRef = useRef<HTMLDivElement>(null);
    const topPieceRef = useRef<HTMLDivElement>(null);
    const volPercent = useRef<number>(0);

    const topPieceVelRef = useRef<number>(0);

    const {contextSafe} = useGSAP();

    const topPieceFallAnimation = contextSafe(() => {
        return
        const accel = 0.000001;
        const currentBarHeight = gsap.getProperty(activeBarRef.current, 'height');
        const topPieceBottom = gsap.getProperty(activeBarRef.current, 'bottom');
        topPieceVelRef.current += accel;
        
        gsap.to(topPieceRef.current, {
            bottom: currentBarHeight < topPieceBottom ? `+=${topPieceVelRef.current}%` : currentBarHeight,
            onComplete: () => topPieceFallAnimation(),
            duration: 0.001
        });
    })
    const animateActiveBar = contextSafe(() => {

        const randDuration = randInt(3, 10)/10;
        
        if (setOn) {
            gsap.to(activeBarRef.current, {
                duration: randDuration,
                height: `100%`,
            });
            return;
        }

        topPieceVelRef.current = 0;
        volPercent.current = randInt(10, 90);

        gsap.to(activeBarRef.current, {
            duration: randDuration,
            height: `${volPercent.current}%`,
            onComplete: () => animateActiveBar(),
        })
    })

    useEffect(() => {
        animateActiveBar();
        topPieceFallAnimation();
    })
    
    
    return (
        <div className={styles.verticalBar}>
            <div className={styles.activeBarWrapper}>
                <div className={styles.activeBar} ref={activeBarRef} />
                <div className={styles.topPiece} ref={topPieceRef} />
            </div>
        </div>
    )
}
