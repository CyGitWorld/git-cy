"use client";

import Link from "next/link";
import { AppBar, Toolbar } from "react95";

import { Container } from "@/components/container";

import { appbarCss, navButtonListCss, toolbarCss } from "./index.css";

export const Footer = () => {
  return (
    <AppBar position="relative" className={appbarCss}>
      <Container>
        <Toolbar className={toolbarCss}>
          <div>:Logo</div>
          <div className={navButtonListCss}>
            <Link href="https://github.com/CyGitWorld/git-cy">Github</Link>
            {/* <Link href="">LinkedIn</Link> */}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
