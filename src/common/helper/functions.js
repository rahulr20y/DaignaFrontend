import ReactDOM from 'react-dom'

export function compare(val1, val2) {
	if (JSON.stringify(val1) === JSON.stringify(val2)) {
		return true
	} else {
		return false
	}
}

export function initialGenerator(text = '') {
	if (text === '') return ''
	if (text.length <= 2) return text.toUpperCase()
	else {
		let temp = text.split(' '),
			temps = '',
			i = 1
		if (temp.length > 1) {
			while (i <= 2) {
				temps = temps + temp[i - 1].charAt(0)
				i++
			}
			return temps.toUpperCase()
		} else {
			return text.substring(0, 2).toUpperCase()
		}
	}
}

export function showAlertMessage(
	message = '',
	type = 'primary',
	time = 3000,
	containerID = 'toast-container'
) {
	let element = document.getElementById(containerID)
	if (![null, undefined, ''].includes(element)) {
		ReactDOM.render(
			<div
				id='test'
				className={'toast fade align-items-center text-white border-0 bg-' + type}
				role='alert'
				aria-live='assertive'
				aria-atomic='true'
			>
				<div className='d-flex'>
					<div className='toast-body fw-bold'>{message}</div>
					<button
						type='button'
						className='btn-close btn-close-white me-2 m-auto'
						data-bs-dismiss='toast'
						aria-label='Close'
					></button>
				</div>
			</div>,
			element,
			() => {
				let toast = new window.bootstrap.Toast(document.getElementById('test'), {
					delay: time,
				})
				toast.show()
			}
		)
	}
}

export function debounce(callback, time = 500) {
	window.clearTimeout(window.debounceTimer)
	window.debounceTimer = window.setTimeout(callback, time)
}
