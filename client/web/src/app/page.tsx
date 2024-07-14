import Link from "next/link";

import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import { MinihomeButton } from "./components/minihome-button";
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
          <Link href="/minihome/:user-name/guestbook">
            <MinihomeButton />
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
