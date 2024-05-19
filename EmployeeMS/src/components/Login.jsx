import { useState } from 'react';
import './style.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const[error , setError] = useState();
    const navigate = useNavigate() ;
    const handleSubmit =(event)=>{
        event.preventDefault();
        axios.post('http://localhost:3000/auth/adminlogin',values).then((result)=>{
            if(result.data.LoginStatus){
                navigate('/dashboard') ;
            }
            else{
                setError(result.data.Error) ;
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <div className='container-fluid'>
            <div className='row justify-content-center align-items-center vh-100'  style={{
                 backgroundImage: `url('https://hackster.imgix.net/uploads/cover_image/file/170338/Employee-Management-Systems.jpg?auto=compress&w=900&h=675&fit=min&fm=jpg')`,
                 backgroundRepeat: 'no-repeat',
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 backgroundBlendMode: 'overlay',
                 backgroundColor: 'rgba(11, 11, 11, 0.5)'
             }}>
                <div className='text-warning'>
                {error && error}
            </div>
                <div className='col-md-6 col-lg-4 p-3 rounded border loginForm'>
                    <h2 className="text-center mb-4">Login Page</h2>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="email"><strong>Email:</strong></label>
                            <input 
                                type="email" 
                                name='email' 
                                autoComplete='off' 
                                placeholder='Enter Email'
                                onChange={(e) => setValues({...values, email : e.target.value})} 
                                className='form-control rounded-0'
                            />
                        </div>
                        <div className='mb-3'> 
                            <label htmlFor="password"><strong>Password:</strong></label>
                            <input 
                                type="password" 
                                name='password' 
                                placeholder='Enter Password'
                                onChange={(e) => setValues({...values, password : e.target.value})} 
                                className='form-control rounded-0'
                            />
                        </div>
                        <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                        <div className='mb-1'> 
                            <input type="checkbox" name="tick" id="tick" className='me-2'/>
                            <label htmlFor="password">You Agree with terms & conditions</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
