import React from 'react'

function Logout(props) {
	React.useEffect(() => {
		localStorage.clear()
		window.location.href = '/'
	}, [])

	return <></>
}

export default Logout
