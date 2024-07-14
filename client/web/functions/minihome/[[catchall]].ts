/* eslint-disable no-undef */

// /minihome/[username]/* 주소로 직접 접근 시 /minihome/__dynamic__/*.html 로 보내기
export const onRequest: PagesFunction = async (context) => {
  const { next, params } = context;

  const catchall = params.catchall;

  if (typeof catchall === "string") {
    return next("/404");
  }

  const convertedPath = `/minihome/${["__dynamic__", ...catchall.slice(1)].join("/")}`;

  console.log("converted", convertedPath);

  return next(convertedPath);
};
