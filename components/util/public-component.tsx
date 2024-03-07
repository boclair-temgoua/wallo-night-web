import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { getCookieUser, useAuth } from './context-user';

const PublicComponent = (Component: ComponentType) => {
  const userToken = getCookieUser();
  return function ProtectedRoute({ ...props }) {
    const { userStorage } = useAuth() as any;
    const isOnline = userStorage?.id !== undefined;
    const { push, query } = useRouter();

    useEffect(() => {
      if (userToken && isOnline) {
        push(`/dashboard`);
      }
    }, [userToken, isOnline, push, query]);

    return <Component {...props} />;
  };
};

export { PublicComponent };
