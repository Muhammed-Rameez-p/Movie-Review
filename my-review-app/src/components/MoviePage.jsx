import React, { useEffect, useState } from 'react'


import { useDispatch, useSelector } from 'react-redux'
import { getAvgRating, getSingleMovies, movieLike } from '../actions/movie'
import { useParams } from 'react-router-dom'
import Comment from './Comment'
import StarRating from './StarRating'



// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

export default function MoviePage() {

  const {movieOne} = useSelector((state)=> state.movie)
  const {avgMovie} = useSelector((state)=> state.movie)

  const [likes,setLikes] = useState(movieOne?.likes?.length)

  const user = JSON.parse(localStorage.getItem('profile'));
  const userId = user?.result?._id;
  const hasLiked = movieOne?.likes?.find((like) => like === userId);

  const {id} = useParams()
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getSingleMovies(id))
  },[dispatch, id,])

  useEffect(()=>{
    dispatch(getAvgRating())
  },[dispatch])


  console.log(avgMovie," movieeeeeeee")
  const avgRating = avgMovie?.find(item => item._id === id);
  console.log(avgRating?.averageRating)


  const handleClick = () => {
    const finalComment = `${user.result._id}`

     dispatch(movieLike(finalComment,movieOne._id));

     if(hasLiked) {
       setLikes(movieOne?.likes.filter((id) => id !== userId))
     }else{
       setLikes([...movieOne?.likes,userId]);
     }
   
}

  
 

  if(!movieOne) return null

  return (
    <>

    

        <div class="flex font-sans">
  <div class="flex-none w-[34rem] h-[42rem] relative">
    <img src={movieOne.selectedFile} alt="" class="pt-3 absolute inset-0 w-full h-full object-cover" loading="lazy" />
  </div>
  <form class="flex-auto p-6">
    <div class="flex flex-wrap">
      <h1 class="flex-auto text-xl font-semibold text-slate-900">
      {movieOne.title}
      </h1>
      {/* <div class="text-lg font-semibold text-slate-500">
        $110.00
      </div> */}
      <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
      {movieOne.storyLine}
      </div>
    </div>
    <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
      
    </div>
    <div class="flex space-x-4 mb-6 text-sm font-medium">
    

      {/* text-slate-300 */}
      <div className='flex'>
      <h1 className='pr-2 pl-4 pt-1' >  Movie Likes {movieOne?.likes?.length} </h1>
     { hasLiked ? (<button disabled={!user?.result?.name} onClick={handleClick} className="flex-none ml-2 flex items-center justify-center w-9 h-9 rounded-md text-red-700 border border-red-400 " type="button" aria-label="Like">
        <svg width="20" height="20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      </button>) : (<button disabled={!user?.result?.name} onClick={handleClick} className="flex-none ml-2 flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200 " type="button" aria-label="Like">
        <svg width="20" height="20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
        </svg>
      </button>) }

      <div>
       <StarRating avg={avgRating?.averageRating} />
      </div>
      
      </div>



    </div>
    {/* <p class="text-sm text-slate-700">
      Free shipping on all continental US orders.
    </p> */}

    <Comment movieOne={movieOne} />
  </form>

  

</div>

   

 
 {/* <Comment movieOne={movieOne} /> */}



</>

  )
}
