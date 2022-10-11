import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

const Navbar = () => {
	const isActive = (location, path) => {
		if (location.pathname === path) {
			return { backgroundColor: '#828282', color: '#e3be4d' }
		} else {
			return { color: '#ffffff' }
		}
	}
	const location = useLocation()
	return (
		<>
			<ul className='nav nav-tabs bg-dark '>
				<li className='nav-item'>
					<Link className='nav-link' to='/' style={isActive(location, '/')}>
						Home
					</Link>
				</li>
				<li className='nav-item'>
					<Link
						className='nav-link'
						to='/signin'
						style={isActive(location, '/signin')}>
						Signin
					</Link>
				</li>
				<li className='nav-item'>
					<Link
						className='nav-link'
						to='/signup'
						style={isActive(location, '/signup')}>
						Signup
					</Link>
				</li>
			</ul>
			<Outlet />
		</>
	)
}

export default Navbar
