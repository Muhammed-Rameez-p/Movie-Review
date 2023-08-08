import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUser, getFollowing, getSingleUser } from "../actions/user";
import { getLikedMovies, getTotalReviews } from "../actions/movie";
import { Button } from "@material-tailwind/react";




export default function Profile() {

  const user = JSON.parse(localStorage.getItem('profile'));
    const profileId = user?.result?._id

  const dispatch = useDispatch();

  const [isVisible,setIsVisible] = useState("");

    const Visible = (index) => {
      if(index === isVisible) {
        setIsVisible("");
      }else{
        setIsVisible(index);
      }
    } 

  useEffect(()=>{
    dispatch(getSingleUser(profileId))
    dispatch(getLikedMovies(profileId))
  },[dispatch])

  useEffect(()=>{
    dispatch(getFollowing(profileId))
    dispatch(getTotalReviews(profileId))
  },[])


  const {userOne} = useSelector((state)=> state.user)
  const {followingAll} = useSelector((state)=> state.user)
  const {movieLiked} = useSelector((state)=> state.movie )
  const {allReview} = useSelector((state)=> state.movie )
  const all_Review = allReview?.filter((id) => id._id.user === userOne.name);

  console.log(followingAll,'alllllllrrrrrrrreeeeeee')
  // console.log(all_Review);

  const navigate = useNavigate();


const img = userOne?.selectedFile2

const handleClick = () => {
  const followUserId = `${user?.result?._id}`

   dispatch(followUser(followUserId,userOne?._id));
 
}


  return (
    <>
      
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                'url('+ img +')'
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={userOne?.selectedFile}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                    {(profileId === userOne?._id) ?   ( <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={()=>navigate('/update-profile')}
                      >
                        Update Profile
                      </button>) : (<button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={handleClick}
                      >
                        Follow
                      </button>) }
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {userOne?.followers?.length}
                        </span>
                        <span className="text-sm text-gray-500">followers</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {(followingAll?.length) && followingAll?.length}
                        </span>
                        <span className="text-sm text-gray-500">following</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                          {movieLiked?.length}
                        </span>
                        <span className="text-sm text-gray-500"><button onClick={()=> navigate('/user-likeMovies')}>Liked Movies</button></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800">
                    {userOne?.name}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    {userOne?.location}
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800"> MOVIE REVIEWS
                      {/* {userOne?.about}, */}

           <ul role="list" className="divide-y ml-12 mr-10 divide-gray-100">
        { all_Review?.map((person,index) => (
          <li key={person.title} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none shadow-lg shadow-gray-600 rounded-full bg-gray-50" src={person.selectedFile} alt="" />
              <div className="min-w-0 flex-auto">
              
                <p className="text-sm font-semibold leading-6 text-gray-900">{person._id.movie}</p>
                <Button onClick={() => Visible(index)} className=" text-gray-900">Reviews </Button>
                <ul>
            { isVisible === index && person.comments.map((comment, commentIndex) => (
              <li key={commentIndex}><p  className="mt-1 truncate text-xs leading-5 text-gray-500">{comment}</p></li>
              
            ))}
          </ul>
                
              </div>
            </div>
    
          </li>
        ))}
      </ul>

     {/* {all_Review?.map((item, index) => (
        <div key={index}>
          <h2>Movie Name:{item._id.movie}</h2>
          <p>User: {item._id.user}</p>
          <img className="h-12 w-12 flex-none shadow-lg shadow-gray-600 rounded-full bg-gray-50 " src={item.selectedFile} alt="" />
          <ul>
            {item.comments.map((comment, commentIndex) => (
              <li key={commentIndex}>{comment}</li>
            ))}
          </ul>
        </div>
      ))} */}
                      </p>
                      {/* <a
                        href="#pablo"
                        className="font-normal text-pink-500"
                        onClick={e => e.preventDefault()}
                      >
                        Show more
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    
    </>
  );
}