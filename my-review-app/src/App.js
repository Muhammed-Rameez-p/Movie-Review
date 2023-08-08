import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AdminNavigator from './navigator/AdminNavigator'
import MoviePage from './components/MoviePage'
import Profile from './components/Profile'
import UpdateProfile from './components/UpdateProfile'
import LikedMovies from './components/LikedMovies'
import AllUsers from './components/AllUsers'
import UserProfile from './components/UserProfile'


export default function App() {

  const user = JSON.parse(localStorage.getItem('profile'));
  console.log(user,'uuuussssssss')

  let role = user?.result?.role === "admin";


  if(role) return  <AdminNavigator />

  return (
<>

  <Navbar />
    <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/movie-page/:id' element={<MoviePage />} />
       <Route path='/login' element={<Login />} />
       <Route path='/signup' element={<SignUp />} />
       
       <Route path='/user-profile' element={<Profile />} />
       <Route path='/update-profile' element={<UpdateProfile />} />
       <Route path='/user-likeMovies' element={<LikedMovies />} />
       <Route path='/all-users' element={<AllUsers />} />
       <Route path='/single-user/:id' element={<UserProfile />} />
     
      
    </Routes>
    </>
  )
}
