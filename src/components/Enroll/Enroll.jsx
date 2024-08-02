import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet';

import "./Enroll.css"

function Enroll(props) {
	const { t, i18n } = useTranslation()
	i18n.changeLanguage(props.lang)

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
					// console.log('Success:', data);
				  })
				  .catch((error) => {
					// console.error('Error:', error);
				  });
				  alert(t("form.form_15"))
				  window.location.reload()
		}

	}

	const fullFormMode = () => {
		let form = document.querySelector(".form")
		let form__content = document.querySelector(".form__content")
		let res = true

		if (parentName.current.value.length < 2) {
			alert(t("form.form_9"));
			res = false
		} else if (emailTest()) {
			alert(t("form.form_10"))
			res = false
		} else if (checkPhone()) {
			alert(t("form.form_11"))
			res = false
		} else if (childName.current.value.length < 2) {
			alert(t("form.form_12"));
			res = false
		} else if (childAge.current.value < 1) {
			alert(t("form.form_13"));
			res = false
		} else if (!(childAge.current.value >= 7 && childAge.current.value <= 15)) {
			alert(t("form.form_14"));
			res = false
		}
		
		form.classList.add("offset")
		form__content.classList.add("mob-show")
		

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
				<title>{t('title')}</title>
				<meta name="description" content={t('description')} />
			</Helmet>
			<div className="wrapper">
					<form className="form__content" onSubmit={(e) => {
							e.preventDefault()
							send()
						}}>
						<span className="form_title">{t("form.form_1")}</span>
						<div className="grid form__inputs">
							<label className="form__label" id="for-parent-name">
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
							<label className="form__label form__label--addition" id="for-email">
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
							<label className="form__label form__label--addition" id="for-phone">
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
							<label className="form__label" id="for-child-name">
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
							<label className="form__label form__label--addition" id="for-child-age">
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
			</div>
		</>
	)
}

export default Enroll
