import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HonoTest } from "@/test/components/hono-test";

import { MinihomeButton } from "./components/minihome-button";
import { mainContainerCss, titleCss } from "./page.css";

export default function Home() {
  return (
    <>
      <Header />
      <main className={mainContainerCss}>
        <HonoTest />
        <Container>
          :Image
          <h1 className={titleCss}>
            Hi, I'm CyGitWorld.
            <br />
            :Description
          </h1>
          <MinihomeButton />
        </Container>
      </main>
      <Footer />
    </>
  );
}
