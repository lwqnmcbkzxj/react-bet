import React, { FC, useState, createRef, Ref } from 'react';
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

	commentFieldRef?: Ref<HTMLDivElement>

	style?: any
}
const SendComemnt: FC<SendComemntPropsType> = ({
	sendCommentFunc,
	active = false,
	replyCommentId = -1,
	toggleReplyVisible = () => { },
	commentFieldRef, ...props }) => {
	
	
	
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
			inputRef.current.value = ""
		}
		
	}

	const attachButtonRef = React.createRef<HTMLInputElement>()
	return (
		<div className={classNames(s.sendCommentBlock, { [s.active]: inputActive })} ref={commentFieldRef} style={props.style}>
			<textarea
				placeholder="Написать комментарий"
				className={s.sendCommentInput}
				onFocus={() => { setInputActive(true) }}
				
				ref={inputRef}
			/>
			<div className={s.sendBlock}>
				<div className={s.attach} >
					{/* <input type="file" id="attachFile" ref={attachButtonRef}/>
					<label htmlFor="attachFile">
						<img src={attachFileImg}
							alt="attach-img"
							className={s.attachFile}
							onClick={(e) => {
								attachButtonRef.current?.click();
								e.preventDefault()
							}} /></label> */}
				</div>
				<button className={s.sendBtn} onClick={()=>{sendCommentHandler(inputRef.current.value)}}>Отправить</button>
			</div>
			
		</div>
	)
}
export default SendComemnt;