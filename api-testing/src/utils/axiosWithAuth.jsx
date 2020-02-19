import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  console.log("axiosWithAuth ran...", token);
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`
    }
  });
};
