import axios, {AxiosResponse} from 'axios';
import {AppConfig} from "@/config/app.config";
import {Cookies} from "typescript-cookie";


interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

const apiClient = axios.create({
    baseURL: AppConfig.apiBase,
});

apiClient.interceptors.request.use(
    async (config) => {
        const accessToken = Cookies.get('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = Cookies.get('refreshToken');

        if (
            error.response?.status === 401 &&
            refreshToken &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                const response = await axios.post<RefreshTokenResponse>(
                    `${apiClient.defaults.baseURL}auth/token/refresh`,
                    {
                        refreshToken,
                    },
                );
                Cookies.set('accessToken', response.data.accessToken);
                Cookies.set('refreshToken', response.data.refreshToken);
                return apiClient(originalRequest);
            } catch (error) {
                // Handle refresh token request error
            }
        }
        return Promise.reject(error);
    },
);

export default apiClient;