import axios from "axios";
import { useEffect, useState } from "react";

export default function useApiSearch(props: any) {
  const { query, method } = props;
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(false);
    setLoading(true);

    axios({
      method,
      url: query,
      signal: AbortSignal.timeout(10000),
    })
      .then((res) => {
        setData((prevData: any) => {
          return res?.data ? [...prevData, ...res.data] : [];
        });

        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setErrorMsg(e);
        setLoading(false);
      });
  }, [query]);

  return { error, errorMsg, data, loading };
}
