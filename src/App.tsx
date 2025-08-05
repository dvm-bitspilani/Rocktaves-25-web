import SingleScroller from './pages/single-scroll-page/SingleScroller';
import './global.module.scss'
import { Route, Routes } from 'react-router';
import Register from './pages/register/Register';
import { createContext, useEffect, useState } from 'react';
import { setObjectState } from './global';
import Toaster from './components/Toaster';

interface AppStatesType {
	isMobile: boolean,
	addNotif?: (message: string) => void,
}

export interface AppContextType {
	appStates?: AppStatesType,
	setAppStates?: React.Dispatch<React.SetStateAction<AppStatesType>>
}

export const AppContext = createContext<AppContextType>({});

export default function App() {
	const mobileBreakPoint = 750;
	const [appStates, setAppStates] = useState<AppStatesType>({
		isMobile: window.innerWidth <= mobileBreakPoint,
	})

	useEffect(() => {
		const handleWinResize = () => {
			const isMobile = window.innerWidth <= mobileBreakPoint
			setAppStates(prev => setObjectState(prev, 'isMobile', isMobile));
		}

		window.addEventListener("resize", handleWinResize);

		return () => {
			window.removeEventListener("resize", handleWinResize);
		}
	}, [])

	return (
		<AppContext.Provider value={{appStates, setAppStates}}>
			<Routes>	
				<Route path='register' element={<Register />}></Route>
				<Route path='*' element={<SingleScroller />}></Route>
			</Routes>
			<Toaster />
		</AppContext.Provider>
	)
}