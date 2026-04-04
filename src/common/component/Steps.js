import React from 'react'
import classnames from 'classnames'

/*
size: [sm, md, lg] default sm
justified: boolean default false
direction: [vertical, horizontal] default horizontal
currentStep: number required
steps: array of objects required [{
    title: 'step title' text  required
    icon: component
}]
*/

function Steps(props) {
	function stepsGenerator(steps) {
		return steps.map((item, i) => {
			return (
				<li
					key={item.title + i}
					className={classnames('step-item', {
						active: props.currentStep === i + 1,
						complete: props.currentStep > i + 1,
					})}
				>
					<div className='step-link'>
						{item.icon ? (
							<span className='step-icon'>{item.icon}</span>
						) : (
							<span className='step-number'>{i + 1}</span>
						)}
						<span className='step-title'>{item.title}</span>
					</div>
				</li>
			)
		})
	}

	return (
		<ul
			className={classnames('steps mb-2', {
				'steps-sm': props.size === undefined || props.size === 'sm',
				'steps-lg': props.size === 'lg',
				'steps-justified': props.justified,
				'steps-vertical': props.direction === 'vertical',
			})}
			style={{ overflow: 'hidden' }}
		>
			{stepsGenerator(props.steps)}
		</ul>
	)
}

export default Steps
