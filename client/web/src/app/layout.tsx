import "./reset.css";

import clsx from "clsx";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { QueryProvider } from "@/common/api/query-provider";
import { React95Provider } from "@/common/react95/provider";
import { StyledComponentsRegistry } from "@/common/styled-components/registry";
import { theme } from "@/consts/themes.css";

import { GlobalUnhandledRejection } from "./components/global-unhandled-rejection";

export const metadata: Metadata = {
  title: "GitCyWorld",
  description: "Generated by GitCyWorld",
};

const galmuri11Font = localFont({
  src: [
    {
      path: "./Galmuri11.woff2",
      weight: "400",
    },
    {
      path: "./Galmuri11-Bold.woff2",
      weight: "600",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={clsx(galmuri11Font.className, theme)}>
        <GlobalUnhandledRejection />
        <StyledComponentsRegistry>
          <React95Provider>
            <QueryProvider>{children}</QueryProvider>
          </React95Provider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
