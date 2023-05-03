import {useCallback, useState} from "react";
import apiClient from "@/config/axios.config";
import {AxiosError, AxiosResponse} from "axios";

interface PostResult {
    response?: any;
    isPosting: boolean;
    post: (payload: FormData) => Promise<void>;
}

export default function usePost(url: string): PostResult {
    const [response, setResponse] = useState<any>();
    const [isPosting, setIsPosting] = useState(false);

    const post = useCallback(async (payload: FormData) => {
        try {
            setIsPosting(true);
            const res: AxiosResponse = await apiClient.post(url, payload);
            setResponse(res.data);
        } catch (error : any) {
            throw new AxiosError(error);
        } finally {
            setIsPosting(false);
        }
    }, [url]);

    return {response, isPosting, post};
}