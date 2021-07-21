import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5050'})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req
})


// posts 
export const fetchPosts = () => API.get('/posts');

export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`posts/${id}`)

export const likePost = (id) => API.patch(`posts/${id}/likePost`)

//  users

export const signIn = (formData) => API.post('/users/signin', formData);

export const signUp = (formData) => API.post('/users/signup', formData);
 
export const updateuser = (userid, data) => API.patch(`/users/update/${userid}`, data)

export const getusers = () => API.get('/users')

export const followUser = (id, data) => API.put(`/users/follow/${id}`, data)

export const getSingleUser = (id) => API.get(`/users/${id}`)

export const getFollowing = (id) => API.get(`/users/following/${id}`)
// messenger

export const fetchConvos = (userId) => API.get(`/conversations/${userId}`)

export const checkPost = (userId, value) => API.patch(`posts/check/${userId}`, value)

// comments

export const getComments = (postId) => API.get(`/comments/${postId}`)

export const deleteComment = (commentId, postId) => API.delete(`comments/${commentId}/${postId}`)

export const postComment = (postId, data) => API.post(`comments/${postId}`, data)

// messages

export const getMessages = (chatId) => API.get(`/messages/${chatId}`)

export const createMessages = (data) => API.post(`/messages`, data)

// conversations
export const getConversations = (userId) => API.get(`/conversations/${userId}`)

export const findConversation = (userId, otherUserId) => API.get(`/conversations/find/${userId}/${otherUserId}`)

export const createConversation = (data) => API.post(`/conversations/`, data)