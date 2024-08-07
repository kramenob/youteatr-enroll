/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet';

import "./Enroll.css"

const content = (content) => css`
  &.req::after {
    content: '${content}';
  }
`

function Enroll(props) {
	const { t, i18n } = useTranslation()
	const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
	const [errors, setErrors] = useState({
		parentName: false,
		email: false,
		phone: false,
		childName: false,
		childAge: false,
	});

	useEffect(() => {
		if (props.lang) {
		  i18n.changeLanguage(props.lang);
		  setSelectedLanguage(props.lang);
		}
	  }, [props.lang, i18n]);
	
	useEffect(() => {
		const handleLanguageChange = () => {
		  setSelectedLanguage(i18n.language);
		};
		i18n.on('languageChanged', handleLanguageChange);
		return () => {
		  i18n.off('languageChanged', handleLanguageChange);
		};
	}, [i18n]);
	
	const chooseLanguage = (e) => {
		e.preventDefault();
		i18n.changeLanguage(e.target.value); // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
		setSelectedLanguage(e.target.value);
	}
	const translations = (lng) => {
		if (lng === "en") {
			return (
				<>
					<button className='no-select' value="sl" onClick={chooseLanguage}>SLV</button>
					<button className='no-select' value="ru" onClick={chooseLanguage}>RUS</button>
				</>
			)
		} else if (lng === "ru") {
			return (
				<>
					<button className='no-select' value="sl" onClick={chooseLanguage}>SLV</button>
					<button className='no-select' value="en" onClick={chooseLanguage}>ENG</button>
				</>
			)
		} else if (lng === "sl") {
			return (
				<>
					<button className='no-select' value="ru" onClick={chooseLanguage}>RUS</button>
					<button className='no-select' value="en" onClick={chooseLanguage}>ENG</button>
				</>
			)
		}
	}

	const
		telegramBotToken = process.env.REACT_APP_TELEGRAM_BOT_TOKEN,
		telegramChatId = process.env.REACT_APP_TELEGRAM_CHAT_ID,
		url = `https://api.telegram.org/bot${telegramBotToken}/sendMessage?parse_mode=Markdown`,
		
		parentName = useRef(null),
		eMail = useRef(null),
		phone = useRef(null),
		childName = useRef(null),
		childAge = useRef(null)

	const send = () => {

		let c = fullFormMode()

		if (c) {
			let id = generateId();
			let now = generateNow();

			let message =
				`
*ЗАПИСЬ НА КУРС от ${now}*

*Имя родителя:* \`${parentName.current.value}\`
*E-Mail:* \`${eMail.current.value}\`
*Телефон:* \`${phone.current.value}\`
*Имя ребёнка:* \`${childName.current.value}\`
*Возраст ребёнка:* \`${childAge.current.value}\`

ID этой записи: \`${id}\`
				`

				fetch(url, {
					method: 'POST',
					headers: {
					  'Content-Type': 'application/json',
					},
					body: JSON.stringify({
					  chat_id: telegramChatId,
					  text: message,
					}),
				  })
				  .then(response => response.json())
				  .then(data => {
					console.log('Success:', data);
				  })
				  .catch((error) => {
					console.error('Error:', error);
				  });
				  document.querySelector(".success").classList.add("ok")
				  setTimeout(() => {
					window.location.reload();
				  }, 5000);
		}

	}

	const fullFormMode = () => {
		let res = true

		const newErrors = {
			parentName: false,
			email: false,
			phone: false,
			childName: false,
			childAge: false,
		};

		if (parentName.current.value.length < 2) {
			newErrors.parentName = true;
			res = false
		} else {
			newErrors.parentName = false;
		}
		if (emailTest()) {
			newErrors.email = true;
			res = false
		} else {
			newErrors.email = false;
		}

		if (checkPhone()) {
			newErrors.phone = true;
			res = false
		} else {
			newErrors.phone = false;
		}

		if (childName.current.value.length < 2) {
			newErrors.childName = true;
			res = false
		} else {
			newErrors.childName = false;
		}

		if (childAge.current.value < 1) {
			newErrors.childAge = true;
			res = false
		} else {
			newErrors.childAge = false;
		}
		
		if (!(childAge.current.value >= 7 && childAge.current.value <= 15)) {
			newErrors.childAge = true;
			res = false
		} else {
			newErrors.childAge = false;
		}

		setErrors(newErrors);
		
		return res
	}

	const emailTest = () => {
		// eslint-disable-next-line
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(eMail.current.value);
	}

	const checkPhone = () => {
		let res
		// eslint-disable-next-line
		if (phone.current.value.match(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)) {
			res = false
		} else {
			res = true
		}
		return res
	}

	const generateId = () => {
		// eslint-disable-next-line
		return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		// eslint-disable-next-line
			(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
		);
	}
	const generateNow = () => {
		const now = new Date();
		let year	= now.getFullYear();
		let month   = now.getMonth()+1; 
		let day	 = now.getDate();
		let hour	= now.getHours();
		let minute  = now.getMinutes();
		let second  = now.getSeconds(); 
		return `${day}.${month}.${year}, ${hour}:${minute}:${second}`;
	}

	return (
		<>
			<Helmet>
				<html lang={props.lang} />
				<title>{t('title')}</title>
				<meta name="description" content={t('description')} />
			</Helmet>
			<div className="wrapper">
					<form className="form__content" onSubmit={(e) => {
							e.preventDefault()
							send()
						}}>
						<span className="form_title" color="text">{t("form.form_1")}</span>
						<div className="grid form__inputs">
							<label className={`form__label ${errors.parentName ? 'req' : ''}`} css={content(t("form.form_9"))} id="for-parent-name">
								<input
									ref={parentName}
									type="text"

									id="parent-name"
									className="form__input"

									name="parent-name"
									placeholder={t("form.form_2")}

									minLength="1"
									maxLength="20"
								/>
							</label>
							<label className={`form__label ${errors.email ? 'req' : ''}`} css={content(t("form.form_10"))} id="for-email">
								<input
									ref={eMail}
									type="text"

									id="email"
									className="form__input"

									name="email"
									placeholder={t("form.form_3")}

									minLength="1"
									maxLength="50"
								/>
							</label>
							<label className={`form__label ${errors.phone ? 'req' : ''}`} css={content(t("form.form_11"))} id="for-phone">
								<input
									ref={phone}
									type="tel"

									id="phone"
									className="form__input"

									name="phone"
									placeholder={t("form.form_4")}

									minLength="1"
									maxLength="20"
								/>
							</label>
							<label className={`form__label ${errors.childName ? 'req' : ''}`} css={content(t("form.form_12"))} id="for-child-name">
								<input
									ref={childName}
									type="text"

									id="child-name"
									className="form__input"

									name="child-name"
									placeholder={t("form.form_5")}

									minLength="1"
									maxLength="20"
								/>
							</label>
							<label className={`form__label ${errors.childAge ? 'req' : ''}`} css={content(t("form.form_13"))} id="for-child-age">
								<input
									ref={childAge}
									type="number"

									id="child-age"
									className="form__input"

									name="child-age"
									placeholder={t("form.form_6")}

									minLength="1"
									maxLength="2"
								/>
							</label>
						</div>
						<div className="grid form_submit">
							<button className="form__button no-select" type="submit">{t("form.form_7")}</button>
							<span className="form__notice mob-form-hidden">{t("form.form_8")}</span>
						</div>
					</form>
					<div className="devider" ></div>
					<section className="language-switcher">
						<span className="note">{t('form.form_16')}</span>
						<div className="buttons">
							{translations(selectedLanguage)}
						</div>
					</section>
					<section className="success">
						<div className="box">
							<span>Заявка успешно отправлена.</span>
							<span>В скором времени мы с вами свяжемся, пожалуйста ожидайте!</span>
						</div>
					</section>
			</div>
		</>
	)
}

export default Enroll
