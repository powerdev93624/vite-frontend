import axios from "axios";
import { ACCESS_TOKEN } from "@/constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER
});

const onRequest = (config) => { // Change type here
	try {
		const token = localStorage.getItem(ACCESS_TOKEN);
		if (token) {
				config.headers['Authorization'] = `Bearer ${token}`; // Directly set the header
		}
	} catch (error) { 
		console.log(error);
	}

	return config; // No need to cast
}

api.interceptors.request.use(onRequest);

api.interceptors.response.use(
	(response) => {
		return response.data;
	},

	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				return api(originalRequest);
		}
		return Promise.reject(error);
	}
);

const signup = (data) => api.post('/api/v1/auth/signup', data);
const signin = (data) => api.post('/api/v1/auth/signin', data);
export const apis = {
	signup,
	signin,
}