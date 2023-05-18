import '@/styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import i18n from "i18next";
import translationEN from "../locales/en/translation.json";
import translationKR from "../locales/kr/translation.json";
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        suspense: false
      }
    }
  });

  useEffect(() => {
    const resources = {
      en: {
        translation: translationEN
      },
      kr: {
        translation: translationKR
      },
    };
    
    i18n
    .init({
      resources,
      lng: localStorage.getItem("language")||"kr", //default language
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}
