import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
const Signin = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [disabled, setDisabled] = useState(true)
	const [user, setUser] = useState({})
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem('auth')) {
			navigate('/user/dashboard')
		}
	})

	useEffect(() => {
		//Check if all the fields are filled
		if (
			email &&
			password &&
			email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
		) {
			setDisabled(false)
		} else {
			setDisabled(true)
		}
		setUser({ email, password })
	}, [email, password])
	const handleSubmit = async () => {
		await axios
			.post('/auth/signin', user)
			.then((response) => {
				localStorage.setItem('auth', JSON.stringify(response.data))
				toast.success(`Welcome, ${response.data.user.name}!`)
				setTimeout(() => {
					if (response.data.user.role === 1) {
						navigate('/admin/dashboard')
					} else {
						navigate('/user/dashboard')
					}
				}, 1000)
			})
			.catch((err) => {
				console.log(err.response.data.error)
				toast.error(err.response.data.error)
			})
	}
	return (
		<div>
			<h1 className='mt-5' style={{ textAlign: 'center' }}>
				Signin
			</h1>
			<form
				className='container mt-2 py-5'
				style={{ width: '33vw', margin: '0 auto' }}>
				<div className='mb-2'>
					<label htmlFor='exampleFormControlInput1' className='form-label'>
						Email
					</label>
					<input
						type='email'
						className='form-control'
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
							Signin
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
					Don't have an account?
					<span className='ms-4'>
						<strong>
							<Link to='/signup' style={{ textDecoration: 'none' }}>
								Sign up
							</Link>
						</strong>
					</span>
				</div>
			</form>
		</div>
	)
}

export default Signin
