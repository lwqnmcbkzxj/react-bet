import React, { FC, useState } from 'react';
import s from './Comment.module.scss';
import '../../App.scss'

type CommentPropsType = {
}
const Comment: FC<CommentPropsType> = ({ ...props }) => {
	return (
		<div className={s.comment}>
			
		</div>
	)
}
export default Comment;