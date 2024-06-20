import { StoreState } from "./storeReducer";

const initialState: StoreState = {
  error: false,
  errorMsg: "",
  username: "",
  loggedIn: false,
  loading: false,
};

export const getStoredState = (): StoreState => {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem("sk-state");
    // Parse stored json or if none return an empty object
    return item ? JSON.parse(item) : initialState;
  } catch (error) {
    // If error also return an empty object
    console.log(error);
    return initialState;
  }
};

export const setStoredState = (value: StoreState) => {
  try {
    // Save to local storage
    window.localStorage.setItem(
      "sk-state",
      JSON.stringify(value || initialState)
    );
  } catch (error) {
    // A more advanced implementation would handle the error case
    console.log(error);
  }
};
