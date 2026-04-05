import axios from 'axios'
import store from '../../redux/store'
// props-> entity
async function API(entity) {
	const reduxState = store.getState()

	const progress = (progressPercent, entity) => {
		if (entity.isfile && entity.uploadprogress) {
			return entity.uploadprogress(progressPercent)
		}
	}
	// setting the authorization tokeen
	const fixedHeaders = {
		Authorization: reduxState.general.token.access_token
			? `Bearer ${reduxState.general.token.access_token}`
			: '',
	}
	return axios({
		url:
			process.env.REACT_APP_ENV === 'dev'
				? entity.callurl
				: `/api${entity.callurl}`,
		method: entity.callmethod,
		params: entity.urlparams,
		data: entity.bodydata,
		onUploadProgress: (progressEvent) =>
			progress(
				Math.round((progressEvent.loaded * 100) / progressEvent.total),
				entity
			),
		headers: entity.isfile
			? { ...fixedHeaders, 'Content-Type': 'multipart/form-data' }
			: { ...fixedHeaders, 'Content-Type': 'application/json' },
		timeout: 0,
		cancelToken: entity.cancelToken,
	})
		.then((res) => {
			entity.callback(res)
		})
		.catch((err) => {})
}

export default API
