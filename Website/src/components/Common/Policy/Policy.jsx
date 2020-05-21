import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import './Policy.scss'

const Policy = ({ ...props }) => {

	return (
		<div className="policy">
			<h1 className="pageName">Политика конфиденциальности для мобильных приложений Betting HUB </h1>
			<p>В настоящей Политике конфиденциальности приводятся сведения о том, как именно используются данные,
			собранные нашими приложениями о пользователях и их устройствах. Пожалуйста, ознакомьтесь с данными
			правилами соблюдения конфиденциальности и сообщите нам, если у вас возникнут какие-либо вопросы.
			Использование Сервисов  Betting HUB означает безоговорочное согласие Пользователя с настоящей Политикой
			и указанными в ней условиями обработки его персональной информации; в случае несогласия с этими условиями
			Пользователь должен воздержаться от использования Сервисов.
			</p>
			<p>1. Данные, которые могут быть собраны с Вашего
			мобильного устройства Персональная информация — информация, которая сама по себе или в сочетании с другой
			информацией, позволяет идентифицировать личность пользователя, связаться с пользователем, либо определить его
			местонахождение. Например, имя, фамилия, адрес электронной почты, место работы, должность или номер телефона.
			Прочая информация — информация, которая не раскрывает личность пользователя ни сама по себе, ни в сочетании с
			другой информацией, которую мы получили. Например, информация об устройстве пользователя, данные об использовании
			приложения или геолокация. Также в наших приложениях могут проводиться дополнительные опросы, в ходе которых вам будет
			предложено выразить свое мнение о различных продуктах и услугах. Если вы воспользуетесь инструментами приложения,
			у нас будет возможность сохранять принимаемые и отправляемые вами материалы и сообщения. Кроме того, мы оставляем
			за собой право осуществлять мониторинг ваших сообщений. Перед тем как передавать нам персональные данные любых
			других лиц, заручитесь их согласием. Следите за тем, чтобы предоставляемые вами данные были точны и актуальны,
			и своевременно обновляйте их в случае изменений. </p>
			<p>2. Использование полученных данных Информация личного характера,
			полученная в формате электронных регистрационных форм, используется: • в целях регистрации пользователей. • для
			поддержки работы и совершенствования нашего приложения; • для отслеживания политики и статистики пользования приложением;
			• а также в целях, разрешенных самим пользователем приложения. Кроме того, мы используем информацию личного характера для
			поддержания связи с пользователем приложения. Например, если Вы направляете нам сообщение через службу поддержки приложения,
			мы можем воспользоваться Вашей персональной информацией, чтобы ответить на него. Мы также используем персональную информацию
			для того, чтобы проинформировать Вас о внесении существенных изменений в настоящую Политику конфиденциальности.
			Время от времени мы можем приглашать пользователей предоставлять информацию в формате опросов или анкет.
			Участие в таких опросах или подписных листах совершенно добровольно, следовательно, пользователь может принять решение,
			раскрывать запрашиваемую информацию или нет. В дополнение к прочим целям, предусмотренным в настоящей Политике конфиденциальности,
			контактная информация, полученная в связи с опросами или анкетами, используется для сообщения Вам результатов опросов или анкетирования.</p>
			<p>3. Раскрытие частной информации Мы можем использовать или раскрывать Ваши личные данные если считаем, что это необходимо в целях выполнения
			требований закона или решений суда, для защиты наших прав или собственности, защиты личной безопасности пользователей наших приложений
			или представителей широкой общественности, в целях расследования или принятия мер в отношении незаконной или предполагаемой незаконной
			деятельности, в связи с корпоративными сделками, такими как разукрупнение, слияние, консолидация, продажа активов или в маловероятном
			случае банкротства, или в иных целях в соответствии с Вашим согласием. Сервис компании оставляет за собой право предоставить
			личные данные пользователей по законным запросам органов власти или в случае нарушения Пользовательского соглашения. Мы можем
			раскрывать содержание сообщений или обращений,однако мы не будем размещать или публиковать информацию личного характера.
			За исключением случаев, предусмотренных в настоящей Политике конфиденциальности, такая информация не будет предоставляться третьим лицам без Вашего
			согласия. Мы не будем продавать, предоставлять на правах аренды или лизинга списки наших пользователей с адресами электронной почты третьим сторонам. </p>




			<p>4. Безопасность и хранение данных Мы принимаем меры по защите ваших персональных данных.
			В число этих мер входят процессы и процедуры, направленные на снижение рисков несанкционированного доступа к вашим данным или разглашения таковых.
			Однако мы не гарантируем полного исключения злоупотреблений вашими персональными данными со стороны нарушителей.
			Храните пароли от ваших учетных записей в безопасном месте и не разглашайте их третьим лицам.
			Если вам станет известно о несанкционированном использовании вашего пароля или ином нарушении безопасности, немедленно свяжитесь с нами.
			Наша компания использует сторонние хостинговые и иные сервисы для функционирования программного обеспечения, каналов передачи данных и других ресурсов,
			необходимых для работы приложений. Несмотря на то, что Сервис компании владеет программным обеспечением и базами данных, необходимых для его
			функционирования, пользователи остаются правообладателями своих данных. </p>
			<p>5. Изменения, вносимые в настоящее Заявление о конфиденциальности
			Мы сохраняем за собой право по своему усмотрению время от времени вносить изменения или дополнения в настоящую Политику конфиденциальности -
			частично или полностью. Мы призываем Вас следить за всеми изменениями в нашей Политике конфиденциальности для того, чтобы быть информированными
			относительно того, как мы используем и защищаем Вашу личную информацию. Приведенные ниже правила действуют в отношении всех настоящих и будущих
			пользователей мобильных приложений, создаваемых нашей компанией. Пользуясь мобильными приложениями, пользователь (конечный клиент) выражает свое
			 согласие с этими правилами. Мы сохраняем за собой право изменять данные правила и инструкции. </p>
			<p>6. Контактная информация По общим вопросам обращайтесь в службу поддержки пользователей: marina.developtr@gmail.com</p>
		</div>
	)
}

export default Policy