import axios from "../util/axios.customize";
const { REACT_APP_DB_PATH } = process.env;
export const authenUserSignIn = async (values) => {
  try {
    const url = `${REACT_APP_DB_PATH}/user/authen`;
    const params = {
      type: 1,
      email: values.email,
      password: values.password,
    };
    const response = await axios.get(url, { params: params });
    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
export const authenUserSignUp = async (values) => {
  try {
    const url = `${REACT_APP_DB_PATH}/user/authen`;
    const params = {
      type: 2,
      email: values.email,
    };
    const response = await axios.get(url, { params: params });
    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};
export const createUser = async (values) => {
  try {
    const url = `${REACT_APP_DB_PATH}/user`;
    const response = await axios.post(url, values);
    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const getUsers = async (values) => {
  try {
    const url = `${REACT_APP_DB_PATH}/user?${values}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const url = `${REACT_APP_DB_PATH}/user/${id}`;
    const response = await axios.put(url, data);
    return response;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};

export const postAvatar = async (data) => {
  try {
    const url = `${REACT_APP_DB_PATH}/user/avatar`;
    const response = await axios.post(url, data);
    return response;
  } catch (err) {
    console.error("Error upload avatar:", err);
  }
};

export const authenToken = async () => {
  try {
    const url = `${REACT_APP_DB_PATH}/user/authenToken`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.log(err);
  }
};
