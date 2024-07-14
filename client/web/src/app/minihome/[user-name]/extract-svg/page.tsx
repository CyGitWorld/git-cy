import { ExtractSVGContent } from "./components/extract-svg-content";
import { h1 } from "./page.css";

export async function generateStaticParams() {
  return [{ "user-name": "__dynamic__" }];
}

export default function ExtractSVG() {
  return (
    <>
      <h1 className={h1}>Get my guestbook on SVG</h1>
      <section>
        <ExtractSVGContent />
      </section>
    </>
  );
}
