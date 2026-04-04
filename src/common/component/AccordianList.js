import React from 'react'
import classnames from 'classnames'

function Accordian(props) {
	// id => Accordian id
	// body => Accordian Body
	// text => Display Text or Component
	const [state, setState] = React.useState(false)

	return (
		<div className='card mb-0'>
			<div className='card-header p-0 bg-light'>
				<h2 className='mb-0'>
					<button
						className='btn btn-link btn-block text-start'
						type='button'
						onClick={() => setState(!state)}
					>
						{typeof props.text === 'string' ? (
							<div className='d-flex'>
								<div className='text-turncate flex-grow-1'> {props.text} </div>
								<span>
									{' '}
									{state ? (
										<i className='bi bi-chevron-up' />
									) : (
										<i className='bi bi-chevron-down' />
									)}{' '}
								</span>
							</div>
						) : (
							props.text
						)}
					</button>
				</h2>
			</div>
			<div id={props.id} className={classnames('collapse', { show: state })}>
				<div className='card-body p-0'>{props.body}</div>
			</div>
		</div>
	)
}

function AccordianList(props) {
	// accordian => Accordian array of objects
	// id => Accordian Parent ID

	const accordians = props.accordian.map((item) => (
		<Accordian key={item.id} {...item} />
	))

	return (
		<div className='accordion' id={props.id}>
			{accordians}
		</div>
	)
}

export default AccordianList
