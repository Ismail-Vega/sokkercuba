import { getStoredState } from "./localStorage";
import type { AllData } from "../types/AllData";

export interface StoreState extends AllData {
  error?: boolean;
  errorMsg?: string;
  username: string;
  teamId?: number;
  loading: boolean;
  loggedIn: boolean;
}

enum StoreActionTypes {
  SET_ERROR = "set-error",
  SET_ERROR_MSG = "set-error-msg",
  SET_USERNAME = "set-username",
  SET_TEAM_ID = "set-team-id",
  SET_LOADING = "set-loading",
  SET_LOGIN = "set-login",
  SET_USER = "set-user",
  SET_JUNIORS = "set-juniors",
  SET_WEEK = "set-week",
  SET_TEAM = "set-team",
  SET_SUMMARY = "set-summary",
  SET_TRAINING = "set-training",
  SET_ALL = "set-all",
}

export interface StoreAction {
  type: StoreActionTypes;
  payload: any;
}

export default function storeReducer(
  state = getStoredState(),
  action: StoreAction
): StoreState {
  switch (action.type) {
    case StoreActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case StoreActionTypes.SET_ERROR_MSG:
      return { ...state, errorMsg: action.payload };
    case StoreActionTypes.SET_USERNAME:
      return { ...state, username: action.payload };
    case StoreActionTypes.SET_TEAM_ID:
      return { ...state, teamId: action.payload };
    case StoreActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case StoreActionTypes.SET_LOGIN:
      return { ...state, loggedIn: action.payload };
    case StoreActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case StoreActionTypes.SET_JUNIORS:
      return { ...state, juniors: action.payload };
    case StoreActionTypes.SET_WEEK:
      return { ...state, cweek: action.payload };
    case StoreActionTypes.SET_SUMMARY:
      return { ...state, tsummary: action.payload };
    case StoreActionTypes.SET_TEAM:
      return { ...state, players: action.payload };
    case StoreActionTypes.SET_TRAINING:
      return { ...state, training: action.payload };
    case StoreActionTypes.SET_ALL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export { StoreActionTypes };
