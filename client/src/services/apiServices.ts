/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from "react";
import apiClient from "./apiClient";
import { StoreAction } from "../store/storeReducer";
import { setError, setLoading, setErrorMsg } from "../store/actions";

export interface ApiRequestOptions {
  query: string;
  method: string;
  dispatch: Dispatch<StoreAction>;
  body?: any;
  silent?: boolean;
  headers?: any;
}

export const handleApiRequest = ({
  query,
  method,
  dispatch,
  body,
  silent,
  headers,
}: ApiRequestOptions) => {
  if (!silent) setLoading(dispatch, true);

  const result = apiClient(method, query, body, headers)
    .then((response) => {
      const { status, data } = response || null;

      if (status === 200 && !data?.error) {
        setError(dispatch, false);
        setErrorMsg(dispatch, "");
        return { ...data, status };
      }
      if (data?.error && !silent) {
        setError(dispatch, true);
        setErrorMsg(dispatch, data?.error);
        return { ...data, status };
      }
    })
    .catch((error) => {
      console.log("error: ", error);
      if (!silent) {
        setError(dispatch, true);
        setErrorMsg(dispatch, error?.message || error.toString());
      }
      return { error };
    })
    .finally(function () {
      if (!silent) setLoading(dispatch, false);
    });

  return result;
};
