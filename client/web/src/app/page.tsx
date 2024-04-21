import { TrpcTest } from "@/test/components/trpc-test";
import { titleCss } from "./page.css";

export default function Home() {
  return (
    <main>
      <h1 className={titleCss}>Hello GitCy World!</h1>
      <TrpcTest />
    </main>
  );
}
