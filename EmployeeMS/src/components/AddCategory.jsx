import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCategory = () => {
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('https://employee-management-system-bnlb.onrender.com/auth/add_category', { category })
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/category')
                } else {
                    alert(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='p-3 rounded border'>
                        <h2>Add Category</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="category"><strong>Category:</strong></label>
                                <input
                                    type="text"
                                    name='category'
                                    placeholder='Enter Category'
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className='form-control'
                                />
                            </div>
                            <button className='btn btn-success w-100 mb-2'>Add Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory
