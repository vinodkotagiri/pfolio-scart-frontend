import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Navbar from './components/component.navbar'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.timeout = 5000
const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Navbar />}>
					<Route index element={<Home />} />
					<Route path='signin' element={<Signin />} />
					<Route path='signup' element={<Signup />} />
				</Route>
			</Routes>
			<Toaster position='top-right' reverseOrder={false} />
		</>
	)
}

export default App
