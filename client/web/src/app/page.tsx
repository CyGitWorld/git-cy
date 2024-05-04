import { React95Test } from "@/test/components/react95-test";

import { titleCss } from "./page.css";
import { HonoTest } from "@/test/components/hono-test";

export default function Home() {
  return (
    <main>
      <h1 className={titleCss}>Hello GitCy World!</h1>
      <HonoTest />
      <React95Test />
    </main>
  );
}
