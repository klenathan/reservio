import { useEffect, useState } from "react";
import apiClient from "@/config/axios.config";
import { AxiosError } from "axios";

interface FetchResult<T> {
  data?: T;
  error?: any;
  isLoading: boolean;
}

export default function useFetch<T>(url: string | null): FetchResult<T> {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (!url) {
      return;
    }
    apiClient
      .get<T>(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        setError(e);
        throw new AxiosError(e);
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, error, isLoading };
}
