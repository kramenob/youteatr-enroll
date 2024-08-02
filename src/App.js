import React, { useEffect }	from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './i18n';
import './App.css';

import Enroll from './components/Enroll/Enroll';

function App() {
	useEffect(() => {
	  const tg = window.Telegram.WebApp;
  
	  // Function to set CSS variables based on the theme
	  const setTheme = (themeParams) => {
		console.log('Theme Params:', themeParams); // Проверяем, что содержится в themeParams
		document.documentElement.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
		document.documentElement.style.setProperty('--tg-theme-text-color', themeParams.text_color);
		document.documentElement.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
		document.documentElement.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
		document.documentElement.style.setProperty('--tg-theme-button-color', themeParams.button_color);
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
