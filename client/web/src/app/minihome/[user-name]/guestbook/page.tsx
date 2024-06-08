import { GuestbookContent } from "./components/guestbook-content";
import { h1 } from "./page.css";

export default function Guestbook() {
  return (
    <>
      <h1 className={h1}>Guestbook</h1>
      <section>
        <GuestbookContent />
      </section>
    </>
  );
}
