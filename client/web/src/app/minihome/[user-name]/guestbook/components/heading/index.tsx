"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "react95";

import { useUser } from "@/hooks/use-login";

import { h1, headingWrapper } from "./index.css";

export function GuestbookHeading() {
  const { isLogin, username } = useUser();
  const params = useParams();
  return (
    <div className={headingWrapper}>
      <h1 className={h1}>Guestbook</h1>
      {isLogin && username === params["user-name"] ? (
        <Link href={`/minihome/${params["user-name"]}/extract-svg`}>
          <Button primary>Extract SVG</Button>
        </Link>
      ) : null}
    </div>
  );
}
