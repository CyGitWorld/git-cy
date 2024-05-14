import { Header } from "@/components/header";
import { React95Test } from "@/test/components/react95-test";

import { titleCss } from "./page.css";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1 className={titleCss}>Hello GitCy World!</h1>
        <React95Test />
      </main>
    </>
  );
}
