import {useCallback, useState} from "react";
import apiClient from "@/config/axios.config";

interface PostResult {
    response?: any;
    isError?: any;
    isPosting: boolean;
    post: any
}

export default function usePost(): PostResult {
    const [response, setResponse] = useState();
    const [isError, setIsError] = useState<any>();
    const [isPosting, setIsPosting] = useState(false);


    const post = useCallback((url: string, payload: any) => {
        console.log("asdasd", payload)
        setIsPosting(true);
        apiClient
            .post(url, payload)
            .then((res) => {
                setResponse(res.data)
            })
            .catch((e) => {
                setIsError(e)
            })
            .finally(() => setIsPosting(false))
    }, [])

        console.log("sdadsa ", response, isError, isPosting)

    return {response, isError, isPosting, post};
}