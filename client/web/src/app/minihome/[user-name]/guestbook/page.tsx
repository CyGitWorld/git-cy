import { GuestbookContent } from "./components/guestbook-content";
import { GuestbookHeading } from "./components/heading";

export async function generateStaticParams() {
  return [{ "user-name": "__dynamic__" }];
}

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
