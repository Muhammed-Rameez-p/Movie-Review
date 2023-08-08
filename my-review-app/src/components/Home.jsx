import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import {getMovies, getMoviesBySearch} from '../actions/movie'

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DropdownComponent from './DropDown';


export default function Home() {
  const [search,setSearch] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getMovies())
  },[dispatch])

  const {movie} = useSelector((state)=> state.movie )

  console.log(movie,'idddddddddddd')

  const singlePageMovieId = (list) => {
      
      navigate(`/movie-page/${list._id}`)
  }

  const searchMovie = () => {
    if(search.trim()) {
      dispatch(getMoviesBySearch({search}))
    }else{
      dispatch(getMovies())
    }
  }


  return (
    <>

<div class="container mt-6  mx-auto">

   
    <section class="  text-gray-800 text-center lg:text-left background-radial-gradient">

      <div class="relative overflow-hidden bg-no-repeat rounded-lg bg-cover shadow-lg shadow-gray-900" Style="
            background-position: 50%;
            background-image: url('https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
            height: 700px;
          ">
        <div class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
          Style="">
          <div class="flex justify-center items-center h-full">
            <div class="text-center text-white px-6 py-6 md:py-0 md:px-12 max-w-[800px]">
              <h2 class="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight leading-tight mb-12">
                Are you ready <br /><span>for an adventure</span>
              </h2>
              {/* <p class="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima officia
                consequatur adipisci tenetur repudiandae rerum quos.
              </p> */}
            </div>
          </div>
        </div>
      </div>

    </section>

    
  </div>

<div className='flex justify-between'>
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

   <DropdownComponent />

</div>


    <div class="bg-white ">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 drop-shadow-lg">
    <h1 class=" pb-5 text-xl font-semibold text-black">Movies</h1>

    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

   
    { movie.map(list => (

            <button type='button' onClick={()=>singlePageMovieId(list)} class="group bg-gray-300 p-4 ">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img src={list.selectedFile} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-50 "/>
            </div>
            <p class="mt-1 text-lg font-medium text-gray-900">{list.title}</p>
            <h3 class="mt-4 text-sm text-gray-700">{list.storyLine.substring(0, 70)}</h3>
          </button>
          
        ))}


     

    
    </div>
  </div>
</div>


{/* <div class="bg-white ">
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 drop-shadow-lg ">
    <h1 class=" pb-5 text-xl font-semibold text-black">Top Rated Movies</h1>

    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

   
    { movie.map(list => (

            <button type='button' onClick={()=>singlePageMovieId(list)} class="group bg-gray-300 p-4 ">
            <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <img src={list.selectedFile} alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." class="h-full w-full object-cover object-center group-hover:opacity-50 "/>
            </div>
            <p class="mt-1 text-lg font-medium text-gray-900">{list.title}</p>
            <h3 class="mt-4 text-sm text-gray-700">{list.storyLine.substring(0, 70)}</h3>
          </button>
          
        ))}


     

    
    </div>
  </div>
</div> */}


</>
  )
}
