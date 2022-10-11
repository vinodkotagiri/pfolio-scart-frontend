import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { PencilSquare, Trash3Fill } from 'react-bootstrap-icons'
import axios from 'axios'
const AddCategory = () => {
	const [name, setName] = useState('')
	const [auth, setAuth] = useState({})
	const [categories, setCategories] = useState([])

	//Get categories
	const getCategories = async () => {
		await axios
			.get('/category')
			.then((response) => {
				setCategories(response.data.categories)
			})
			.catch((error) => console.log(error))
	}

	useEffect(() => {
		getCategories()
	}, [])

	useEffect(() => {
		setAuth(JSON.parse(localStorage.getItem('auth')))
	}, [])
	//Set auth token
	axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`

	const handleAddCategory = async (e) => {
		e.preventDefault()
		if (!name) return toast.error('Please enter a name')
		await axios
			.post(`/category/create/${auth.user._id}`, { name })
			.then((response) => {
				toast.success(`Added new category: ${name}`)
				setName('')
				getCategories()
			})
			.catch((error) => {
				toast.error(error.response.data.error)
				console.log(error.response.data.error)
			})
	}

	const handleDeleteCategory = async (data) => {
		const { _id } = data.category
		await axios
			.delete(`/category/${_id}/${auth.user._id}`)
			.then((response) => {
				toast.success(`Deleted category: ${data.category.name}`)
				getCategories()
			})
			.catch((error) => console.log(error))
	}

	return (
		<div className='container mt-5'>
			<div className='row'>
				<div className='col-6'>
					<form>
						<div className='form-group'>
							<label className='text-muted mb-3'>Add Category</label>
							<input
								type='text'
								className='form-control'
								placeholder='Category Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								autoFocus
							/>
						</div>
						<button
							className='btn btn-primary btn-lg mt-4'
							onClick={handleAddCategory}>
							Add
						</button>
					</form>
				</div>
				<div className='col-6'>
					<h4 style={{ textAlign: 'center' }} className='text-muted'>
						Categories
					</h4>
					{categories.map((category, index) => (
						<div
							className='bg-info p-2 m-2'
							style={{
								width: 'fit-content',
								display: 'inline-block',
								border: '1px solid #',
								color: '#fff',
								borderRadius: '1rem',
							}}
							key={index}>
							<span className='mx-1' style={{ textTransform: 'Capitalize' }}>
								{category.name}
							</span>
							<span className='ms-2 me-2'>
								<PencilSquare style={{ cursor: 'pointer', color: 'yellow' }} />
							</span>
							<span className='ms-2 me-2'>
								<Trash3Fill
									style={{ cursor: 'pointer', color: 'orange' }}
									onClick={() => handleDeleteCategory({ category })}
								/>
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default AddCategory
