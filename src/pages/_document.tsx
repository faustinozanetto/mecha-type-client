/* eslint-disable @next/next/no-document-import-in-page */
import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
  DocumentProps,
} from 'next/document';
import { Cookies } from '@modules/core/cookies/types/cookies.types';
import theme from '../styles/theme';
// eslint-disable-next-line @next/next/no-script-in-document
import Script from 'next/script';
import { GoogleAnalytics } from '@components/google/google-analytics';

/**
 * Additional props depending on our App
 *
 * Must be returned by getInitialProps and will be available in render function
 */
type Props = {
  locale: string;
};

type DocumentGetInitialPropsOutput = Props & DocumentInitialProps;
type DocumentRenderProps = Props & DocumentProps;

class AppDocument extends Document<DocumentRenderProps> {
  static async getInitialProps(context: DocumentContext): Promise<DocumentGetInitialPropsOutput> {
    const { query, req } = context;
    const initialProps: DocumentInitialProps = await Document.getInitialProps(context);
    const locale = context.locale;

    return {
      ...initialProps,
      locale,
    };
  }

  render() {
    const { locale }: DocumentRenderProps = this.props;
    return (
      <Html lang={locale}>
        <Head>
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
            crossOrigin="anonymous"
          ></script>
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
