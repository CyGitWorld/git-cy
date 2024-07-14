"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Button, Toolbar } from "react95";

import { Container } from "@/components/container";
import { checkLogin, getUsername } from "@/utils/login";

import { navButtonListCss, plcaeholderCss, toolbarCss } from "./index.css";

export const Header = () => {
  const pathname = usePathname();
  return (
    <div className={plcaeholderCss}>
      <AppBar>
        <Container>
          <Toolbar className={toolbarCss}>
            <div>:Logo</div>
            <div className={navButtonListCss}>
              {checkLogin() ? (
                <Link href={`/minihome/${getUsername()}/guestbook`}>
                  <Button
                    size="lg"
                    variant="menu"
                    type="button"
                    active={pathname.startsWith("/minihome")}
                  >
                    Minihome
                  </Button>
                </Link>
              ) : null}
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
