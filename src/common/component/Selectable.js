import React from 'react'
import { Elements, ListItem, Spinner } from '../index'

// searchSize => size of search box
// loading => loading
// searchPlaceHolder => search box placeholder
// search => boolean
// valuekey => key representing value
// labelkey => key representing label text
// onClick => function on option click
// selected => array containing selected value
// options => array of option objects

function Selectable(props) {
	const [search, setSearch] = React.useState('')

	function display(search) {
		let comp = []
		props.options.forEach((item) => {
			if (item[props.labelkey].toLowerCase().includes(search.toLowerCase()))
				comp.push(
					<ListItem
						key={item[props.valuekey]}
						text={item[props.labelkey]}
						active={props.selected.includes(item[props.valuekey])}
						className='border-bottom'
						onClick={props.onClick ? () => props.onClick(item) : () => {}}
					/>
				)
		})
		return comp
	}

	return (
		<div style={{ height: props.height !== undefined ? props.height : '250px' }}>
			{props.search !== false ? (
				<Elements
					formField={[
						{
							id: 'workspace_search',
							className: 'mb-0 p-2 border-bottom',
							type: 'text',
							disabled: props.loading,
							placeholder: props.searchPlaceHolder
								? props.searchPlaceHolder
								: 'Search..',
							size: props.searchSize ? props.searchSize : 'sm',
							value: search,
							onchange: setSearch,
						},
					]}
				/>
			) : (
				<></>
			)}

			<div className='w-100 h-100' style={{ overflow: 'hidden auto' }}>
				{props.loading ? (
					<div className='vertical-center'>
						{' '}
						<Spinner />{' '}
					</div>
				) : (
					display(search)
				)}
			</div>
		</div>
	)
}

export default Selectable
