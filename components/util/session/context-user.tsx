import {
  FC,
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { UserModel } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";
import { getOneUserAPI } from "@/pages/api/user";
import jwt_decode from "jwt-decode";

type AuthContextProps = {
  currentUser: UserModel | undefined;
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>;
  logout: () => void;
};

export const getCurrentUserFormToken = () => {
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem(
          String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN)
        )
      : null;
  if (token !== null) {
    const user: any = jwt_decode(token);
    return user;
  } else {
    return;
  }
};

const initAuthContextPropsState = {
  saveAuth: () => {},
  setCurrentUser: () => {},
  currentUser: undefined,
  logout: () => {},
};

const AuthContext = createContext<AuthContextProps>(
  initAuthContextPropsState as any
);

const useAuth = () => {
  return useContext(AuthContext);
};

const ContextUserProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [userStorage, setUserStorage] = useState(getCurrentUserFormToken());

  const fetchOneUser = async () =>
    await getOneUserAPI({ userId: userStorage?.id });
  const { data } = useQuery(["user", userStorage?.id], () => fetchOneUser(), {
    refetchOnWindowFocus: false,
    enabled: Boolean(userStorage?.id),
  });
  const user: any = data?.data;

  const logout = () => {
    setUserStorage(undefined);
    window.localStorage.removeItem(
      String(process.env.NEXT_PUBLIC_BASE_NAME_TOKEN)
    );
  };

  return (
    <AuthContext.Provider value={{ ...user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { ContextUserProvider, useAuth };