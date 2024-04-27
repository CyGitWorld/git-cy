"use client";

import { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

import original from 'react95/dist/themes/original';

interface Props {
  children: ReactNode;
}

export const React95Provider = ({ children }: Props) => (
  <ThemeProvider theme={original}>
    {children}
  </ThemeProvider>
);