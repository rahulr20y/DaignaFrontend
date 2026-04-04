// PROPS:
// listItems: [{value:elementvalue,className:elementclass}]; where value is value of the list and className is the class for each elemtnts
// fronticon: htmlElement; we can add <i> tag of button containing icon
// backicon: htmlElement; sames ad above fronticon

import React from 'react'
import classnames from 'classnames'

function ListItem(props) {
	return (
		<ul
			className={classnames(
				props.className === undefined ? '' : props.className,
				'list-group'
			)}
		>
			{props.listItems.map((item) => {
				return (
					<li
						className={classnames(
							item.className === undefined ? '' : item.className,
							'list-group-item'
						)}
					>
						{props.fronticon === undefined ? '' : props.fronticon}
						{item.value}
						{props.backicon === undefined ? '' : props.backicon}
					</li>
				)
			})}
		</ul>
	)
}

export default ListItem
