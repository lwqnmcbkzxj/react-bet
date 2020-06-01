import React, { FC, useState, createRef } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../../types/types'
import s from './CommentsBlock.module.scss';
import classNames from 'classnames'
import attachFileImg from '../../../assets/img/attach-icon.png'
import { toggleAuthFormVisiblility } from '../../../redux/app-reducer'



type SendComemntPropsType = {
	sendCommentFunc: (text: string, reply_id: number) => void

	active?: boolean
	replyCommentId?: number
	toggleReplyVisible?: () => void
}
const SendComemnt: FC<SendComemntPropsType> = ({ sendCommentFunc, active = false, replyCommentId = -1, toggleReplyVisible = () => { }, ...props }) => {
	const logged = useSelector<AppStateType, boolean>(state => state.me.logged)
	const dispatch = useDispatch()
	
	const [inputActive, setInputActive] = useState(active)
	let inputRef = createRef() as any
	const sendCommentHandler = (text: string) => {
		if (!logged) {
			dispatch(toggleAuthFormVisiblility())
			return 0
		}
		if (text !== "") {
			toggleReplyVisible()
			sendCommentFunc(text, replyCommentId)
		}
		
	}

	return (
		<div className={classNames(s.sendCommentBlock, {[s.active]: inputActive})}>
			<textarea
				placeholder="Написать комментарий"
				className={s.sendCommentInput}
				onFocus={() => { setInputActive(true) }}
				onBlur={() => {
					// setInputActive(active)
				}}
				ref={inputRef}
			/>
			<div className={s.sendBlock}>
				<div className={s.attach}>
					<input type="file" id="attachFile"/>
					<label htmlFor="attachFile"><img src={attachFileImg} alt="" className={s.attachFile} /></label>
				</div>
				<button className={s.sendBtn} onClick={()=>{sendCommentHandler(inputRef.current.value)}}>Отправить</button>
			</div>
			
		</div>
	)
}
export default SendComemnt;