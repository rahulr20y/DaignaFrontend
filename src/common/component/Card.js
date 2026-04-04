import React from 'react'

// props
// optional
// classNames
// style
// onClick
// header
// headerClass
// body
// bodyClass
// footer
// footerClass

function Card(props) {
	return (
		<div
			className={
				props.className !== undefined ? 'card ' + props.className : 'card '
			}
			onClick={props.onClick !== undefined ? props.onClick : () => {}}
			style={props.style !== undefined ? props.style : {}}
		>
			{props.header !== undefined ? (
				<div
					style={props.headStyle ? props.headStyle : {}}
					className={
						props.headerClass !== undefined
							? 'card-header ' + props.headerClass
							: 'card-header'
					}
				>
					{props.header}
				</div>
			) : (
				<></>
			)}

			{props.body !== undefined ? (
				<div
					style={props.bodyStyle ? props.bodyStyle : {}}
					className={
						props.bodyClass !== undefined
							? 'card-body ' + props.bodyClass
							: 'card-body'
					}
				>
					{props.body}
				</div>
			) : (
				<></>
			)}

			{props.footer !== undefined ? (
				<div
					className={
						props.footerClass !== undefined
							? 'card-footer ' + props.footerClass
							: 'card-footer'
					}
				>
					{props.footer}
				</div>
			) : (
				<></>
			)}
		</div>
	)
}

export default Card
