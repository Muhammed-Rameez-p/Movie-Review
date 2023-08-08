import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from '../admin/Navbar'
import Actors from '../admin/Actors'
import Movie from '../admin/Movie'
import AddMovie from '../admin/AddMovie'
import AddActor from '../admin/AddActor'
import NewHome from '../admin/NewHome'
import Review from '../admin/Review'

export default function AdminNavigator() {
  const [currentId,setCurrentId] = useState(null);
  const [currentMovieId,setCurrentMovieId] = useState(null);
  return (
    <>
    <div className='flex'>
      <Navbar />
<div className='flex-1 p-2 max-w-screen-xl'>
        <Routes>
        
           <Route path='/' element={<NewHome />} />
           <Route path='/movies' element={<Movie setCurrentMovieId={setCurrentMovieId} />} />
           <Route path='/movies-review' element={<Review/>} />
           <Route path='/actors' element={<Actors setCurrentId={setCurrentId} />} />
           <Route path='/add-movie' element={<AddMovie currentMovieId={currentMovieId} setCurrentMovieId={setCurrentMovieId} />} />
           <Route path='/add-actor' element={<AddActor currentId={currentId} setCurrentId={setCurrentId} />} />
          
        </Routes>
        </div>
        </div>
        </>
      )
}
