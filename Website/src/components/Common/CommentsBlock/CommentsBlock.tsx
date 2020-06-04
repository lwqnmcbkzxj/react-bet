import React, { FC, useState, useEffect } from 'react';
import s from './CommentsBlock.module.scss';
import SendComment from './SendComment'
import Comment from './Comment'
import { CommentType } from '../../../types/types';
import { toggleAuthFormVisiblility, sendComment } from '../../../redux/app-reducer'

import { useDispatch, useSelector } from "react-redux"

import { getForecastComments } from '../../../redux/forecasts-reducer'
import BorderedSelectors from '../Selectors/BorderedSelector/BorderedSelector';

type CommentsBlockPropsType = {
	comments: Array<CommentType>

	type: string
	elementId: number

	commentsFunctions: {
		refreshComments: () => void
		commentFilter: string
		setCommentFilter: (filterName: any) => void
	}
}

enum selectors {
	by_order = "by_order",
	popularity = "popularity"
}


const CommentsBlock: FC<CommentsBlockPropsType> = ({ type, elementId, comments = [], commentsFunctions, ...props }) => {
	const dispatch = useDispatch()


	const handleTabChange = (tabName: any) => {
		commentsFunctions.setCommentFilter(tabName)
	}
	
	
	let commentsWord = ""
	if (comments.length === 1)
		commentsWord = 'комментарий'
	else if (comments.length >= 2 && comments.length <= 4)
		commentsWord = 'комментария'
	else
		commentsWord = 'комментариев'


	const sendCommentDispatch = async (text: string, reply_id?: number) => {
		await dispatch(sendComment(elementId, type, text, reply_id))
		commentsFunctions.refreshComments()
	}



	return (
		<div className={s.commentsBlock}>
			<div className={s.commentsHeader}>{comments.length} {commentsWord}</div>

			<BorderedSelectors
				listName="commentsSelector"
				changeVisibleTab={handleTabChange}
				selectors={[
					{ name: selectors.popularity, text: "По популярности" },
					{ name: selectors.by_order, text: "По порядку" },
				]}
				initialValue={commentsFunctions.commentFilter}
			/>
			
			<SendComment sendCommentFunc={sendCommentDispatch} style={{ marginTop: '20px' }}/>

			{comments.map((comment, counter) =>
				!comment.replies_to &&
				<Comment
					comment={comment}
					comments={comments}
					key={counter}


					sendCommentFunc={sendCommentDispatch}
				/>
			)}

			{comments.length > 0 && <SendComment active={true} sendCommentFunc={sendCommentDispatch} />}
			{comments.length === 0 && <div className={s.noComments}>Дискуссия еще не началась,	оставьте первый комментарий</div>}
		</div>
	)
}
export default CommentsBlock;