import { Divider } from "@/components/divider";

import { UserInput } from "./components/user-input";
import { guestbook, h1 } from "./page.css";

export default function Guestbook() {
  return (
    <>
      <h1 className={h1}>Guestbook</h1>
      <section>
        <UserInput />
        <article className={guestbook}>mapping</article>
        <Divider />
        <article className={guestbook}>mapping</article>
        <Divider />
        <article className={guestbook}>mapping</article>
        <Divider />
      </section>
    </>
  );
}
