"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Button, Toolbar } from "react95";

import { GithubLoginButton } from "@/app/oauth/GithubLoginButton";
import { Container } from "@/components/container";
import { useUser } from "@/hooks/use-login";

import { navButtonListCss, plcaeholderCss, toolbarCss } from "./index.css";

export const Header = () => {
  const { isLogin, username } = useUser();
  const pathname = usePathname();
  return (
    <div className={plcaeholderCss}>
      <AppBar>
        <Container>
          <Toolbar className={toolbarCss}>
            <div>:Logo</div>
            <div className={navButtonListCss}>
              {isLogin ? (
                <Link href={`/minihome/${username}/guestbook`}>
                  <Button
                    size="lg"
                    variant="menu"
                    type="button"
                    active={pathname.startsWith("/minihome")}
                  >
                    Minihome
                  </Button>
                </Link>
              ) : isLogin === false ? (
                <GithubLoginButton />
              ) : null}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
