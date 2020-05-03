import React, { FC, useState } from 'react';
import s from './CommentsBlock.module.scss';
import classNames from 'classnames'
import attachFileImg from '../../../assets/img/attach-icon.png'

type SendComemntPropsType = {
}
const SendComemnt: FC<SendComemntPropsType> = ({ ...props }) => {
	const [inputActive, setInputActive] = useState(false)
	
	return (
		<div className={classNames(s.sendCommentBlock, {[s.active]: inputActive})}>
			<textarea
				placeholder="Написать комментарий"
				className={s.sendCommentInput}
				onFocus={() => { setInputActive(true) }}
				onBlur={() => { setInputActive(false) }} />
			<img src={attachFileImg} alt="" className={s.attachFile} />
		</div>
	)
}
export default SendComemnt;