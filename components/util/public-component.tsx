import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';
import { getCookieUser, useAuth } from './context-user';

const PublicComponent = (Component: ComponentType) => {
  const userToken = getCookieUser();
  return function ProtectedRoute({ ...props }) {
    const { userStorage } = useAuth() as any;
    const isOnline = userStorage?.id !== undefined;
    const { push, query } = useRouter();
    const { redirect } = query;

    useEffect(() => {
      // if (isOnline) {
      //   // if (userStorage?.permission === "ADMIN") {
      //   //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/dashboard`;
      //   // }

      //   // if (userStorage?.permission === "USER") {
      //   //   window.location.href = `${process.env.NEXT_PUBLIC_SITE}/order-events`;
      //   // }

      //   push(`/dashboard`);
      // }
    }, [userStorage, isOnline, push, query]);

    return <Component {...props} />;
  };
};

export { PublicComponent };
