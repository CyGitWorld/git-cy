import { GuestbookContent } from "./components/guestbook-content";
import { GuestbookHeading } from "./components/heading";

export default function Guestbook() {
  return (
    <>
      <GuestbookHeading />
      <section>
        <GuestbookContent />
      </section>
    </>
  );
}
