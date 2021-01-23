import { CHANGE_LOADING_STATUS } from "./constants";

// changeActions
export const changeLoadingStatusAction = (status) => ({
  type: CHANGE_LOADING_STATUS,
  status,
});

// getActions
