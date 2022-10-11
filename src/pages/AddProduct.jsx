import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
const AddProduct = () => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [price, setPrice] = useState('')
	const [category, setCategory] = useState('')
	const [quantity, setQuantity] = useState('')
	const [photo, setPhoto] = useState('')
	const [shipping, setShipping] = useState('')
	const [categories, setCategories] = useState([])
	const [formData, setFormData] = useState(new FormData())
	const [auth, setAuth] = useState({})
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
		setAuth(JSON.parse(localStorage.getItem('auth')))
	}, [])
	axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`
	const handleSubmit = async (e) => {
		e.preventDefault()
		formData.set('name', name)
		formData.set('description', description)
		formData.set('photo', photo)
		formData.set('price', price)
		formData.set('category', category)
		formData.set('quantity', quantity)
		formData.set('shipping', shipping)

		await axios
			.post(`/product/create/${auth.user._id}`, formData)
			.then((response) => {
				toast.success('Product created successfully')
				setFormData('')
			})
			.catch((error) => console.log(error))
	}
	return (
		<div className='container mt-5'>
			<div className='row'>
				<div className='col-6'>
					<form className='mb-3' method='post' onSubmit={handleSubmit}>
						<h1 className='text-muted'>Add Product</h1>
						<label className='text-muted'>Photo</label>
						<div className='form-group'>
							<label>
								<input
									onChange={(e) => {
										setPhoto(e.target.files[0])
									}}
									className='form-control'
									type='file'
									accept='image/*'
									name='photo'
								/>
							</label>
						</div>
						<div className='form-group'>
							<label className='text-muted'>Name</label>
							<input
								className='form-control'
								type='text'
								onChange={(e) => setName(e.target.value)}
								value={name}
							/>
						</div>
						<div className='form-group'>
							<label className='text-muted'>Description</label>
							<textarea
								style={{ resize: 'none' }}
								className='form-control'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label className='text-muted'>Price</label>
							<input
								className='form-control'
								type='number'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label className='text-muted'>Category</label>
							<select
								className='form-control'
								value={category}
								onChange={(e) => setCategory(e.target.value)}>
								<option default>Select Category</option>
								{categories.map((category) => (
									<option value={category._id} key={category._id}>
										{`${category.name
											.charAt(0)
											.toUpperCase()}${category.name.substring(1)}`}
									</option>
								))}
							</select>
						</div>
						<div className='form-group'>
							<label className='text-muted'>Quantity</label>
							<input
								className='form-control'
								type='number'
								value={quantity}
								onChange={(e) => setQuantity(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label className='text-muted'>Shipping</label>
							<select
								className='form-control'
								value={shipping}
								onChange={(e) => setShipping(e.target.value)}>
								<option default>Select Shipping</option>
								<option value='false'>False</option>
								<option value='true'>True</option>
							</select>
						</div>
						<button className='mt-4 btn btn-primary'>Add Product</button>
					</form>
				</div>
				<div className='col-6'>
					<h4 style={{ textAlign: 'center' }} className='text-muted'>
						Products
					</h4>
				</div>
			</div>
		</div>
	)
}

export default AddProduct
