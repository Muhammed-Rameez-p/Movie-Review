import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteReview, getMovies, getMoviesBySearch } from '../actions/movie';
import { Button } from '@material-tailwind/react';

function Review() {
    const [search,setSearch] = useState('');
    const [isVisible,setIsVisible] = useState("");

    const Visible = (index) => {
      if(index === isVisible) {
        setIsVisible("");
      }else{
        setIsVisible(index);
      }
    } 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
      dispatch(getMovies())
    },[dispatch])

    const {movie} = useSelector((state)=> state.movie )

    console.log(movie,'mooooooooooooovvv')

    const searchMovie = () => {
      if(search.trim()) {
        dispatch(getMoviesBySearch({search}))
      }else{
        dispatch(getMovies())
      }
    }



    if(!movie) return null

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
                    onChange={(e)=> setSearch(e.target.value)}
                />
                <button onClick={searchMovie} className="px-0.5 text-white bg-purple-600 border-l rounded ">
                    Search
                </button>
            </div>
        </div>
      <div>
      
    </div>
        </div>

      <ul role="list" className="divide-y ml-12 mr-10 divide-gray-100">
        { movie.map((person,index) => (
          <li key={person.title} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none shadow-lg shadow-gray-600 rounded-full bg-gray-50" src={person.selectedFile} alt="" />
              <div className="min-w-0 flex-auto">
              
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.title}</p>
                <Button onClick={() => Visible(index)} className=" text-gray-900">Reviews </Button>
                <ul>
            { isVisible === index && person.comments.map((comment, commentIndex) => (
              <li key={commentIndex}><p onClick={()=>{dispatch(deleteReview(person._id,comment))}} className="mt-1 truncate text-xs leading-5 text-gray-500"><span className='mr-12'>hello</span>{comment}  </p></li>
              
            ))}
          </ul>
                
              </div>
            </div>
    
          </li>
        ))}
      </ul>
      </>
    )
}

export default Review