/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Tippy from '@tippyjs/react'
import classnames from 'classnames'

function ListItem(props) {
	return (
		<div
			className={classnames(
				props.className,
				'askdata-list-item d-flex align-items-center px-2 py-1',
				{
					'bg-primary text-white': props.active,
					'bg-light': props.disabled === true,
				}
			)}
			onClick={props.disabled === true ? () => {} : props.onClick}
			style={{
				height: '30px',
				cursor: props.disabled === true ? 'default' : 'pointer',
			}}
		>
			{props.text}
		</div>
	)
}

function ContextMenu(props) {
	const [currPanel, setcurrPanel] = React.useState('main')
	const [title, setTitle] = React.useState(props.content['main'].title)

	function createList(list) {
		let domlist = []

		list.forEach((item, i) => {
			domlist.push(
				<ListItem
					key={'list-home-list' + item.btnName + i}
					text={item.btnName}
					className='border-bottom'
					id={'list-home-list' + item.btnName + i}
					onClick={
						item.onClick !== undefined
							? item.onClick
							: () => {
									onclick(item.selector)
							  }
					}
					disabled={item.disabled ? item.disabled : false}
				/>
			)
		})

		return (
			<div className='list-group' id='list-tab' role='tablist'>
				{' '}
				{domlist}{' '}
			</div>
		)
	}

	function onclick(newSelector) {
		setcurrPanel(newSelector)
		setTitle(props.content[newSelector].title)
	}

	function content(content) {
		if (Array.isArray(content[currPanel].content))
			return createList(content[currPanel].content)
		else return content[currPanel].content
	}

	return (
		<Tippy
			allowHTML={true}
			appendTo={props.appendTo ? props.appendTo : () => document.body}
			interactive={true}
			trigger={props.trigger ? props.trigger : 'click'}
			placement={props.placement ? props.placement : 'right'}
			theme={props.theme ? props.theme : 'light-border'}
			maxWidth={props.maxWidth ? props.maxWidth : 350}
			getReferenceClientRect={
				props.getReferenceClientRect ? props.getReferenceClientRect : null
			}
			arrow={props.arrow !== undefined ? props.arrow : false}
			onHide={props.onHide ? props.onHide : () => {}}
			onCreate={
				props.button === undefined
					? (e) => {
							e.show()
					  }
					: () => {}
			}
			offset={props.offset !== undefined ? props.offset : [0, 10]}
			content={
				<div style={{ minWidth: '225px', fontFamily: '"Roboto", sans-serif' }}>
					{title !== '' ? (
						<div
							className='text-turncate dropdown-header border-bottom d-flex align-items-center px-2'
							style={{ height: '34px' }}
						>
							{currPanel !== 'main' ? (
								<span
									className='d-flex align-items-center font-weight-bold'
									style={{ cursor: 'pointer' }}
									onClick={(e) => {
										setTitle(props.content[props.content[currPanel].parent].title)
										setcurrPanel(props.content[currPanel].parent)
										e.stopPropagation()
									}}
								>
									<i className='bi bi-chevron-left' />
									<strong className='m-0 ms-1 text-muted'>{title}</strong>
								</span>
							) : (
								<strong className='m-0 ms-1 text-muted'>{title}</strong>
							)}
						</div>
					) : (
						<></>
					)}
					{content(props.content)}
				</div>
			}
			className='p-0'
		>
			{props.button ? props.button : <></>}
		</Tippy>
	)
}

export default ContextMenu
