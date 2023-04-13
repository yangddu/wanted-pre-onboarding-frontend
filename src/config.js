const BASE_URL = "https://www.pre-onboarding-selection-task.shop";
export const API = {
  SIGNUP: `${BASE_URL}/auth/signup`,
  SIGNIN: `${BASE_URL}/auth/signin`,
  TODO: `${BASE_URL}/todos`
};

export const headers = { "Content-Type": "application/json" };

export const API_STATUS_SUCCESS = 200,
  API_STATUS_CREATED = 201,
  API_STATUS_NO_CONTENT = 204;
