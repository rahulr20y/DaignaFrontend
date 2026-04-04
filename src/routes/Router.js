import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Spinner } from '../common/index'

const Auth = React.lazy(() => import('../pages/auth/auth'))
const ProtectedWebPage = React.lazy(() => import('./protected-router'))

function WebPage() {
	React.useEffect(() => {
		// window.OverlayScrollbars(document.querySelectorAll('body'), { "scrollbars": { "autoHide": 'scroll' } })
	}, [])

	return (
		<React.Suspense fallback={<Spinner />}>
			<Router>
				<Switch>
					<Route path='/app/' component={ProtectedWebPage} />
					<Route path='/' component={Auth} />
				</Switch>
			</Router>
		</React.Suspense>
	)
}

export default WebPage
