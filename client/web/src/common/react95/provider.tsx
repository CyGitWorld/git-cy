"use client";

import { ReactNode } from 'react';
import original from 'react95/dist/themes/original';
import { ThemeProvider } from 'styled-components';

interface Props {
  children: ReactNode;
}

export const React95Provider = ({ children }: Props) => (
  <ThemeProvider theme={original}>
    {children}
  </ThemeProvider>
);
