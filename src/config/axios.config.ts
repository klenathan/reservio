import axios, {AxiosResponse} from 'axios';
import {AppConfig} from "@/config/app.config";
import {Cookies} from "typescript-cookie";
import {useRouter} from "next/navigation";


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
        } else {
            const refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiY2xmdzgxY3RtMDAwNHkzMG1oaG50cmZvdiIsInVzZXJuYW1lIjoicHZkb25nIiwiZmlyc3ROYW1lIjoicHZkb25nIiwibGFzdE5hbWUiOm51bGwsImVtYWlsIjoiZG9uZy5wdkByZXNlcnZpby5jb20iLCJwaG9uZU5vIjoiMTIzMTIzNjc4IiwiYXZhdGFyIjoiYXZhdGFyLzllZThmNDA0LTQ3NmQtNDk2Yi1hNjFmLTdjYWQ1ODY3OWYzYy0wMDAwNDAuSlBHIiwic3RhdHVzIjoiQUNUSVZBVEUiLCJjcmVhdGVkQXQiOiIyMDIzLTAzLTMxVDA3OjI2OjM4Ljg5MFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAzLTMxVDA3OjI2OjM4Ljg5MFoifSwiaWF0IjoxNjgyMjM2ODM4fQ.Bb4ULAzblrsv_CYVCoA4X2Zylrqh7Vpzx51vHx05y9E";
            const response = await axios.post<RefreshTokenResponse>(
                `${apiClient.defaults.baseURL}auth/token/refresh`,
                {},
                {
                    headers: {Authorization: `Bearer ${refreshToken}`}
                }
            );

            Cookies.set('accessToken', response.data.accessToken);
            Cookies.set('refreshToken', response.data.refreshToken);

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
                    {},
                    {
                        headers: {Authorization: `Bearer ${refreshToken}`}
                    }
                )

                Cookies.set('accessToken', response.data.accessToken);
                Cookies.set('refreshToken', response.data.refreshToken);

                return apiClient(originalRequest);
            } catch
                (error) {
                const {push} = useRouter();
                push("/")
            }
        }
        return Promise.reject(error);
    },
)

export default apiClient;