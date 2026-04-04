/*
PROPS:
    type [filled, empty] default empty
    onTabClick default empty function
    tabs array of objects eg[{id, text (component) Required }]
    activeTab id of tab
    linkClass
*/

import React from 'react'
import classnames from 'classnames'

function Tab(props) {
	return (
		<>
			<ul
				className={classnames(
					props.tabGroupClass !== undefined
						? 'nav nav-justified ' + props.tabGroupClass
						: 'nav nav-justified',
					{
						'nav-pills': props.type === 'filled',
						'nav-tabs': props.type === 'empty' || props.type === undefined,
					}
				)}
				role='tablist'
			>
				{props.tabs.map((field) => {
					return (
						<li
							key={field.id}
							id={field.id}
							className={props.linkClass ? props.linkClass + ' nav-item' : 'nav-item'}
							onClick={
								props.onTabClick && !field.disabled
									? () => {
											props.onTabClick(field.id)
									  }
									: () => {}
							}
							style={{ cursor: 'pointer' }}
						>
							<span
								className={classnames('nav-link', {
									active: props.activeTab === field.id,
									'text-secondary': field.disabled,
								})}
							>
								{field.text}
							</span>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default Tab
