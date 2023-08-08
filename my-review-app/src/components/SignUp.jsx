import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { signup } from '../actions/auth';
import { useNavigate } from 'react-router-dom';

const initialValue = {name:"",email:"",password:"" };

export default function SignUp() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialValue)

  const handleSubmit  = (e) => {
    e.preventDefault();
    dispatch(signup(formData,navigate))
    console.log(formData);
  }

  const handleChange = (e) => {
      setFormData({...formData,[e.target.name]:e.target.value});
  }


  return (
    <>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-14 w-14" src="https://i.pinimg.com/564x/a3/b7/30/a3b730bad04305515905be3a5bf51951.jpg" alt="Your Company"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
      <div>
        <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Enter Your Name</label>
        <div className="mt-2">
          <input onChange={handleChange} id="name" name="name" type="name" autocomplete="name" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div className="mt-2">
          <input onChange={handleChange} id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            
          </div>
        </div>
        <div className="mt-2">
          <input onChange={handleChange} id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
      </div>
    </form>

    <button onClick={() => navigate('/login') }><p className="mt-10 text-center text-sm text-gray-500">
      Already a member?
      
    </p></button>
  </div>
</div>
</>
  )
}


