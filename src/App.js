import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Navbar from './components/component.navbar'
import { Toaster } from 'react-hot-toast'
import axios from 'axios'
import AddCategory from './pages/AddCategory'
import AddProduct from './pages/AddProduct'

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
					<Route path='user/dashboard' element={<UserDashboard />} />
					<Route path='admin/dashboard' element={<AdminDashboard />} />
					<Route path='*' element={<Navigate to='/' />} />
					<Route path='category/create' element={<AddCategory />} />
					<Route path='product/create' element={<AddProduct />} />
				</Route>
			</Routes>
			<Toaster position='top-right' reverseOrder={false} />
		</>
	)
}

export default App
