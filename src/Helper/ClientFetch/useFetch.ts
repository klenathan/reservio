import {useEffect, useState} from "react";
import apiClient from "@/config/axios.config";

interface FetchResult<T> {
    data?: T;
    isError?: any;
    isLoading: boolean;
}

export default function useFetch<T>(url: string): FetchResult<T> {
    const [data, setData] = useState<T>();
    const [isError, setIsError] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        apiClient
            .get<T>(url)
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                setIsError(e);
            })
            .finally(() => setIsLoading(false));
    }, [url]);

    return {data, isError, isLoading};
}