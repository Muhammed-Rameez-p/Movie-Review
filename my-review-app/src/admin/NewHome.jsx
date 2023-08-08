import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createdNewMovies, getMovies, getTop5LikedMovies } from '../actions/movie';
import { getActor } from '../actions/actor';

export default function NewHome() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      dispatch(getMovies())
    },[dispatch])

    useEffect(()=>{
        dispatch(getActor())
      },[dispatch])

      useEffect(()=>{
        dispatch(getTop5LikedMovies())
      },[dispatch])

      useEffect(()=>{
        dispatch(createdNewMovies())
      },[dispatch])

    const {movie} = useSelector((state)=> state?.movie )
    
    const actor = useSelector((state)=> state?.actor)

    const {createdNew_Movies} = useSelector((state)=> state?.movie)

    const {topLikedMovies} = useSelector((state)=> state?.movie)
    
    
  return (
    <>
    <div className='flex m-5 justify-center' >
    <div className='bg-gray-600 h-[8rem] w-[14rem] m-6 rounded-xl shadow-lg shadow-gray-600 text-gray-200 ' ><h1 className='pt-6 text-center text-xl font-medium '>TOTAL MOVIES</h1><h1 className=' pt-3 text-center text-xl font-medium text-yellow-400 '>(" {movie.length} ")</h1></div>
    <div className='bg-gray-600 h-[8rem] w-[14rem] m-6 rounded-xl shadow-lg shadow-gray-600 text-gray-200 ' ><h1 className='pt-6 text-center text-xl font-medium '>TOTAL ACTORS</h1><h1 className=' pt-3 text-center text-xl font-medium text-yellow-400 '>(" {actor.length} ")</h1></div>
    </div>

    <h1 className=' pl-10 p-7 text-red-700 text-start text-xl font-medium italic '>RECENT MOVIES</h1>

<ul role="list" className="divide-y ml-12 mr-10 divide-gray-100">
{ createdNew_Movies?.map((person) => (
  <li key={person.title} className="flex justify-between gap-x-6 py-5">
    <div className="flex gap-x-4">
      <img className="h-12 w-12 flex-none shadow-lg shadow-gray-600 rounded-full bg-gray-50" src={person.selectedFile} alt="" />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{person.title}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500 pr-10">{person.storyLine.substring(0, 165)}</p>
        <p className="mt-1 truncate text-xs leading-5 text-red-400"> Date : {person.createdAt.substring(0, 10)}</p>
      </div>
    </div>
  </li>
))}
</ul>

<h1 className=' p-8 text-red-700 text-start text-xl font-medium italic '> MOVIES LIKE</h1>

<ul role="list" className="divide-y ml-12 mr-10 divide-gray-100">
{ topLikedMovies?.map((person) => (
  <li key={person.title} className="flex justify-between gap-x-6 py-5">
    <div className="flex gap-x-4">
      <img className="h-12 w-12 flex-none shadow-lg shadow-gray-600 rounded-full bg-gray-50" src={person.selectedFile} alt="" />
      <div className="min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{person.title}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.storyLine.substring(0, 140)}</p>
        <p className="mt-1 truncate text-xs leading-5 text-red-400"> Total Likes : {person.likes.length}</p>
      </div>
    </div>
   
  </li>
))}
</ul>


</>

  )
}
