import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

//  * User routes
export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);
export const sendOtp = () => API.get("/user/sendOtp");
export const verifyUser = (otp) => API.post("/user/verify", { otp });

//  * questions routes
export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value) =>
  API.patch(`/questions/vote/${id}`, { value });

//  * questions routes for admin access
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered) =>
  API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

//  * general routes
export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

// * chat routes
export const postChat = (promptValue) =>
  API.post("/chat/add", { message: promptValue });
export const getChat = () => API.get("/chat/get");

// * social routes
export const getPosts = () => API.get("/social/post/all");
export const addPost = (description, url) =>
  API.post("/social/post/create", { description, url });

export const likePost = (id) => API.patch(`/social/post/like/${id}`);
export const unlikePost = (id) => API.patch(`/social/post/unlike/${id}`);
