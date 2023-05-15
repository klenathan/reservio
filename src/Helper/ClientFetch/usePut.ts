import { useCallback, useState } from "react";
import apiClient from "@/config/axios.config";
import { AxiosError, AxiosResponse } from "axios";

interface PutResult {
  response?: any;
  isPosting: boolean;
  errors: any;
  put: (payload?: FormData) => Promise<void>;
}

export default function usePut(url: string): PutResult {
  const [response, setResponse] = useState<any>();
  const [errors, setErrors] = useState<any>();
  const [isPosting, setIsPosting] = useState(false);

  const put = useCallback(
    async (payload?: FormData) => {
      try {
        setIsPosting(true);
        const res: AxiosResponse = await apiClient.put(url, payload);
        setResponse(res.data);
      } catch (error: any) {
        setErrors(error);
        throw new AxiosError(error);
      } finally {
        setIsPosting(false);
      }
    },
    [url]
  );

  return { response, errors, isPosting, put };
}
