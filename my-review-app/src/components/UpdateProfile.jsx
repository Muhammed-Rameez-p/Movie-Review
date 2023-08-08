import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from '../reducers/auth'


import { Link, useNavigate } from 'react-router-dom';
import { createActor, updateActor } from '../actions/actor';
import { getSingleUser, updateUser } from '../actions/user';

export default function UpdateProfile() {

    const user = JSON.parse(localStorage.getItem('profile'));
    const profileId = user.result._id

    console.log(profileId,'iiiiiiiiiiiiiiiiiiiiii')
    
//   const NewUser = useSelector((state)=> profileId ? state.authData.find((a)=> a._id === profileId) : null)
 

   const [userData, setUserData] = useState({
    name:'',
    about:'',
    location:''
   })
   const navigate = useNavigate();

   const dispatch = useDispatch();

   

useEffect(()=>{
    dispatch(getSingleUser(profileId))
  },[dispatch])

  const {userOne} = useSelector((state)=> state.user)

  console.log(userOne,'userrrrrrrrrrr')

   const handleSubmit =(e) => {
     e.preventDefault();

    dispatch(updateUser( profileId ,userData))
     
     navigate("/user-profile");
     clear()
   } 

   useEffect(()=>{
    if(userOne) setUserData(userOne);
 },[userOne])


   const clear = ()=> {
    
      setUserData({
      name:'',
      about:'',
      location:''
    })
   }

   const updateCancel = () => {
   
      setUserData({
      name:'',
      about:'',
      location:''
    })
   }

   if(!userData) return null

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900"> { 'Update '} Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  value={userData.name}
                  onChange={(e)=>setUserData({...userData, name: e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
              About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  onChange={(e)=>setUserData({...userData, about: e.target.value})}
                  value={userData.about}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

        
            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
              Location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="location"
                  id="location"
                  autoComplete="given-name"
                  value={userData.location}
                  onChange={(e)=>setUserData({...userData, location: e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setUserData({...userData, selectedFile : base64})}
             />

            <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setUserData({...userData, selectedFile2 : base64})}
             />


          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
       <Link to="/user-profile"> <button onClick={()=>{updateCancel()}} type="button" className="text-sm font-semibold leading-6 rounded-lg p-2 text-gray-900 hover:bg-gray-400">
          Cancel
        </button></Link>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

