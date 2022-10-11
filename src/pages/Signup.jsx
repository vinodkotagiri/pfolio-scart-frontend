import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const Signup = () => {
	const navigate = useNavigate()
	//Create a new userState
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState({})
	//Disable button initially to verify all fields are filled
	const [disabled, setDisabled] = useState(true)
	//Handle Submit
	const handleSubmit = async () => {
		await axios
			.post('/auth/signup', user)
			.then((response) => {
				toast.success('User successfully signed up!')
				setTimeout(() => navigate('/'), 2500)
			})
			.catch((error) => {
				console.log(error.response.data.error)
				toast.error(error.response.data.error)
			})
	}
	useEffect(() => {
		if (localStorage.getItem('auth')) {
			navigate('/user/dashboard')
		}
	})
	useEffect(() => {
		//Check if all the fields are filled
		if (
			name &&
			email &&
			password &&
			password.length > 5 &&
			email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
		) {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
		setUser({ name, email, password })
	}, [name, email, password])

	return (
		<div>
			<h1 className='mt-5' style={{ textAlign: 'center' }}>
				User Registration
			</h1>
			<form
				className='container mt-2 py-5'
				style={{ width: '33vw', margin: '0 auto' }}>
				<div className='mb-2'>
					<label htmlFor='exampleFormControlInput1' className='form-label'>
						Name
					</label>
					<input
						type='text'
						className='form-control'
						id='exampleFormControlInput1'
						placeholder='Enter your name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className='mb-2'>
					<label htmlFor='exampleFormControlInput1' className='form-label'>
						Email
					</label>
					<input
						type='email'
						className='form-control'
						id='exampleFormControlInput1'
						placeholder='Enter your Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='mb-2'>
					<label htmlFor='exampleFormControlInput1' className='form-label'>
						Password
					</label>
					<input
						type='password'
						className='form-control'
						id='exampleFormControlInput1'
						placeholder='Enter your Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='d-flex justify-content-center align-items-end'>
					{!disabled ? (
						<button
							type='button'
							onClick={handleSubmit}
							className='btn btn-success btn-lg mt-3 mb-2 px-5'>
							Signup
						</button>
					) : (
						<p
							style={{
								color: 'red',
								fontWeight: 'lighter',
								fontStyle: 'italic',
							}}>
							*Enter All the details
						</p>
					)}
				</div>
				<div className='mt-3 '>
					Already have an account?
					<span className='ms-4'>
						<strong>
							<Link to='/signin' style={{ textDecoration: 'none' }}>
								Sign in
							</Link>
						</strong>
					</span>
				</div>
			</form>
		</div>
	)
}

export default Signup
