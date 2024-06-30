import axios from "axios";
const { REACT_APP_DB_PATH } = process.env
export const getProductByRequest = async (values) => {
    try {
        const url = `${REACT_APP_DB_PATH}/product?${values}`
        const response = await axios.get(url)
        return response
    }
    catch (err) {
        console.log(err)
    }
}

export const updateProduct = async (id, values) => {
    try {
        const url = `${REACT_APP_DB_PATH}/product/${id}`
        const response = await axios.put(url, values)
        return response
    }
    catch (err) {
        console.log(err)
    }
}
export const getCategories = async () => {
    try {
        const url = `${REACT_APP_DB_PATH}/category`
        const response = await axios.get(url)
        return response
    }
    catch (err) {
        console.log(err)
    }
}