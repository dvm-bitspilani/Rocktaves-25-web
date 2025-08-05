import { useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './Toaster.module.scss';
import { addItemToArrayState, arrayStatePop, setObjectState } from '../global';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AppContext } from '../App';

interface notif {
    message: string,
    key: number
}

const Notification = ({message, onRemove}: {message: string, onRemove: VoidFunction}): ReactNode => {

    const selfRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        const lifeTime = 3;
        
        const killTimeout = setTimeout(() => {
            gsap.to(selfRef.current, {
                autoAlpha: 0,
                duration: 1,
                onComplete: () => onRemove()
            })
        }, lifeTime*1000)

        return () => {
            clearTimeout(killTimeout)
        }
    })

    return <div className={styles.toasterNotif} ref={selfRef}>{message}</div>;
}

export default function Toaster() {

    const [notificationList, setNotificationList] = useState<notif []>([])
    console.log('hey')

    const removeNotif = () => setNotificationList(prev => arrayStatePop(prev));
    const addNotif = (message: string) => {
        console.log(notificationList)
        setNotificationList(prev => [...prev, {message: message, key: (new Date()).getTime()}]);
    }

    const { appStates, setAppStates } = useContext(AppContext);

    useEffect(() => {
        if (setAppStates) setAppStates(setObjectState(appStates, "addNotif", addNotif))
    }, [])

    return (
        <div className={styles.toasterContainer}>
            {
                notificationList.map((notif) => <Notification message={notif.message} onRemove={removeNotif} key={notif.key} />)
            }
        </div>
    )
}
