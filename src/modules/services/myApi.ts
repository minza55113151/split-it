import { Api } from "./Api";

const apiInstance = new Api({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default apiInstance;
