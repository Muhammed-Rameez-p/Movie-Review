import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteActor, getActor, getActorBySearch } from '../actions/actor';
import { getLikedMovies } from '../actions/movie';


export default function LikedMovies() {

    const user = JSON.parse(localStorage.getItem('profile'));
    const profileId = user?.result?._id

    const dispatch = useDispatch();
    

    useEffect(()=>{
      dispatch(getLikedMovies(profileId))
    },[dispatch])

    const {movieLiked} = useSelector((state)=> state.movie )


  return (
    <>
    <h1 className='ml-14 m-6  text-xl text-gray-600  font-semibold  ' >Liked Movies</h1>

 <ul role="list" className=" divide-y ml-24 mr-10 divide-gray-100 ">
{movieLiked?.map((person) => (
  <li key={person.title} className=" ml-10 flex justify-between gap-x-6 py-5 ">
    <div className="flex gap-x-4">
      <img className="h-12 w-12 flex-none shadow-lg shadow-gray-600 rounded-full bg-gray-50 " src={person.selectedFile} alt="" />
      <div className=" ml-5 min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{person.title}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.storyLine.substring(0, 150)}</p>
      </div>
    </div>

  </li>
))}
</ul>
</>
  )
}
