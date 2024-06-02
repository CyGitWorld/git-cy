import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

import { mainContainerCss } from "./layout.css";

export default function MinihomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className={mainContainerCss}>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
}
