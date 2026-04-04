import React from 'react'
import classnames from 'classnames'

function Spinner(props) {
	return (
		<div
			className={classnames(props.className, {
				'spinner-border': props.type === undefined || props.type === 'spinner',
				'spinner-grow': props.type === 'grow',
				'spinner-border-sm':
					(props.type === undefined || props.type === 'spinner') &&
					props.size === 'sm',
				'spinner-grow-sm': props.type === 'grow' && props.size === 'sm',
			})}
			role='status'
		>
			<span className='visually-hidden'>Loading...</span>
		</div>
	)
}

export default Spinner
