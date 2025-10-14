"use client";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistedStore } from '@/store';
import { ContextProvider } from "@/contexts";
import { ReactElement } from "react";
import { CssBaseline } from '@mui/material';
import { lightTheme } from '@/themes';
import { ThemeProvider } from '@mui/styles';
import '@/utils/i18n';

export function Providers({
  children,
}: Readonly<{
  children: ReactElement;
}>) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <ContextProvider>
            {children}
          </ContextProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
