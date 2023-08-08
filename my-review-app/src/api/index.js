import axios from "axios";

// const API = axios.create({baseURL: 'http://localhost:5000'});

const url = 'http://localhost:5000/movie';
const url2 = 'http://localhost:5000/actor';
const url3 = 'http://localhost:5000/user';

// API.interceptors.request.use((req)=> {
//     if(localStorage.getItem('profile')){
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }

//     return req;
// })

export const fetchPosts = () => axios.get(url);
export const fetchMovieBySearch = (searchQuery) => axios.get(`${url}/search?searchQuery=${searchQuery.search || 'none'}`);
export const fetchSingleMovie = (id) => axios.get(`${url}/${id}`);
export const createMovie = (newPost) => axios.post(url, newPost);
export const comment = (value,id) => axios.post(`${url}/${id}/comment`, {value});
export const likeMovie = (value,id) => axios.post(`${url}/${id}/like`,{value});
export const deleteMovie = (movieId) => axios.delete(`${url}/${movieId}`);
export const updateMovie = (movieId,updateMovie) => axios.patch(`${url}/${movieId}`,updateMovie);
export const getLikedMovies = (id) => axios.get(`${url}/${id}/likedMovies`);
export const fetchCreatedNewMovies = () => axios.get(`${url}/createdMovies`);
export const fetchTop5Liked = () => axios.get(`${url}/top5Liked`);
export const ratingMovie = (value,id,rating) => axios.post(`${url}/${id}/rating`,{value,rating});
export const fetchAvgRating = (id) => axios.get(`${url}/${id}/avg-rating`);
export const getAllReviews = (id) => axios.get(`${url}/${id}/allReviews`);
export const deleteReviews = (id,comment) => axios.post(`${url}/${id}/remove-review`,{comment});



export const fetchActor = () => axios.get(url2);
export const fetchActorBySearch = (searchQuery) => axios.get(`${url2}/search?searchQuery=${searchQuery.search || 'none'}`);
export const createActor = (newActor) => axios.post(url2, newActor);
export const updateActor = (actorId,updateActor) => axios.patch(`${url2}/${actorId}`,updateActor);
export const deleteActor = (actorId) => axios.delete(`${url2}/${actorId}`);


export const signin = (formData) => axios.post(`${url3}/signin`, formData);
export const signup = (formData) => axios.post(`${url3}/signup`, formData);
export const updateUser = (userId,updateUser) => axios.post(`${url3}/${userId}`,updateUser);
export const fetchSingleUser = (id) => axios.get(`${url3}/${id}`);
export const userFollow = (value,id) => axios.post(`${url3}/${id}/follow`,{value});
export const getAllUsers = () => axios.get(url3);
export const getAllFollowing = (id) => axios.get(`${url3}/${id}/following`);