import React from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosCustomize";
import { delay } from "lodash";

const postCreateUser = ({ email, password, username, role, image }) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.post("api/v1/participant", data);
};
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};
const putUpdateUser = ({ id, username, role, image }) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axios.put("api/v1/participant", data);
};
const deleteUsers = (id) => {
  return axios.delete(`api/v1/participant`, { data: { id: id } });
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(
    `http://localhost:8081/api/v1/participant?page=${page}&limit=${limit}`,
  );
};
const postLogin = (userEmail, userPassword) => {
  return axios.post("api/v1/login", {
    email: userEmail,
    password: userPassword,
    delay: 3000,
  });
};
const postRegister = (email, password, username) => {
  return axios.post("api/v1/register", {
    email: email,
    password: password,
    username: username,
  });
};
const getQuizByUser = () => {
  return axios.get("/api/v1/quiz-by-participant");
};
const getDataQuiz = (id) => {
  return axios.get(`/api/v1/questions-by-quiz?quizId=${id}`);
};
export {
  postCreateUser,
  putUpdateUser,
  getAllUsers,
  deleteUsers,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
};
