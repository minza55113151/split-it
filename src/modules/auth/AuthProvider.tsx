import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import apiInstance from "../services/myApi";
import { useUser } from "@/hooks/useUser";
import { useUserRegister } from "@/hooks/useUserRegister";

const AuthProvider = () => {
  const [token, setToken] = useState<string>("");

  const { data: user, isLoading } = useUser(token !== "");
  const { mutate: userRegister } = useUserRegister();

  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => {
      if (!token) {
        return;
      }

      apiInstance.instance.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      });
      setToken(token);
    });
  }, [getToken]);

  useEffect(() => {
    if (!token || isLoading || user) {
      return;
    }

    console.log("Registering user");
    userRegister();
  }, [token, user, isLoading, userRegister]);

  return null;
};

export default AuthProvider;
