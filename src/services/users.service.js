import axios from "axios";
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export const getUsers = () => {
  return axios.get(`${BASE_API_URL}/users`);
};

export const updateVote = async (user) => {
  const { votes } = user;
  return axios.put(`${BASE_API_URL}/users/${user.id}/vote`, {
    votes,
  });
};
