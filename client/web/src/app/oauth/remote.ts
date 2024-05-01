type LogingByGithubRequest = { code: string };
type LogingByGithubResponse = { userName: string };
export function loginByGithub({ code }: LogingByGithubRequest) {
  console.log("code", code);
  return new Promise<LogingByGithubResponse>((res) =>
    res({ userName: "김의진" })
  );
}
