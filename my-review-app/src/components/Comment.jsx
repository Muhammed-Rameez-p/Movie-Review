import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { commentDelete, commentMovie } from '../actions/movie';


export default function Comment({movieOne}) {

    const dispatch = useDispatch();

    const [comments,setComments ] = useState(movieOne?.comments);
    const [comment,setComment ] = useState('');
    const user = JSON.parse(localStorage.getItem('profile'));
    const commentsRef = useRef();

    const handleClick = async (e) => {
        const finalComment = `${user.result.name}: ${comment}`

        const newComment = await dispatch(commentMovie(finalComment,movieOne._id));

        setComments(newComment);
        setComment('');

        commentsRef.current.scrollIntoView({behavior: 'smooth'});
    }

    const buttonClick = (i) => {
        dispatch(commentDelete(i));
    }



  return (

   <>

    <div class="w-100% bg-white rounded-lg border p-2 my-4 mx-6 overflow-auto   h-[26rem]">

        <h3 class="font-bold">Movie Review</h3>

        <form>

            <div class="flex flex-col">

            {user?.result?.name && (
                <div>
            <div class="w-full px-3 my-2">
                <textarea onChange={(e)=> setComment(e.target.value)}
                    class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                    name="body" value={comment} placeholder='Type Your Comment' required></textarea>
            </div>

            <div class="w-full flex justify-end px-3">
                <input  onClick={handleClick} type='button' class="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value='Post Comment'/>
            </div>
            </div>  )}

     {comments.map((l,index)=>( <div class="border rounded-md p-3 ml-3 my-3 flex justify-between">
             <div>
                  <div class="flex gap-3 items-center">
                     
                        <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                            class="object-cover w-8 h-8 rounded-full 
                            border-2 border-emerald-400  shadow-emerald-400
                            "/>

                      <h3 class="font-bold">
                            {l.split(': ')[0]}
                        </h3> 
                    </div>  


                    <p class="text-gray-600 mt-2">
                         {l.split(':')[1]}
                    </p>
                    </div>

                    {/* <div className='pr-20 pt-4'>
                        <h1 className='bg-red-500' ><button type='button' onClick={()=>buttonClick(index)}>hello</button></h1>
                    </div> */}

                </div>))}

               
                <div ref={commentsRef} />
            </div>
           
        </form> 
        
    </div>
    
    </>
  )
}
