import React from 'react'
import {
	Button,
	Offcanvas,
	Elements,
	debounce,
	links,
	API,
	initialGenerator,
} from '../index'
import { NavLink } from 'react-router-dom'

function Search(props) {
	const [typedText, setTypedText] = React.useState('')
	const [suggestEntities, setSuggestEntities] = React.useState([])
	React.useEffect(() => {
		if (typedText.length > 0) debounce(getEntitiesSuggestions)
	}, [typedText])

	const getEntitiesSuggestions = () => {
		API({
			...links.get_global_search,
			urlparams: { query: typedText },
			bodydata: {},
			isfile: false,
			callback: (res) => {
				if (res.data.status === 200) {
					setSuggestEntities(res.data.data)
				}
			},
		})
	}

	function EntityType(EntityType) {
		if (EntityType === 0) return 'User'
		else if (EntityType === 1) return 'Group'
		else if (EntityType === 2) return 'Business'
		else return ''
	}

	function EntityRoute(item) {
		if (item.entity_type === 1) return `/app/group/${item.unique_name}?tab=post`
		else if (item.entity_type === 0) return `/app/profile/${item.unique_name}`
		else if (item.entity_type === 2) return `/app/business/${item.unique_name}`
		else return ''
	}
	const handleSearchSelect = () => {
		setTypedText('')
		setSuggestEntities([])
		window.bootstrap.Offcanvas.getOrCreateInstance(
			document.getElementById('search_offcanvas')
		).hide()
	}

	return (
		<>
			<Button
				text={<i className='bi bi-search mx-2' />}
				variant='icon'
				color='dark'
				className='font-16 fw-bold mw-100'
				toggle='offcanvas'
				target='search_offcanvas'
			/>
			<Offcanvas
				id='search_offcanvas'
				position='right'
				title='Search'
				body={
					<>
						<Elements
							formField={[
								{
									type: 'text',
									id: 'seach',
									value: typedText,
									onchange: (value, id) => {
										setTypedText(value)
									},
									className: 'my-2',
									label: 'Global Search',
								},
							]}
						/>

						<div className='my-4'>
							{suggestEntities.length === 0 ? (
								<p className='mx-1'>
									{typedText === ''
										? 'Start typing to get suggestions...'
										: "Looks like there isn't any enitity with that name. Try searching with an alternate name."}
								</p>
							) : (
								suggestEntities.map((item) => {
									return (
										<div className='my-2 p-2 bg-light'>
											<NavLink
												to={EntityRoute(item)}
												onClick={() => {
													handleSearchSelect()
												}}
											>
												<div className='d-flex'>
													{item.picture.length == 0 ? (
														<>
															<div className='text-center'>
																<div className='avatar-box thumb-sm align-self-center'>
																	<span className='avatar-title bg-soft-primary rounded-circle'>
																		{initialGenerator(item.display_name)}
																	</span>
																</div>
															</div>
														</>
													) : (
														<img
															src={item.picture}
															alt='user'
															className='rounded-circle thumb-sm'
														/>
													)}

													<div className='media-body align-self-center ms-2'>
														<p className='font-14 font-weight-semibold mb-0'>
															{item.display_name}
														</p>
														<p className='mb-0 font-12 text-muted'>@{item.unique_name}</p>
													</div>

													<div className='col-auto align-self-center'>
														<div className='button-items'>{EntityType(item.entity_type)}</div>
													</div>
												</div>
											</NavLink>
										</div>
									)
								})
							)}
						</div>
					</>
				}
			/>
		</>
	)
}

export default Search
