import React, { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';


import { createMovie, updateMovie } from '../actions/movie';
import { Link, useNavigate } from 'react-router-dom';

export default function AddMovie({currentMovieId,setCurrentMovieId}) {

  
  const movie = useSelector((state)=> currentMovieId ? state.movie.movie.find((a)=> a._id === currentMovieId) : null)

    
   const [movieData, setMovieData] = useState({
    title:'',
    storyLine:'',
   })
   const navigate = useNavigate();

   const dispatch = useDispatch();

   useEffect(()=>{
    if(movie) setMovieData(movie);
 },[movie])

   const handleSubmit =(e) => {
     e.preventDefault();

     if (currentMovieId) {
      dispatch(updateMovie( currentMovieId ,movieData))
     }else{
       dispatch(createMovie(movieData))
     }

     navigate("/movies");
     clear()
   } 

   const clear = ()=> {
    setCurrentMovieId(null);
    setMovieData({
      title:'',
      storyLine:'',
    })
   }

//    const handleClick =(e) => {
     

//   } 

const updateCancel = () => {
  setCurrentMovieId(null);
    setMovieData({
      title:'',
      storyLine:'',
  })
 }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Create Actors</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="given-name"
                  value={movieData.title}
                  onChange={(e)=>setMovieData({...movieData, title: e.target.value})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="storyLine" className="block text-sm font-medium leading-6 text-gray-900">
              Story Line
              </label>
              <div className="mt-2">
                <textarea
                  id="storyLine"
                  name="storyLine"
                  rows={3}
                  onChange={(e)=>setMovieData({...movieData, storyLine: e.target.value})}
                  value={movieData.storyLine}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>


            {/* <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div> */}

            <FileBase
            type="file"
            multiple={false}
            onDone={({base64}) => setMovieData({...movieData, selectedFile : base64})}
             />


          </div>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
       <Link to="/movies"> <button type="button" onClick={()=>{updateCancel()}} className="text-sm font-semibold leading-6 rounded-lg p-2 text-gray-900 hover:bg-gray-400">
          Cancel
        </button></Link>
        <button
          type="submit"
        //   onClick={handleClick}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}

