import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteActor, getActor, getActorBySearch } from '../actions/actor';


export default function Actors({setCurrentId}) {
   const [search,setSearch] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      dispatch(getActor())
    },[dispatch])

    const actor = useSelector((state)=> state.actor)

  const searchActor = () => {
    if(search.trim()) {
      dispatch(getActorBySearch({search}))
    }else{
      dispatch(getActor())
    }
  }

    const updateOnClick = (person) => {
       setCurrentId(person._id)
       navigate('/add-actor')
    }

  return (
    <>
    <div className=" sm:flex  sm:items-end justify-between sticky top-0  bg-white bg-opacity-80 gap-x-6">
        <div className=" ml-10 mt-4 mb-2 flex items-center">
            <div className="flex border border-purple-200 rounded">
                <input
                    type="text"
                    className="block w-full px-0.5 py-0.5 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <button onClick={searchActor} className="px-0.5 text-white bg-purple-600 border-l rounded ">
                    Search
                </button>
            </div>
        </div>
      <div>
      <Link to="/add-actor" >
        <button className="px-4 py-1.5 text-black bg-gray-500 border-l rounded mr-10 hover:bg-gray-300">Add Actor</button>
        </Link>
    </div>
 </div>

 <ul role="list" className="divide-y ml-12 mr-10 divide-gray-100 ">
{actor.map((person) => (
  <li key={person.name} className="flex justify-between gap-x-6 py-5 ">
    <div className="flex gap-x-4">
      <img className="h-12 w-12 flex-none shadow-lg shadow-gray-600 rounded-full bg-gray-50 " src={person.selectedFile} alt="" />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.about}</p>
      </div>
    </div>
    <div className="hidden sm:flex  sm:items-end">
     <button onClick={()=>{dispatch(deleteActor(person._id))}} className="mr-3 inline-flex items-center rounded-md bg-red-50 px-2 py-1 
     text-xs font-medium text-red-700 ring-1 ring-inset
      ring-red-600/10 hover:bg-red-400">Delete</button>
     <button onClick={()=>updateOnClick(person)} className="inline-flex items-center rounded-md bg-yellow-50 px-2
      py-1 text-xs font-medium
      text-yellow-800 ring-1 ring-inset ring-yellow-600/20 hover:bg-yellow-400">Update</button>
    </div>
  </li>
))}
</ul>
</>
  )
}
