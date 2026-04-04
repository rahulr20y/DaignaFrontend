import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import dayjs from 'dayjs'

import OAuth from './component/oauth'
import OAuthResponse from './component/oauth_response'

function Auth(props) {
	if (props.token.access_token) return <Redirect to='/app/' />
	return (
		<div style={{ background: 'rgb(247, 247, 247)' }}>
			<div className='container'>
				<div className='row vh-100 d-flex justify-content-center'>
					<div className='col-12 align-self-center'>
						<div className='row'>
							<div className='col-lg-5 mx-auto'>
								<div className='card shadow'>
									<div className='card-body p-0 bg-dark'>
										<div className='text-center p-3'>
											<h4 className='my-1 font-weight-semibold text-white font-18'>
												{props.brandname}
											</h4>
											<p className='text-muted  mb-0'>Sign in to Continue</p>
										</div>
									</div>

									<Switch>
										<Route path={'/get-started'}>
											<OAuth brandname={props.brandname} />
										</Route>
										<Route path={'/get-response'}>
											<OAuthResponse
												queryString={props.location.search}
												brandname={props.brandname}
											/>
										</Route>
										<Route exact path={'/'}>
											<OAuth brandname={props.brandname} />
										</Route>
									</Switch>

									<div className='card-body bg-light text-center border-top'>
										<span className='text-muted d-none d-sm-inline-block'>
											{props.brandname} © {dayjs().format('Y')}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.general.token,
		brandname: state.general.brandname,
	}
}

export default connect(mapStateToProps, null)(Auth)
