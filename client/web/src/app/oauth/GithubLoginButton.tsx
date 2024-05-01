import { useRouter } from "next/router";
import queryString from "query-string";
import { GITHUB_AUTHORIZE_SERVER_URL } from "./constant";

export default function GithubLoginButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        const githubAuthUri = queryString.stringifyUrl({
          url: GITHUB_AUTHORIZE_SERVER_URL,
          query: {
            redirect_id: env.CLIENT_ID,
            redirect_uri: `${router.basePath}/oauth/redirect`,
          },
        });
        router.push(githubAuthUri);
      }}
    >
      github login
    </button>
  );
}
