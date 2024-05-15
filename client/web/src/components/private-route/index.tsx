"use client";

import { useRouter } from 'next/router';

export const PrivateRoute = ({ children }) => {
  const router = useRouter();

  // TODO :: Question :: NextJS에서의 routing 검사
  // const isLoggedIn = checkUserLoggedIn();
  // if (!isLoggedIn) {
  //   router.push('/login');
  // }

  return children;
};
