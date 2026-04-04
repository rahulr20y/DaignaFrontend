import { generalstate } from '../gvariables'

const GeneralReducer = (state = generalstate, action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case 'USER_DETAILS':
			state = {
				...state,
				profile: action.userdetails.profile,
				token: action.userdetails.token,
				group: action.userdetails.groups,
				location: {
					base: action.userdetails.profile.location,
					current: action.userdetails.profile.location,
				},
			}
			break
		case 'USER_UPDATE':
			state = {
				...state,
				profile: action.userdetails,
			}
			break
		case 'ADD_GROUP':
			state = {
				...state,
				group: state.group.concat(action.group),
			}
			break
		case 'UPDATE_LOCATION':
			console.log(action.location)
			state = {
				...state,
				location: action.location,
			}
			break
	}

	return state
}

export default GeneralReducer
