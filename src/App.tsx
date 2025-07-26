import SingleScroller from './pages/single-scroll-page/SingleScroller';
import './global.module.scss'
import { Route, Routes } from 'react-router';
import Register from './pages/register/Register';

export default function App() {
	return (
		<Routes>
			<Route path='register' element={<Register />}></Route>
			<Route path='*' element={<SingleScroller />}></Route>
		</Routes>
	)
}
