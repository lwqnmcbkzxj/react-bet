import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from '../AdminTablePage.module.scss'
import { Switch, Route } from 'react-router'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

type AdminTableType = {
	id: number
	pageLink: string
	deleteFunction: (id: number) => void
	AdditionalActionComponent?: any
}


const ActionsBlock: FC<AdminTableType> = ({ id, pageLink, deleteFunction, AdditionalActionComponent, ...props }) => {
	return (
		<div className={s.actionsBlock}>
			{AdditionalActionComponent && <AdditionalActionComponent id={id} />}
			<Link to={`${pageLink}/${id}/edit`}><FontAwesomeIcon icon={faPencilAlt} /></Link>
			<button onClick={() => { deleteFunction(id) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
			
		</div>
	)
}

export default ActionsBlock;