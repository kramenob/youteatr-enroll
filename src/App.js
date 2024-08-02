import React, { useEffect }	from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './i18n'
import './App.css'

import Enroll from './components/Enroll/Enroll'

function App() {
	useEffect(() => {
		const tg = window.Telegram.WebApp

		const setTheme = (themeParams) => {
			const bg_color = themeParams.bg_color || '#FFFFFF'
			const sec_bg_color = themeParams.secondary_bg_color || '#DEDEDE'
			const text_color = themeParams.text_color || '#000000'
			const hint_color = themeParams.hint_color || 'rgb(0, 0, 0, 0.5)'
			const button_text_color = themeParams.button_text_color || '#FFFFFF'
			const button_color = themeParams.button_color || '#48B3A9'

			document.documentElement.style.setProperty('--tg-theme-bg-color', bg_color);
			document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', sec_bg_color);
			document.documentElement.style.setProperty('--tg-theme-text-color', text_color);
			document.documentElement.style.setProperty('--tg-theme-hint-color', hint_color);
			document.documentElement.style.setProperty('--tg-theme-button-text-color', button_text_color);
			document.documentElement.style.setProperty('--tg-theme-button-color', button_color);
		};

		// Set initial theme
		setTheme(tg.themeParams);

		// Update theme when it changes
		tg.onEvent('themeChanged', () => {
		setTheme(tg.themeParams);
		});

		// Show the WebApp
		tg.ready();
	}, []);

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
