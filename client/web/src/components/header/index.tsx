'use client';

// import { Container } from "@components/container";
import Link from "next/link";
import { AppBar, Button, Toolbar } from "react95"

import { navButtonListCss, plcaeholderCss, toolbarCss } from "./index.css";

export const Header = () => {
  return (
    <header className={plcaeholderCss}>
      <AppBar>
        {/* <Container> */}
          <Toolbar className={toolbarCss}>
            <div>
              :Logo
            </div>
            <div className={navButtonListCss}>
              <Link 
                href="/minihome/:user-name/guestbook"              
              >
                <Button
                  size='lg'
                  variant='menu'
                  type='button'
                >
                  Minihome
                </Button>
              </Link>
            </div>
          </Toolbar>
        {/* </Container> */}
      </AppBar>
    </header>
  )
}