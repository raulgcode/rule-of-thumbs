import axios from "axios";
const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export const getUsers = () => {
  return axios.get(`${BASE_API_URL}/users`);
};

export const updateNegativeVote = async (userId, user) => {
  const { votes } = user;
  return axios.put(`${BASE_API_URL}/users/${userId}/vote`, {
    votes: { negative: votes.negative + 1 },
  });
};

export const updatePositiveVote = async (userId, user) => {
  const { votes } = user;
  return axios.put(`${BASE_API_URL}/users/${userId}/vote`, {
    votes: { negative: votes.positive + 1 },
  });
};
