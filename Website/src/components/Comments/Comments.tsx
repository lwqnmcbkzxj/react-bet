import React, { FC } from 'react';
import s from './Comments.module.scss';
import { CommentType, BannerPositionEnum } from '../../types/types'
import LiveBtn from '../Header/LiveBtn/LiveBtn';
import Comment from './Comment'
import { Banner } from '../Adverts/Banner';
import classNames from 'classnames';

type CommentsPropsType = {
	comments: Array<CommentType>,
	isCommentsBlockVisible: boolean
	toggleCommentsBlockVisibility: () => void
}

const Comments: FC<CommentsPropsType> = ({ comments, isCommentsBlockVisible, toggleCommentsBlockVisibility, ...props }) => {
	// Comments or toggle button
	let renderBlock
	if (isCommentsBlockVisible) {
		renderBlock = comments.map(comment => <Comment key={comment.id} comment={comment} />)
	} else {
		renderBlock = <LiveBtn toggleCommentsBlockVisibility={toggleCommentsBlockVisibility} />
	}
	return (
		<div className={classNames(s.commentsHolder, {[s.hidden]: !isCommentsBlockVisible })}>
			<div className={s.comments}>
				{renderBlock}
				<Banner position={BannerPositionEnum.comments}/>
			</div>
		</div>
	)
}

export default Comments;