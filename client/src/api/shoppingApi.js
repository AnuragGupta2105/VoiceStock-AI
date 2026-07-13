import API from "./api";

export const getShoppingItems = async () => {
  const res = await API.get("/shopping");
  return res.data;
};

export const addShoppingItem = async (item) => {
  const res = await API.post("/shopping", item);
  return res.data;
};

export const updateShoppingItem = async (id, data) => {
  const res = await API.put(`/shopping/${id}`, data);
  return res.data;
};

export const deleteShoppingItem = async (id) => {
  await API.delete(`/shopping/${id}`);
};