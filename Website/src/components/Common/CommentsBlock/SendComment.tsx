import React, { FC, useState, createRef } from 'react';
import s from './CommentsBlock.module.scss';
import classNames from 'classnames'
import attachFileImg from '../../../assets/img/attach-icon.png'

type SendComemntPropsType = {
	active?: boolean
	replyCommentId?: number
	toggleReplyVisible?: () => void
}
const SendComemnt: FC<SendComemntPropsType> = ({ active = false, replyCommentId, toggleReplyVisible = () =>{}, ...props }) => {
	const [inputActive, setInputActive] = useState(active)
	let inputRef = createRef() as any
	const sendComment = (text: string) => {
		if(text !== "")
			toggleReplyVisible()
		
	}

	return (
		<div className={classNames(s.sendCommentBlock, {[s.active]: inputActive})}>
			<textarea
				placeholder="Написать комментарий"
				className={s.sendCommentInput}
				onFocus={() => { setInputActive(true) }}
				onBlur={() => { setInputActive(active) }}
				ref={inputRef}
			/>
			<div className={s.sendBlock}>
				<div className={s.attach}>
					<input type="file" id="attachFile"/>
					<label htmlFor="attachFile"><img src={attachFileImg} alt="" className={s.attachFile} /></label>
				</div>
				<button className={s.sendBtn} onClick={()=>{sendComment(inputRef.current.value)}}>Отправить</button>
			</div>
			
		</div>
	)
}
export default SendComemnt;