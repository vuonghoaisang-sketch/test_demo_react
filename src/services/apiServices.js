import React from "react";
import { toast } from "react-toastify";
import axios from "../utils/axiosCustomize";

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
export {
  postCreateUser,
  putUpdateUser,
  getAllUsers,
  deleteUsers,
  getUserWithPaginate,
};
