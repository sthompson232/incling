import axios from 'axios'

const url = 'http://localhost:8000'

const options = {
    headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
    }  
}

const axiosGet = (request_string) => {
    let response = axios.get(`${url}/api/${request_string}`, options)
    return response
}

const axiosPost = (request_string, payload) => {
    let response = axios.post(`${url}/api/${request_string}`, payload, options)
    return response
}

const axiosPut = (request_string, payload) => {
    let response = axios.put(`${url}/api/${request_string}`, payload, options)
    return response
}

const axiosDelete = (request_string, payload) => {
    let response = axios.delete(`${url}/api/${request_string}`, {data:payload}, options)
    return response
}

export {
    axiosGet,
    axiosPost,
    axiosPut,
    axiosDelete
}