import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { followUser, getFollowing, getSingleUser } from "../actions/user";
import { getLikedMovies } from "../actions/movie";




export default function UserProfile() {

  const user = JSON.parse(localStorage.getItem('profile'));
    const profileId = user?.result?._id

    const {id} = useParams();

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getSingleUser(id))
    dispatch(getLikedMovies(id))
    
  },[dispatch])

  useEffect(()=>{
    dispatch(getFollowing(id))
  },[])

  const {userOne} = useSelector((state)=> state.user)
  const {followingAll} = useSelector((state)=> state.user)
  const {movieLiked} = useSelector((state)=> state.movie )


  const navigate = useNavigate();

  const hasFollow = userOne?.followers?.find((like) => like === profileId);


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
                    { (hasFollow) ?  (<button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={handleClick}
                      >
                        UnFollow
                      </button> ) : (<button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={handleClick}
                      >
                        Follow
                      </button> ) }
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
                        <span className="text-sm text-gray-500">Liked Movies</span>
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
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                      {userOne?.about}
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