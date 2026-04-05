import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import dayjs from 'dayjs'

import OAuth from './component/oauth'
import OAuthResponse from './component/oauth_response'
import { AuthBG } from '../../img'

function Auth(props) {
	if (props.token.access_token) return <Redirect to='/app/' />
	return (
		<div style={{ 
			backgroundImage: `url(${AuthBG})`, 
			backgroundSize: 'cover', 
			backgroundPosition: 'center',
			backgroundRepeat: 'no-repeat'
		}}>
			<div className='container'>
				<div className='row vh-100 d-flex justify-content-center'>
					<div className='col-12 align-self-center'>
						<div className='row'>
							<div className='col-lg-5 col-md-8 mx-auto'>
								<div className='card border-0' style={{ 
									backgroundColor: 'rgba(255, 255, 255, 0.75)',
									backdropFilter: 'blur(20px)',
									WebkitBackdropFilter: 'blur(20px)',
									borderRadius: '28px',
									boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)'
								}}>
									<div className='card-body p-5 text-center'>
										<div className='mb-5'>
											<h1 className='text-gradient font-premium' style={{ fontSize: '36px' }}>
												{props.brandname}
											</h1>
											<p className='text-subtle mt-2 fs-16'>Your community, elevated.</p>
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

										<div className='mt-5 pt-3 border-top' style={{ opacity: 0.6 }}>
											<p className='text-muted small mb-0'>
												{props.brandname} &copy; {dayjs().format('YYYY')}
											</p>
										</div>
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
