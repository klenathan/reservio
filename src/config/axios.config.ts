import axios, {AxiosResponse} from 'axios';
import {AppConfig} from "@/config/app.config";
import {redirect} from "next/navigation";


interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

const apiClient = axios.create({
    baseURL: AppConfig.apiBase,
});

apiClient.interceptors.request.use(
    async (config) => {
        const accessToken = sessionStorage.getItem('accessToken');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers.Accept = 'application/json'
        }

        return config;
    },
    (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem('refreshToken');

        if (
            error.response?.status === 400 &&
            refreshToken &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            try {
                ``
                const response = await axios.post<RefreshTokenResponse>(
                    `${apiClient.defaults.baseURL}auth/token/refresh`,
                    {},
                    {
                        headers: {Authorization: `Bearer ${refreshToken}`}
                    }
                )

                sessionStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);

                return apiClient(originalRequest);
            } catch
                (error) {
                // const {push} = useRouter();
                // push("/")
                redirect('/')
            }
        }
        return Promise.reject(error);
    },
)

export default apiClient;