import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'

/*
PROPS

id required
title default ''
body default ''
position ['left', 'right', 'bottom', 'top'] default left

*/

function OffCanvas(props) {
	return ReactDOM.createPortal(
		<div
			className={classnames('offcanvas', {
				'offcanvas-end': props.position === 'right',
				'offcanvas-bottom': props.position === 'bottom',
				'offcanvas-top': props.position === 'top',
				'offcanvas-start': !['right', 'bottom', 'top'].includes(props.position),
			})}
			tabindex='-1'
			id={props.id}
			aria-labelledby='offcanvasLabel'
		>
			<div className='offcanvas-header'>
				<h5 className='offcanvas-title' id='offcanvasLabel'>
					{props.title ? props.title : <></>}
				</h5>
				<button
					type='button'
					className='btn-close text-reset'
					data-bs-dismiss='offcanvas'
					aria-label='Close'
				></button>
			</div>
			<div className='offcanvas-body'>{props.body ? props.body : <></>}</div>
		</div>,
		document.getElementById('offcanvas-container')
	)
}

export default OffCanvas
