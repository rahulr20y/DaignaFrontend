import React from 'react'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		// logErrorToMyService(error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className='row'>
					<div className='col-sm-12'>
						<div className='page-title-box'>
							<div className='row'>
								<div className='col'>
									<h4 className='page-title'>
										OOPS <i class='bi bi-emoji-dizzy'></i>! Something Went Worng, Try
										Again
									</h4>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
