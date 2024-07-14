"use client";

import { Button } from "react95";

import { h1, headingWrapper } from "./index.css";

export function GuestbookHeading() {
  return (
    <div className={headingWrapper}>
      <h1 className={h1}>Guestbook</h1>
      {/* <Link href="/minihome"> */}
      <Button primary>Extract SVG</Button>
      {/* </Link> */}
    </div>
  );
}
