import { Dispatch } from "react";
import { enqueueSnackbar } from "notistack";
import type { User } from "../types/user";
import type { Team } from "../types/team";
import type { CWeek } from "../types/cweek";
import type { Juniors } from "../types/juniors";
import type { AllData } from "../types/AllData";
import type { TSummary } from "../types/tsummary";
import type { Training } from "../types/training";
import { StoreAction, StoreActionTypes } from "./storeReducer";

const setError = (dispatch: Dispatch<StoreAction>, payload: boolean) => {
  dispatch({ type: StoreActionTypes.SET_ERROR, payload });
};

const setErrorMsg = (dispatch: Dispatch<StoreAction>, payload: string) => {
  if (payload) enqueueSnackbar(payload, { variant: "error" });

  dispatch({ type: StoreActionTypes.SET_ERROR_MSG, payload });
};

const setUsername = (dispatch: Dispatch<StoreAction>, payload: string) => {
  dispatch({ type: StoreActionTypes.SET_USERNAME, payload });
};

const setTeamId = (dispatch: Dispatch<StoreAction>, payload: number) => {
  dispatch({ type: StoreActionTypes.SET_TEAM_ID, payload });
};

const setLoading = (dispatch: Dispatch<StoreAction>, payload: boolean) =>
  dispatch({ type: StoreActionTypes.SET_LOADING, payload });

const setLogin = (dispatch: Dispatch<StoreAction>, payload: boolean) => {
  if (payload) {
    enqueueSnackbar("You have successfully logged in!", { variant: "success" });
  } else {
    enqueueSnackbar("You have successfully logged out!", {
      variant: "success",
    });
  }

  dispatch({ type: StoreActionTypes.SET_LOGIN, payload });
};

const setUser = (dispatch: Dispatch<StoreAction>, payload: User) => {
  return dispatch({ type: StoreActionTypes.SET_USER, payload });
};

const setJuniors = (dispatch: Dispatch<StoreAction>, payload: Juniors) =>
  dispatch({ type: StoreActionTypes.SET_JUNIORS, payload });

const setWeek = (dispatch: Dispatch<StoreAction>, payload: CWeek) => {
  dispatch({ type: StoreActionTypes.SET_WEEK, payload });
};

const setSummary = (dispatch: Dispatch<StoreAction>, payload: TSummary) =>
  dispatch({ type: StoreActionTypes.SET_SUMMARY, payload });

const setTeam = (dispatch: Dispatch<StoreAction>, payload: Team) =>
  dispatch({ type: StoreActionTypes.SET_TEAM, payload });

const setTraining = (dispatch: Dispatch<StoreAction>, payload: Training) =>
  dispatch({ type: StoreActionTypes.SET_TRAINING, payload });

const setAll = (dispatch: Dispatch<StoreAction>, payload: AllData) =>
  dispatch({ type: StoreActionTypes.SET_ALL, payload });

export {
  setError,
  setErrorMsg,
  setUsername,
  setTeamId,
  setLoading,
  setLogin,
  setUser,
  setJuniors,
  setWeek,
  setSummary,
  setTeam,
  setTraining,
  setAll,
};
