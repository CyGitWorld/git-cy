"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppBar, Button, Toolbar } from "react95";

import { Container } from "@/components/container";

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
              <Link href="/minihome/:user-name/guestbook">
                <Button
                  size="lg"
                  variant="menu"
                  type="button"
                  active={pathname.startsWith("/minihome")}
                >
                  Minihome
                </Button>
              </Link>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
