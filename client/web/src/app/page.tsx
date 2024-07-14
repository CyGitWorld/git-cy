import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import { LinkButton } from "./components/link-button";
import { mainContainerCss, titleCss } from "./page.css";

export default function Home() {
  return (
    <>
      <Header />
      <main className={mainContainerCss}>
        <Container>
          :Image
          <h1 className={titleCss}>
            Hi, I'm CyGitWorld.
            <br />
            :Description
          </h1>
        </Container>
        <LinkButton />
      </main>
      <Footer />
    </>
  );
}
