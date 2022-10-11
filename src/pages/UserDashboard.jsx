import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const UserDashboard = () => {
	const [user, setUser] = useState({})
	//Check if user logged iñelse redirect to the login page
	const navigate = useNavigate()
	useEffect(() => {
		if (!localStorage.getItem('auth')) {
			navigate('/signin')
		}
		if (JSON.parse(localStorage.getItem('auth')).user.role !== 0) {
			navigate('/admin/dashboard')
		}
		if (localStorage.getItem('auth')) {
			setUser(JSON.parse(localStorage.getItem('auth')).user)
		}
	}, [navigate, setUser])

	return (
		<div className='container-fluid mt-5'>
			<div className='row'>
				<div className='col-3'>
					<div className='card mb-5'>
						<h3 className='card-header'>User Links</h3>
						<ul className='list-group'>
							<li className='list-group-item'>
								<NavLink to='/cart' className='nav-link'>
									Cart
								</NavLink>
							</li>
							<li className='list-group-item'>
								<NavLink className='nav-link' to='/profile'>
									Profile
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
				<div className='col-9'>
					<div className='card mb-5'>
						<h3 className='card-header'>User Information</h3>
						<ul className='list-group'>
							<li className='list-group-item'>{user.name}</li>
							<li className='list-group-item'>{user.email}</li>
							<li className='list-group-item'>
								{user.role === 1 ? 'Admin' : 'Registered User'}
							</li>
						</ul>
					</div>
					<div className='card mb-5'>
						<h3 className='card-header'>Purchase history</h3>
						<ul className='list-group'>
							<li className='list-group-item'>{user.history}</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserDashboard
