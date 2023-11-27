import Layout from '@/components/layout';
import '@/styles/globals.css';
import '../components/header/AppHeader.scss'
import '../components/header/search-input/SearchInput.scss'
import type { AppProps } from 'next/app';
import { storeWrapper } from '@/state/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  const {store} = storeWrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}