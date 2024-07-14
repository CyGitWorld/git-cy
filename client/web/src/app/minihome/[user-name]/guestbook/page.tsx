import { GuestbookContent } from "./components/guestbook-content";
import { GuestbookHeading } from "./components/heading";

export const runtime = "edge";

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
