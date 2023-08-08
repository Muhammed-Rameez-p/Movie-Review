import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';


import { Link, useNavigate } from 'react-router-dom';
import { createActor, updateActor } from '../actions/actor';

export default function AddActor({currentId,setCurrentId}) {
    
  const actor = useSelector((state)=> currentId ? state.actor.find((a)=> a._id === currentId) : null)

   const [actorData, setActorData] = useState({
    name:'',
    about:'',
    gender:''
   })
   const navigate = useNavigate();

   const dispatch = useDispatch();

   useEffect(()=>{
      if(actor) setActorData(actor);
   },[actor])

   const handleSubmit =(e) => {
     e.preventDefault();

     if (currentId) {
      dispatch(updateActor( currentId ,actorData))
     }else{
       dispatch(createActor(actorData))
     }
     
     navigate("/actors");
     clear()
   } 


   const clear = ()=> {
    setCurrentId(null);
      setActorData({
      name:'',
      about:'',
      gender:''
    })
   }

   const updateCancel = () => {
    setCurrentId(null);
      setActorData({
      name:'',
      about:'',
      gender:''
    })
   }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900"> {currentId ? 'Editing ' : 'Create '} Actors</h2>
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
                  value={actorData.name}
                  onChange={(e)=>setActorData({...actorData, name: e.target.value})}
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
                  onChange={(e)=>setActorData({...actorData, about: e.target.value})}
                  value={actorData.about}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>

        
            <div className="sm:col-span-3">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
              Gender
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  autoComplete="given-name"
                  value={actorData.gender}
                  onChange={(e)=>setActorData({...actorData, gender: e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setActorData({...actorData, selectedFile : base64})}
             />


          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
       <Link to="/actors"> <button onClick={()=>{updateCancel()}} type="button" className="text-sm font-semibold leading-6 rounded-lg p-2 text-gray-900 hover:bg-gray-400">
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

const genderOptions = [
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
  ];