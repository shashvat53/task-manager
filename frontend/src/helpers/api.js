import apiInstance from "./axios";

// export const fetchTasks = () => fetch(API_URL).then((res) => res.json());

export const CreateTaskApi = async (data) => {
  try {
    const res = await apiInstance.post("/create-task", data);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getTaskByIdApi = async (id) => {
  try {
    const res = await apiInstance.get(`/get-id-task/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};
export const fetchTasksApi = async () => {
  try {
    const res = await apiInstance.get("/get-all-task");
    return res.data;
  } catch (error) {
    return error;
  }
};

export const UpdateTaskApi = async (id) => {
  try {
    const res = await apiInstance.post("/update-task", id);
    return res.data;
  } catch (error) {
    return error;
  }
};

export const DeleteTaskApi = async (id) => {
  console.log("id for api: ", id);
  try {
    const res = await apiInstance.delete(`/delete-task/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
};

// export const deleteTask = (id) =>
//   fetch(`${API_URL}/${id}`, { method: "DELETE" });
