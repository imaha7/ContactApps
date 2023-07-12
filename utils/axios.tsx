import axios from "axios";

// const BASE_URL = "https://pokeapi.co/api/v2";
const BASE_URL = "https://contact.herokuapp.com";

const request = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json",
    },
    timeout: 10000000,
});

// request.interceptors.request.use(
//     function (config: AxiosRequestConfig) {
//         // const token = localStorage.getItem("jwtToken");
//         const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbF9uYW1lIjoiU3VwZXJhZG1pbiIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZUlkIjoxLCJyb2xlTmFtZSI6IlNQViBBY2NvdW50aW5nIiwiZXhwIjoxNjY3OTcwODk3fQ.UNHhmMcdGhc9Y0BdvMo7HEYeu6MFYUh6bQ5tw7BdFiI";
//         config.headers["Authorization"] = `Bearer ${token}`;

//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

export default request;
