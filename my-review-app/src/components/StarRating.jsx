import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { movieRating } from '../actions/movie';

export default function StarRating({avg}) {
  const user = JSON.parse(localStorage.getItem('profile'));

  const {movieOne} = useSelector((state)=> state.movie)
  const userId = user?.result?._id;
  const hasRating = movieOne?.ratings?.find((like) => like.id === userId);


    const [rating, setRating] = useState(hasRating?.rating);
    const [hover, setHover] = useState(0);
    const dispatch = useDispatch();


    const handleClick = (index) => {
      setRating(index)
      const finalComment = `${user.result._id}`
  
       dispatch(movieRating(finalComment,movieOne._id,index));
     
  }

  // const {averageRating} = avg

console.log(avg )

  return (
    <div className=" ml-[12rem] px-4 pb-1 star-rating flex bg-gray-100 rounded-lg ">
      {[...Array(5)].map((star, index) => {  
        index += 1;      
        return (    
            <button
            disabled={hasRating}
            type="button"
            key={index}
            className={index <= (hover || rating) ? "text-yellow-500" : "text-gray-400"}
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >     
          <span className="star text-2xl">&#9733;</span>  
          </button>      
        );
      })}
      <span className= ' text-xl text-red-700 p-2 '>{avg}</span>
      <h1 className='flex pl-0 pt-3 p-2  '> Average Rating</h1>
    </div>
  )
}
