import axios from "axios";

const API = axios.create({

  baseURL: "http://localhost:5000/api",

});

// ================= LOGIN =================

export const loginUser = (data) =>
  API.post("/auth/login", data);

// ================= REGISTER =================

export const registerUser = (data) =>
  API.post("/auth/register", data);

// ================= UPDATE PROFILE =================

export const updateProfile = async (data) => {

  const token = localStorage.getItem("token");

  const res = await API.put(

    "/auth/profile",

    data,

    {

      headers: {

        Authorization: `Bearer ${token}`,

      },

    }

  );

  return res.data;

};

// ================= CHANGE PASSWORD =================

export const changePassword = async (data) => {

  const token = localStorage.getItem("token");

  const res = await API.put(

    "/auth/change-password",

    data,

    {

      headers: {

        Authorization: `Bearer ${token}`,

      },

    }

  );

  return res.data;

};

export default API;