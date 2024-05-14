"use client";

import Link from "next/link";
import { AppBar, Toolbar } from "react95";

import { navButtonListCss, toolbarCss } from "./index.css";

export const Fotoer = () => {
  return (
    <AppBar
      position='relative'
    >
      <Toolbar className={toolbarCss}>
        <div>
          :Logo
        </div>
        <div className={navButtonListCss}>
          <Link
            href="/minihome/:user-name/guestbook"              
          >
            Github
          </Link>
          <Link
            href="/minihome/:user-name/guestbook"              
          >
            LinkedIn
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  )
}