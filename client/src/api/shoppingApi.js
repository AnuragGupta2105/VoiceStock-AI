import API from "./api";

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// ================= GET ITEMS =================

export const getShoppingItems = async () => {
  const res = await API.get("/shopping", getConfig());
  return res.data;
};

// ================= ADD ITEM =================

export const addShoppingItem = async (item) => {
  const res = await API.post("/shopping", item, getConfig());
  return res.data;
};

// ================= UPDATE ITEM =================

export const updateShoppingItem = async (id, data) => {
  const res = await API.put(`/shopping/${id}`, data, getConfig());
  return res.data;
};

// ================= DELETE ITEM =================

export const deleteShoppingItem = async (id) => {
  const res = await API.delete(`/shopping/${id}`, getConfig());
  return res.data;
};