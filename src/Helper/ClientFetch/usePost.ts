import {useCallback, useState} from "react";
import apiClient from "@/config/axios.config";
import {AxiosError, AxiosResponse} from "axios";

interface PostResult {
    response?: any;
    isPosting: boolean;
    errors: any
    post: (payload: FormData) => Promise<void>;
}

export default function usePost(url: string): PostResult {
    const [response, setResponse] = useState<any>();
    const [errors, setErrors] = useState<any>()
    const [isPosting, setIsPosting] = useState(false);

    const post = useCallback(async (payload: FormData) => {
        try {
            setIsPosting(true);
            const res: AxiosResponse = await apiClient.post(url, payload);
            setResponse(res.data);
        } catch (error: any) {
            setErrors(error)
            throw new AxiosError(error);
        } finally {
            setIsPosting(false);
        }
    }, [url]);

    return {response, errors, isPosting, post};
}