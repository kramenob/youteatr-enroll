import React	from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import './i18n';
import './App.css';

import Enroll from './components/Enroll/Enroll';

function App() {
	const { t } = useTranslation();

	return (
		<>
			<BrowserRouter>
					<Routes>
						<Route path="/en/enroll" element={<Enroll lang="en" />} />
						<Route path="/ru/enroll" element={<Enroll lang="ru" />} />
						<Route path="/sl/enroll" element={<Enroll lang="sl" />} />
					</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
