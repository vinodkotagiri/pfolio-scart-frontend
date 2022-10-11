import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'

const AdminDashboard = () => {
	const [user, setUser] = useState({})
	//Check if user logged iñelse redirect to the login page
	const navigate = useNavigate()
	useEffect(() => {
		if (!localStorage.getItem('auth')) {
			navigate('/signin')
		}
		if (JSON.parse(localStorage.getItem('auth')).user.role !== 1) {
			navigate('/user/dashboard')
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
						<h3 className='card-header'>Admin Links</h3>
						<ul className='list-group'>
							<li className='list-group-item'>
								<NavLink to='/category/create' className='nav-link'>
									Create Category
								</NavLink>
							</li>
							<li className='list-group-item'>
								<NavLink className='nav-link' to='/product/create'>
									Create Product
								</NavLink>
							</li>
						</ul>
					</div>
				</div>
				<div className='col-9'>
					<div className='card mb-5'>
						<h3 className='card-header'>Admin Information</h3>
						<ul className='list-group'>
							<li className='list-group-item'>{user.name}</li>
							<li className='list-group-item'>{user.email}</li>
							<li className='list-group-item'>
								{user.role === 1 ? 'Admin' : 'Registered User'}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
