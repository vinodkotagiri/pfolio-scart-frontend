import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const Navbar = () => {
	const isActive = (location, path) => {
		if (location.pathname === path) {
			return { backgroundColor: '#828282', color: '#e3be4d' }
		} else {
			return { color: '#ffffff' }
		}
	}
	const [loggedIn, setLoggedIn] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (!localStorage.getItem('auth')) setLoggedIn(false)
		else setLoggedIn(true)
	})

	const signout = async () => {
		await axios
			.get('/auth/signout')
			.then((response) => {
				toast.success('Sign out successfully')
				navigate('/')
			})
			.catch((error) => console.log(error))
		if (localStorage.getItem('auth')) {
			localStorage.removeItem('auth')
		}
		setLoggedIn(false)
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

				{!loggedIn ? (
					<>
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
					</>
				) : (
					<>
						<li className='nav-item'>
							<Link
								className='nav-link'
								to='/user/dashboard'
								style={{ color: '#fffff' }}>
								Dashboard
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								className='nav-link'
								onClick={signout}
								style={{ color: '#fffff' }}>
								Signout
							</Link>
						</li>
					</>
				)}
			</ul>
			<Outlet />
		</>
	)
}

export default Navbar
