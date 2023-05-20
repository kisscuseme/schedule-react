import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import translationKR from '../locales/kr/translation.json';
import translationEN from '../locales/en/translation.json';
import localesJSON from '../locales/locales.json';
import { useEffect } from 'react';
import i18next from 'i18next';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        suspense: false
      }
    }
  });

  const getLocaleJSON = (locale: string) => {
    if(locale === "kr") return translationKR
    else return translationEN
  }

  useEffect(() => {
    const locales = localesJSON;
    let resources: any = {}
    for(const key in locales) {
      resources[key] = {
        translation: getLocaleJSON(key)
      }
    }
    
    i18next
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
