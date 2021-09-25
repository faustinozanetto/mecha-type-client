/* eslint-disable @next/next/no-document-import-in-page */
import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import NextCookies from 'next-cookies';
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

    const readonlyCookies: Cookies = NextCookies(context); // Parses Next.js cookies in a universal way (server + client)
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
        <Head />
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
