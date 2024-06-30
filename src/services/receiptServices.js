import axios from "axios";
const { REACT_APP_DB_PATH } = process.env
export const createReceipt = async (values) => {
    try {
        const url = `${REACT_APP_DB_PATH}/receipt`
        const response = await axios.post(url, values)
        return response
    } catch (err) {
        console.log("Cant not make receipt, please try again", err)
    }
}

export const getReceipts = async (values) => {
    try {
        const url = `${REACT_APP_DB_PATH}/receipt?${values}`
        const response = await axios.get(url)
        return response
    } catch (err) {
        console.log("Cant not get receipt, please try again", err)
    }
}

export const editReceipts = async (id, values) => {
    try {
        const url = `${REACT_APP_DB_PATH}/receipt/${id}`
        const response = await axios.put(url, values)
        return response
    } catch (err) {
        console.log("Cant not edit receipt, please try again", err)
    }
}